"""End-to-end Python NLP pipeline with optional hybrid layers."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from lexicon import CONCEPT_LEXICON
from nlp_engine import NeuralClassifier, ServiceRetriever, detect_language
from services_data import SERVICES_DB, SITUATION_CHAINS, TRAINING_EXAMPLES

try:
    from spellcheck import SpellChecker
except Exception:
    SpellChecker = None

try:
    from query_expander import QueryExpander
except Exception:
    QueryExpander = None

try:
    from reranker import HybridReranker
except Exception:
    HybridReranker = None


MODEL_DIR = Path(__file__).with_name("model_weights")
WEIGHTS_PATH = MODEL_DIR / "weights.json"
_SERVICE_MAP = {service["id"]: service for service in SERVICES_DB}
_CLASSIFIER = NeuralClassifier().fit(TRAINING_EXAMPLES)
_RETRIEVER = ServiceRetriever(SERVICES_DB)
_SPELLCHECKER = SpellChecker(CONCEPT_LEXICON, SERVICES_DB) if SpellChecker else None
_EXPANDER = QueryExpander(CONCEPT_LEXICON) if QueryExpander else None


def _load_weights() -> dict:
    """Load reranker weights from disk when available."""

    if WEIGHTS_PATH.exists():
        with WEIGHTS_PATH.open("r", encoding="utf-8") as handle:
            return json.load(handle)
    if HybridReranker:
        return HybridReranker.DEFAULT_WEIGHTS.copy()
    return {}


def train_and_save() -> dict:
    """Prepare pipeline assets and save default weights if missing."""

    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    if HybridReranker and not WEIGHTS_PATH.exists():
        with WEIGHTS_PATH.open("w", encoding="utf-8") as handle:
            json.dump(HybridReranker.DEFAULT_WEIGHTS, handle, ensure_ascii=False, indent=2)
    return {"services": len(SERVICES_DB), "situations": len(SITUATION_CHAINS)}


def process_query(
    query: str,
    lang: str | None = None,
    reranker_weights: dict | None = None,
    top_k: int = 5,
) -> dict:
    """Process a query through language detection, retrieval, and hybrid reranking."""

    original_query = query or ""
    lang = lang or detect_language(original_query)

    corrected_query = original_query
    spell_corrections: list[str] = []
    if _SPELLCHECKER:
        corrected_query, spell_corrections = _SPELLCHECKER.correct_query(original_query, lang)

    expanded_query = corrected_query
    detected_concepts: list[str] = []
    concept_weights: dict[str, float] = {}
    if _EXPANDER:
        expanded_query = _EXPANDER.expand(corrected_query, lang)
        concept_weights = _EXPANDER.get_concept_weights(corrected_query, lang)
        detected_concepts = list(concept_weights.keys())

    situation, confidence = _CLASSIFIER.predict(corrected_query)
    situation_meta = SITUATION_CHAINS.get(situation, {"label": {}, "steps": [], "optional_steps": []})

    candidate_k = max(top_k * 5, 25)
    retriever_hits = _RETRIEVER.retrieve(expanded_query, top_k=candidate_k)

    if HybridReranker:
        weights = reranker_weights or _load_weights()
        reranker = HybridReranker(weights)
        retriever_hits = reranker.rerank(retriever_hits, corrected_query.lower(), lang, concept_weights)
    else:
        for hit in retriever_hits:
            hit["hybrid_score"] = hit["score"]

    retriever_hits = retriever_hits[:top_k]
    chain_ids = list(situation_meta.get("steps", [])) + list(situation_meta.get("optional_steps", []))
    chain = [_SERVICE_MAP[service_id] for service_id in chain_ids if service_id in _SERVICE_MAP]
    hybrid_scores = [(item["id"], round(float(item.get("hybrid_score", 0.0)), 4)) for item in retriever_hits]

    return {
        "query": original_query,
        "corrected_query": corrected_query,
        "expanded_query": expanded_query,
        "spell_corrections": spell_corrections,
        "detected_concepts": detected_concepts,
        "language": lang,
        "situation": situation,
        "situation_label": situation_meta.get("label", {}).get(lang) or situation_meta.get("label", {}).get("en", ""),
        "confidence": round(float(confidence), 4),
        "high_confidence": bool(confidence >= 0.65),
        "chain": chain,
        "retriever_hits": retriever_hits,
        "hybrid_scores": hybrid_scores,
    }


def format_response(result: dict) -> str:
    """Format pipeline output for terminal display."""

    lines = [
        f"Query: {result['query']}",
        f"Language: {result['language']}",
        f"Corrected: {result['corrected_query']}",
        f"Expanded: {result['expanded_query']}",
        f"Situation: {result['situation_label']} ({result['confidence']:.2f})",
    ]
    if result["spell_corrections"]:
        lines.append(f"Corrections: {', '.join(result['spell_corrections'])}")
    if result["detected_concepts"]:
        lines.append(f"Concepts: {', '.join(result['detected_concepts'])}")
    if result["retriever_hits"]:
        top = result["retriever_hits"][0]
        lines.append(f"Top service: {top['id']} - {top['name']} (hybrid={top['hybrid_score']:.3f})")
    return "\n".join(lines)


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    train_and_save()
    sample_queries = [
        "Bolam tug'ildi nima qilishim kerak",
        "Traktor uchun guvohnoma",
        "Retire pension application documents",
    ]
    for sample in sample_queries:
        print(format_response(process_query(sample)))
        print("-" * 60)
