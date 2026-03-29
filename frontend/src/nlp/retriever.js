import { CANONICAL_SERVICES } from "../data/catalog.js";
import { tokenize, tokenizeQuery, normalizeText } from "./tokenizer.js";
import { buildTfIdfIndex, cosineSimilarity, createQueryVector } from "./tfidf.js";
import { detectQueryConcepts, scoreServiceConcepts } from "./concepts.js";


const FINANCE_SIGNAL_PATTERN = /\b(kredit|loan|qarz|ssuda|ipoteka|garov|nafaqa|subsidiya|grant|yordam|kompensatsiya|stipendiya|moddiy|pul|mablag|valyuta)\b/i;
const ADMIN_INFO_PATTERN = /(kredit tarixi|credit history|ma['?]?lumotnoma|spravka|sms|cheklov|taqiq|status|reyestr|registry)/i;
const PRIMARY_FLOW_PATTERN = /(olish|ajratish|berish|tayinlash|rasmiylashtirish|ariza|apply|obtain|request)/i;
const STRONG_FINANCE_TERM_PATTERN = /^(kredit|qarz|ssuda|ipoteka|nafaqa|subsidiya|grant|yordam|kompensatsiya|stipendiya)$/i;
const FINANCE_NOISE_PATTERN = /(soliq qarzi|tax debt|qarzdorlik|akkreditatsiya|accreditation|sanatsiya|restructuring|tugatish|termination)/i;


function serviceToSearchText(service) {
  return [
    ...Object.values(service.name ?? {}),
    service.cat,
    ...Object.values(service.auth ?? {}),
    ...Object.values(service.description ?? {}),
    ...(service.documents?.uz ?? []),
    ...(service.documents?.ru ?? []),
    ...(service.documents?.en ?? []),
    ...(service.documents?.kk ?? []),
    ...(service.keywords ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

function applyBusinessRules(queryTokens, rawQueryTokens, normalizedQuery, concepts, scored) {
  const querySet = new Set(queryTokens);
  const rawQuerySet = new Set(rawQueryTokens);
  const duplicateHints = ["takroriy", "dublikat", "duplicate", "lost", "yoqolgan", "replacement"];
  const wantsDuplicate = duplicateHints.some((token) => querySet.has(token));
  const financeQueryTokens = [...rawQuerySet].filter((token) => FINANCE_SIGNAL_PATTERN.test(token));
  const strongFinanceTokens = financeQueryTokens.filter((token) => STRONG_FINANCE_TERM_PATTERN.test(token));

  return scored.map((item) => {
    let score = item.score;

    if (item.service.id === 1001 && querySet.has("tugildi")) {
      score += 0.35;
    }

    if (item.service.id === 1099 && querySet.has("tugildi") && !wantsDuplicate) {
      score -= 0.2;
    }

    if ((item.service.keywords ?? []).some((keyword) => querySet.has(keyword.toLowerCase()))) {
      score += 0.08;
    }

    const searchableText = serviceToSearchText(item.service).toLowerCase();
    score += scoreServiceConcepts(item.service, concepts);

    if (financeQueryTokens.some((token) => searchableText.includes(token))) {
      score += 0.22;
    }

    if (strongFinanceTokens.some((token) => searchableText.includes(token))) {
      score += 0.28;
    }

    if ((concepts.loan_request || concepts.aid_request || concepts.money_need) && !FINANCE_SIGNAL_PATTERN.test(searchableText)) {
      score -= 0.6;
    }

    if ((concepts.loan_request || concepts.money_need) && !concepts.info_request) {
      if (ADMIN_INFO_PATTERN.test(searchableText) && !PRIMARY_FLOW_PATTERN.test(searchableText)) {
        score -= 0.35;
      }
    }

    if ((concepts.loan_request || concepts.aid_request || concepts.money_need) && FINANCE_NOISE_PATTERN.test(searchableText)) {
      score -= 0.45;
    }

    return { ...item, score };
  });
}

export function createRetriever(services = CANONICAL_SERVICES) {
  const documents = services.map((service) => tokenize(serviceToSearchText(service)));
  const index = buildTfIdfIndex(documents);

  function search(query, { limit = 5 } = {}) {
    const rawQueryTokens = tokenizeQuery(query, { removeStopwords: false });
    const queryTokens = tokenizeQuery(query);
    const normalizedQuery = normalizeText(query);
    const queryVector = createQueryVector(queryTokens, index.idf);

    const concepts = detectQueryConcepts(rawQueryTokens, queryTokens, normalizedQuery);
    const hasExplicitFinanceKeyword = rawQueryTokens.some((token) => FINANCE_SIGNAL_PATTERN.test(token));
    const minScore = concepts.money_need && !hasExplicitFinanceKeyword ? 0.08 : 0.02;

    return applyBusinessRules(
      queryTokens,
      rawQueryTokens,
      normalizedQuery,
      concepts,
      services.map((service, serviceIndex) => ({
        service,
        score: cosineSimilarity(queryVector, index.vectors[serviceIndex]),
      })),
    )
      .filter((item) => item.score > minScore)
      .sort((left, right) => right.score - left.score)
      .slice(0, limit);
  }

  return { search };
}
