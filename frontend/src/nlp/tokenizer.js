import { isStopword } from "./stopwords.js";

const APOSTROPHES = /[\u2018\u2019\u02bc\u02bb'`]/gu;
const LETTER_OR_NUMBER = /[^\p{L}\p{N}\s]+/gu;
const WHITESPACE = /\s+/g;

const TOKEN_ALIASES = {
  bolam: ["bola"],
  bolani: ["bola"],
  bolaga: ["bola"],
  farzandim: ["farzand"],
  farzandli: ["farzand", "bola"],
  chaqalogim: ["chaqaloq"],
  tugildi: ["tugilgan", "tugilish"],
  tuguldi: ["tugildi", "tugilgan", "tugilish"],
  boldim: ["boldi", "tugildi"],
  boldi: ["tugildi"],
  onaman: ["ona"],
  otaman: ["ota"],
  uylandim: ["nikoh", "turmush"],
  turmush: ["nikoh"],
  pensiyaga: ["pensiya"],
  haydovchilik: ["haydovchi"],
  krediti: ["kredit"],
  kreditim: ["kredit"],
  qarzim: ["qarz"],
  ssudasi: ["ssuda"],
  pulim: ["pul"],
  mablagim: ["mablag"],
  "\u0434\u0435\u043d\u044c\u0433\u0438": ["pul", "mablag", "yordam"],
  "\u0434\u0435\u043d\u0435\u0436\u043d\u044b\u0439": ["pul", "mablag"],
  "\u043a\u0440\u0435\u0434\u0438\u0442": ["kredit"],
  "\u043a\u0440\u0435\u0434\u0438\u0442\u0430": ["kredit"],
  "\u043a\u0440\u0435\u0434\u0438\u0442\u043d\u044b\u0439": ["kredit"],
  "\u0437\u0430\u0439\u043c": ["qarz", "loan"],
  "\u0437\u0430\u0439\u043c\u0430": ["qarz", "loan"],
  "\u0441\u0441\u0443\u0434\u0430": ["ssuda", "loan"],
  "\u0438\u043f\u043e\u0442\u0435\u043a\u0430": ["ipoteka"],
  "\u043f\u043e\u0441\u043e\u0431\u0438\u0435": ["nafaqa", "yordam"],
  "\u0441\u0443\u0431\u0441\u0438\u0434\u0438\u044f": ["subsidiya"],
  "\u043f\u043e\u043c\u043e\u0449\u044c": ["yordam"],
  "\u0440\u0435\u0431\u0435\u043d\u043e\u043a": ["bola", "farzand"],
  "\u0440\u0435\u0431\u0451\u043d\u043e\u043a": ["bola", "farzand"],
  "\u0440\u043e\u0434\u0438\u043b\u0441\u044f": ["tugildi"],
  "\u043f\u0435\u043d\u0441\u0438\u044f": ["pensiya"],
  "\u0431\u0438\u0437\u043d\u0435\u0441": ["biznes"],
  "\u043f\u0440\u0430\u0432\u0430": ["prava", "guvohnoma", "haydovchi"],
  "\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u0435": ["haydovchi", "guvohnoma"],
  "\u0431\u0440\u0430\u043a": ["nikoh"],
  "\u0436\u0435\u043d\u0438\u043b\u0441\u044f": ["uylandim", "nikoh"],
  "\u0437\u0430\u043c\u0443\u0436": ["turmush", "nikoh"],
};

const PHRASE_ALIASES = [
  {
    patterns: ["bolalik boldim", "bolaliq boldim", "bolali boldim", "farzandli boldim"],
    inject: ["bola", "farzand", "tugildi", "chaqaloq"],
  },
  {
    patterns: ["ota boldim", "ota boldi", "ona boldim", "ona boldi"],
    inject: ["bola", "farzand", "tugildi", "chaqaloq"],
  },
  {
    patterns: ["bolam tugildi", "farzandim tugildi", "chaqaloq tugildi"],
    inject: ["bola", "farzand", "tugildi"],
  },
  {
    patterns: ["\u0440\u0435\u0431\u0435\u043d\u043e\u043a \u0440\u043e\u0434\u0438\u043b\u0441\u044f", "\u0440\u0435\u0431\u0451\u043d\u043e\u043a \u0440\u043e\u0434\u0438\u043b\u0441\u044f", "\u0440\u043e\u0434\u0438\u043b\u0441\u044f \u0440\u0435\u0431\u0435\u043d\u043e\u043a", "\u0440\u043e\u0434\u0438\u043b\u0441\u044f \u0440\u0435\u0431\u0451\u043d\u043e\u043a"],
    inject: ["bola", "farzand", "tugildi", "chaqaloq"],
  },
  {
    patterns: ["uy sotib oldim", "kvartira sotib oldim"],
    inject: ["uy", "kochmas", "mulk"],
  },
  {
    patterns: ["\u043a\u0443\u043f\u0438\u043b \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0443", "\u043a\u0443\u043f\u0438\u043b\u0438 \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0443", "\u0438\u043f\u043e\u0442\u0435\u043a\u0430 \u043d\u0430 \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0443"],
    inject: ["uy", "kochmas", "mulk", "ipoteka"],
  },
  {
    patterns: ["pensiyaga chiqdim", "nafaqaga chiqdim"],
    inject: ["pensiya", "nafaqa"],
  },
  {
    patterns: ["\u0432\u044b\u0448\u0435\u043b \u043d\u0430 \u043f\u0435\u043d\u0441\u0438\u044e", "\u0432\u044b\u0448\u043b\u0430 \u043d\u0430 \u043f\u0435\u043d\u0441\u0438\u044e", "\u043e\u0444\u043e\u0440\u043c\u0438\u0442\u044c \u043f\u0435\u043d\u0441\u0438\u044e"],
    inject: ["pensiya", "nafaqa"],
  },
  {
    patterns: ["manga pul kerak", "pul kerak", "mablag kerak", "qarz kerak", "kredit kerak", "pulim yoq", "menga pul kerak"],
    inject: ["kredit", "qarz", "loan", "ssuda", "moliyaviy", "yordam"],
  },
  {
    patterns: ["\u043c\u043d\u0435 \u043d\u0443\u0436\u043d\u044b \u0434\u0435\u043d\u044c\u0433\u0438", "\u043d\u0443\u0436\u043d\u044b \u0434\u0435\u043d\u044c\u0433\u0438", "\u043d\u0443\u0436\u0435\u043d \u043a\u0440\u0435\u0434\u0438\u0442", "\u043d\u0443\u0436\u043d\u0430 \u0441\u0443\u0431\u0441\u0438\u0434\u0438\u044f", "\u043d\u0443\u0436\u043d\u043e \u043f\u043e\u0441\u043e\u0431\u0438\u0435", "\u043d\u0443\u0436\u043d\u0430 \u043f\u043e\u043c\u043e\u0449\u044c"],
    inject: ["kredit", "qarz", "loan", "ssuda", "moliyaviy", "yordam", "nafaqa", "subsidiya"],
  },
  {
    patterns: ["\u0445\u043e\u0447\u0443 \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u0431\u0438\u0437\u043d\u0435\u0441", "\u043e\u0442\u043a\u0440\u044b\u0442\u044c \u0431\u0438\u0437\u043d\u0435\u0441", "\u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0431\u0438\u0437\u043d\u0435\u0441"],
    inject: ["biznes", "tadbirkor", "mchj"],
  },
  {
    patterns: ["\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u0435 \u043f\u0440\u0430\u0432\u0430", "\u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u043f\u0440\u0430\u0432\u0430", "\u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u0435 \u043f\u0440\u0430\u0432\u0430"],
    inject: ["haydovchi", "guvohnoma", "prava"],
  },
];

export function normalizeText(value = "") {
  return String(value)
    .toLowerCase()
    .replace(APOSTROPHES, "")
    .replace(LETTER_OR_NUMBER, " ")
    .replace(WHITESPACE, " ")
    .trim();
}

function baseTokenize(value = "") {
  const normalized = normalizeText(value);
  return normalized ? normalized.split(" ").filter(Boolean) : [];
}

function withAliases(tokens, normalized) {
  const expanded = [...tokens];

  for (const token of tokens) {
    expanded.push(...(TOKEN_ALIASES[token] ?? []));
  }

  for (const { patterns, inject } of PHRASE_ALIASES) {
    if (patterns.some((pattern) => normalized.includes(pattern))) {
      expanded.push(...inject);
    }
  }

  return [...new Set(expanded)];
}

export function tokenize(value = "", { removeStopwords = true } = {}) {
  const tokens = baseTokenize(value);

  return tokens.filter((token) => !removeStopwords || !isStopword(token));
}

export function tokenizeQuery(value = "", { removeStopwords = true } = {}) {
  const normalized = normalizeText(value);
  const tokens = withAliases(baseTokenize(value), normalized);

  return tokens.filter((token) => !removeStopwords || !isStopword(token));
}
