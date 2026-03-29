const LOAN_TERMS = ["kredit", "loan", "qarz", "ssuda", "ipoteka", "garov", "mikrokredit", "mikroqarz", "??????", "????", "????", "?????", "???????"];
const AID_TERMS = ["nafaqa", "subsidiya", "subsidy", "grant", "yordam", "kompensatsiya", "stipendiya", "moddiy", "???????", "????????", "??????", "???????????", "?????????", "????????????"];
const MONEY_TERMS = ["pul", "mablag", "mablaglar", "moliyaviy", "naqd", "valyuta", "??????", "????????", "????????", "??????????", "??????????", "???????"];
const INFO_TERMS = ["tarixi", "history", "malumot", "malumotnoma", "spravka", "sms", "hisobot", "report", "reyestr", "registry", "taqiq", "cheklov", "tekshirish", "status", "xabarnoma", "???????", "???????", "???", "??????", "??????", "???????????", "????????", "??????"];
const PRIMARY_ACTION_TERMS = ["olish", "ajratish", "berish", "tayinlash", "rasmiylashtirish", "ariza", "request", "apply", "obtain", "????????", "?????????", "????????", "??????", "?????????", "?????????"];
const SECONDARY_ACTION_TERMS = ["tasdiqlash", "kafillik", "yoqish", "olib", "tashlash", "ornatish", "monitoring", "?????????????", "???????????", "????????", "?????", "??????????"];

const DOMAIN_TERMS = {
  education: ["talaba", "talabalar", "student", "students", "talim", "ta'lim", "oqish", "universitet", "work", "travel", "kompyuter", "it", "dasturchi", "???????", "????????", "???????????", "????", "???????????"],
  youth: ["yoshlar", "youth", "yosh", "work", "travel", "???????", "????????"],
  family: ["bola", "farzand", "chaqaloq", "homilador", "child", "children", "???????", "???????", "????", "???????"],
  housing: ["uy", "uyjoy", "kvartira", "kochmas", "mulk", "house", "housing", "mortgage", "ipoteka", "?????", "?????", "????????", "???????", "????????????"],
};

function hasAny(set, terms) {
  return terms.some((term) => set.has(term));
}

function buildActiveDomains(tokenSet) {
  return Object.fromEntries(
    Object.entries(DOMAIN_TERMS).map(([key, terms]) => [key, hasAny(tokenSet, terms)]),
  );
}

export function detectQueryConcepts(rawTokens, filteredTokens, normalizedQuery) {
  const rawSet = new Set(rawTokens);
  const filteredSet = new Set(filteredTokens);
  const combinedSet = new Set([...rawTokens, ...filteredTokens]);

  const concepts = {
    money_need: false,
    loan_request: false,
    aid_request: false,
    info_request: false,
    service_request: false,
    generic_finance_request: false,
    explicit_admin_request: false,
    domains: buildActiveDomains(combinedSet),
  };

  if (
    normalizedQuery.includes("pul kerak") ||
    normalizedQuery.includes("manga pul") ||
    normalizedQuery.includes("menga pul") ||
    normalizedQuery.includes("mablag kerak") ||
    normalizedQuery.includes("qarz kerak") ||
    normalizedQuery.includes("kredit kerak") ||
    normalizedQuery.includes("pul yoq") ||
    normalizedQuery.includes("money need") ||
    normalizedQuery.includes("????? ??????") ||
    normalizedQuery.includes("??? ????? ??????") ||
    normalizedQuery.includes("????? ??????") ||
    normalizedQuery.includes("????? ??????") ||
    normalizedQuery.includes("????? ????????") ||
    normalizedQuery.includes("????? ???????")
  ) {
    concepts.money_need = true;
  }

  if (LOAN_TERMS.some((term) => rawSet.has(term) || filteredSet.has(term))) {
    concepts.loan_request = true;
  }

  if (AID_TERMS.some((term) => rawSet.has(term) || filteredSet.has(term))) {
    concepts.aid_request = true;
  }

  if (INFO_TERMS.some((term) => rawSet.has(term) || filteredSet.has(term))) {
    concepts.info_request = true;
  }

  if (SECONDARY_ACTION_TERMS.some((term) => rawSet.has(term) || filteredSet.has(term))) {
    concepts.explicit_admin_request = true;
  }

  if (!concepts.loan_request && concepts.money_need) {
    concepts.loan_request = true;
    concepts.aid_request = true;
  }

  concepts.service_request = !concepts.info_request || concepts.money_need;

  const hasSpecificDomain = Object.values(concepts.domains).some(Boolean);
  concepts.generic_finance_request = (concepts.money_need || concepts.loan_request || concepts.aid_request) && !hasSpecificDomain;

  return concepts;
}

export function scoreServiceConcepts(service, concepts) {
  const text = [
    ...Object.values(service.name ?? {}),
    service.cat,
    ...Object.values(service.auth ?? {}),
    ...(service.keywords ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const tokenSet = new Set(text.split(/\s+/).filter(Boolean));
  const hasLoan = LOAN_TERMS.some((term) => text.includes(term));
  const hasAid = AID_TERMS.some((term) => text.includes(term));
  const hasMoney = MONEY_TERMS.some((term) => text.includes(term));
  const hasInfo = INFO_TERMS.some((term) => text.includes(term));
  const hasPrimaryAction = PRIMARY_ACTION_TERMS.some((term) => text.includes(term));
  const hasSecondaryAction = SECONDARY_ACTION_TERMS.some((term) => text.includes(term));
  const loanInfoOnly = hasLoan && hasInfo && !hasPrimaryAction;
  const activeServiceDomains = buildActiveDomains(tokenSet);
  const isFinancialService = hasLoan || hasAid || hasMoney;
  const hasMaterialAid = text.includes("moddiy yordam") || text.includes("material assistance") || text.includes("???????????? ??????");

  let score = 0;

  if (concepts.loan_request) {
    if (!isFinancialService) score -= 0.3;
    if (hasLoan && hasPrimaryAction) score += 0.4;
    else if (hasLoan) score += 0.18;

    if (hasMoney) score += 0.08;

    if (!concepts.info_request && hasInfo) score -= 0.32;
    if (!concepts.explicit_admin_request && hasSecondaryAction) score -= 0.18;
    if (loanInfoOnly) score -= 0.26;
    if (text.includes("kredit tarixi") || text.includes("credit history") || text.includes("????????? ???????")) score -= 0.48;
    if (text.includes("kredit byurosi") || text.includes("credit bureau") || text.includes("?????????? ????")) score -= 0.18;
  }

  if (concepts.aid_request) {
    if (!isFinancialService) score -= 0.24;
    if (hasAid && hasPrimaryAction) score += 0.3;
    else if (hasAid) score += 0.18;

    if (!concepts.info_request && hasInfo && !hasPrimaryAction) score -= 0.22;
    if (hasMaterialAid) score += 0.28;
  }

  if (concepts.money_need) {
    if (hasLoan && hasPrimaryAction) score += 0.16;
    if (hasAid && hasPrimaryAction) score += 0.18;
    if (hasMoney) score += 0.06;
    if (hasMaterialAid) score += 0.12;
  }

  if (concepts.info_request) {
    if (hasInfo) score += 0.22;
  }

  if (concepts.generic_finance_request) {
    if (hasLoan && hasPrimaryAction && !activeServiceDomains.education && !activeServiceDomains.youth) {
      score += 0.1;
    }

    if (hasMaterialAid) {
      score += 0.12;
    }

    for (const [domain, active] of Object.entries(activeServiceDomains)) {
      if (!active || concepts.domains[domain]) continue;

      if (domain === "education" || domain === "youth") score -= 0.18;
      if (domain === "family") score -= 0.1;
      if (domain === "housing") score -= 0.08;
    }
  }

  return score;
}
