import { CANONICAL_SERVICES } from "../data/catalog.js";
import { createRetriever } from "./retriever.js";
import { detectSituation } from "./situations.js";

export function createNlpEngine(services = CANONICAL_SERVICES) {
  const retriever = createRetriever(services);
  const serviceMap = new Map(services.map((service) => [service.id, service]));

  function findServices(query, options) {
    return retriever.search(query, options);
  }

  function findSituation(query) {
    const result = detectSituation(query);

    if (!result?.chain) {
      return null;
    }

    return {
      ...result,
      steps: result.chain.steps.map((id) => serviceMap.get(id)).filter(Boolean),
      optionalSteps: result.chain.optional_steps
        .map((id) => serviceMap.get(id))
        .filter(Boolean),
    };
  }

  return {
    findServices,
    findSituation,
  };
}

export const nlpEngine = createNlpEngine();
