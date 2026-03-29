import { SITUATION_CHAINS, TRAINING_EXAMPLES } from "../data/catalog.js";
import { tokenize, tokenizeQuery } from "./tokenizer.js";

const MIN_SITUATION_SCORE = 0.75;
const MIN_OVERLAP_TOKENS = 2;

const RULE_SIGNALS = {
  birth_child: [
    ["tugildi", "bola"],
    ["tugildi", "farzand"],
    ["tugildi", "chaqaloq"],
    ["boldim", "ota"],
    ["boldim", "ona"],
    ["boldim", "farzand"],
    ["boldim", "bola"],
  ],
  retirement: [
    ["pensiya"],
    ["nafaqa", "chiqdim"],
  ],
  buy_house: [
    ["uy", "sotib"],
    ["kvartira", "sotib"],
    ["ipoteka"],
  ],
  start_business: [
    ["biznes"],
    ["tadbirkor"],
    ["mchj"],
  ],
  get_driver_license: [
    ["haydovchi"],
    ["guvohnoma", "haydovchi"],
    ["prava"],
  ],
  marriage: [
    ["nikoh"],
    ["turmush"],
    ["uylandim"],
  ],
};

function overlapScore(queryTokens, exampleTokens) {
  const querySet = new Set(queryTokens);
  const overlapTokens = [...new Set(exampleTokens.filter((token) => querySet.has(token)))];

  if (overlapTokens.length < MIN_OVERLAP_TOKENS) {
    return 0;
  }

  return overlapTokens.length / Math.max(exampleTokens.length, 1);
}

function detectRuleBasedSituation(queryTokens) {
  const querySet = new Set(queryTokens);

  for (const [label, patterns] of Object.entries(RULE_SIGNALS)) {
    for (const pattern of patterns) {
      if (pattern.every((token) => querySet.has(token))) {
        return {
          id: label,
          score: 1,
          chain: SITUATION_CHAINS[label] ?? null,
        };
      }
    }
  }

  return null;
}

export function detectSituation(query) {
  const queryTokens = tokenizeQuery(query, { removeStopwords: true });

  if (!queryTokens.length) {
    return null;
  }

  const ruleMatch = detectRuleBasedSituation(queryTokens);

  if (ruleMatch) {
    return ruleMatch;
  }

  const scores = new Map();

  for (const [example, label] of TRAINING_EXAMPLES) {
    const exampleTokens = tokenize(example, { removeStopwords: true });
    const score = overlapScore(queryTokens, exampleTokens);

    if (score > 0) {
      scores.set(label, (scores.get(label) ?? 0) + score);
    }
  }

  const best = [...scores.entries()].sort((left, right) => right[1] - left[1])[0];

  if (!best || best[1] < MIN_SITUATION_SCORE) {
    return null;
  }

  return {
    id: best[0],
    score: best[1],
    chain: SITUATION_CHAINS[best[0]] ?? null,
  };
}
