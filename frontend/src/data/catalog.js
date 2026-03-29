import { MASTER_SERVICES } from "./index.js";
import { SERVICES_DB, SITUATION_CHAINS, TRAINING_EXAMPLES } from "./services.js";

function emptyLocalizedLists() {
  return { uz: [], ru: [], en: [], kk: [] };
}

function emptyLocalizedText() {
  return { uz: "", ru: "", en: "", kk: "" };
}

function normalizeLegacyService(service) {
  return {
    id: service.id,
    name: {
      uz: service.uz?.name ?? "",
      ru: service.ru?.name ?? "",
      en: service.en?.name ?? "",
      kk: service.kk?.name ?? "",
    },
    cat: service.uz?.category ?? service.en?.category ?? service.ru?.category ?? service.kk?.category ?? "",
    auth: {
      uz: service.uz?.org ?? "",
      ru: service.ru?.org ?? "",
      en: service.en?.org ?? "",
      kk: service.kk?.org ?? "",
    },
    documents: emptyLocalizedLists(),
    description: emptyLocalizedText(),
    similar_service_ids: [],
    keywords: service.keywords ?? [],
    source: "legacy_catalog",
  };
}

function normalizeStructuredService(service) {
  return {
    ...service,
    keywords: service.keywords ?? [],
    source: "structured_catalog",
  };
}

const merged = new Map();

for (const service of MASTER_SERVICES) {
  merged.set(service.id, normalizeLegacyService(service));
}

for (const service of SERVICES_DB) {
  merged.set(service.id, normalizeStructuredService(service));
}

export const CANONICAL_SERVICES = [...merged.values()];
export { SITUATION_CHAINS, TRAINING_EXAMPLES };
