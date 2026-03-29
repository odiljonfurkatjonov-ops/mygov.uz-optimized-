import { nlpEngine } from "../nlp/engine.js";
import { SITUATION_CHAINS } from "../data/catalog.js";

const FALLBACK_LANG = "en";
const SITUATION_PROMOTION_SCORE = 0.9;

function getLocalizedValue(value, lang) {
  if (!value || typeof value !== "object") {
    return value ?? "";
  }

  return value[lang] ?? value.uz ?? value[FALLBACK_LANG] ?? Object.values(value)[0] ?? "";
}

function formatService(service, lang, score = 0, { promoted = false } = {}) {
  const rawScore = Math.max(0, score || 0);
  const displayConfidence = promoted
    ? Math.max(0.8, Math.min(0.95, rawScore))
    : Math.min(0.92, 1 - Math.exp(-rawScore));
  const percent = Math.round(displayConfidence * 100);

  return {
    id: service.id,
    name: getLocalizedValue(service.name, lang),
    category: service.cat,
    org: getLocalizedValue(service.auth, lang),
    description: getLocalizedValue(service.description, lang),
    documents: service.documents?.[lang] ?? service.documents?.uz ?? [],
    score: percent,
    matchPercent: promoted ? Math.max(80, percent) : Math.max(1, percent),
    raw: service,
  };
}

export function crossLanguageSearch(query, targetLang) {
  if (!query || !query.trim()) {
    return [];
  }

  const situation = nlpEngine.findSituation(query);
  const directMatches = nlpEngine.findServices(query, { limit: 12 });
  const seen = new Set();
  const ordered = [];

  for (const service of situation?.steps ?? []) {
    if (!seen.has(service.id)) {
      seen.add(service.id);
      ordered.push(formatService(service, targetLang, SITUATION_PROMOTION_SCORE, { promoted: true }));
    }
  }

  for (const { service, score } of directMatches) {
    if (!seen.has(service.id)) {
      seen.add(service.id);
      ordered.push(formatService(service, targetLang, score));
    }
  }

  return ordered;
}

export function getJourneySteps(query, lang) {
  if (!query || !query.trim()) {
    return [];
  }

  const situation = nlpEngine.findSituation(query);

  if (!situation?.steps?.length) {
    return [];
  }

  return situation.steps.map((service) => getLocalizedValue(service.name, lang));
}

export function getSituationOptions(lang) {
  return Object.entries(SITUATION_CHAINS).map(([id, chain]) => ({
    id,
    label: getLocalizedValue(chain.label, lang),
  }));
}
