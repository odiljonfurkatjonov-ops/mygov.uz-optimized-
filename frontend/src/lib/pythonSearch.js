import { crossLanguageSearch, getJourneySteps } from './search';

const PYTHON_API_URL = 'http://127.0.0.1:8000/query';

export async function searchServices(query, targetLang) {
  const trimmed = (query || '').trim();
  if (!trimmed) {
    return { results: [], journeySteps: [], source: 'empty', meta: null };
  }

  try {
    const response = await fetch(PYTHON_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: trimmed, lang: targetLang, top_k: 12 }),
    });

    if (!response.ok) {
      throw new Error(`Python API returned ${response.status}`);
    }

    const data = await response.json();
    return {
      results: Array.isArray(data.results) ? data.results : [],
      journeySteps: Array.isArray(data.journey_steps) ? data.journey_steps : [],
      source: 'python',
      meta: data,
    };
  } catch (_error) {
    return {
      results: crossLanguageSearch(trimmed, targetLang),
      journeySteps: getJourneySteps(trimmed, targetLang),
      source: 'javascript',
      meta: null,
    };
  }
}
