"""Hybrid re-ranker for combining lexical and rule-based signals."""

from __future__ import annotations

from nlp_engine import normalize_text, tokenize


class HybridReranker:
    """
    Combines multiple signals to re-rank service search results.

    Final score formula:
      score = (alpha x tfidf_score)
            + (beta x concept_match_bonus)
            + (gamma x tag_match_bonus)
            + (delta x intent_phrase_match_bonus)
            - (epsilon x exclusion_penalty)
            - (zeta x confusion_penalty)
            + quality_bonus
    """

    DEFAULT_WEIGHTS = {
        "alpha": 1.0,
        "beta": 0.8,
        "gamma": 0.6,
        "delta": 1.2,
        "epsilon": 0.9,
        "zeta": 0.5,
    }

    def __init__(self, weights: dict = None):
        self.weights = weights or self.DEFAULT_WEIGHTS.copy()

    def score_service(
        self,
        tfidf_score: float,
        service_record: dict,
        query: str,
        lang: str,
        concept_weights: dict[str, float],
    ) -> float:
        """Compute a hybrid score for one service."""

        query_norm = normalize_text(query)
        query_tokens = set(tokenize(query_norm))
        short_query = len(query_tokens) <= 1
        service_tags = set(service_record.get("tags", []))
        searchable = " ".join([
            service_record.get(f"name_{lang}", ""),
            service_record.get("name_en", ""),
            service_record.get(f"description_{lang}", ""),
            service_record.get(f"auth_{lang}", ""),
            service_record.get("category", ""),
            " ".join(service_record.get(f"documents_{lang}", [])),
            " ".join(service_record.get("aliases", [])),
        ]).lower()

        concept_match_bonus = 0.0
        for concept_key, weight in concept_weights.items():
            if concept_key in service_tags or concept_key.replace("_", " ") in searchable:
                concept_match_bonus += weight

        tag_match_bonus = sum(concept_weights.get(tag, 0.0) for tag in service_tags)

        intent_phrase_match_bonus = 0.0
        for phrase in service_record.get("intent_phrases", {}).get(lang, []):
            phrase_norm = normalize_text(phrase)
            if phrase_norm and phrase_norm in query_norm:
                intent_phrase_match_bonus = max(intent_phrase_match_bonus, 1.0)
            else:
                overlap = len(query_tokens & set(tokenize(phrase_norm)))
                if not short_query and overlap >= 2:
                    intent_phrase_match_bonus = max(intent_phrase_match_bonus, 0.55)

        exclusion_penalty = 0.0
        for phrase in service_record.get("exclusion_phrases", {}).get(lang, []):
            phrase_norm = normalize_text(phrase)
            if phrase_norm and phrase_norm in query_norm:
                exclusion_penalty = max(exclusion_penalty, 1.0)

        confusion_penalty = 0.0
        tractor_terms = {"traktor", "tractor", "???????"}
        driver_terms = {"haydovchilik", "driver", "????????????", "prava"}
        duplicate_terms = {"duplicate", "dublikat", "takroriy", "lost", "???????", "yo'qolgan", "replacement", "reissue"}

        if query_tokens & duplicate_terms:
            if "duplicate_document" in service_tags:
                intent_phrase_match_bonus = max(intent_phrase_match_bonus, 1.15)
                if "childbirth" in service_tags:
                    intent_phrase_match_bonus += 0.35
            elif "childbirth" in service_tags and "duplicate_document" not in service_tags:
                confusion_penalty += 1.1

        if service_record.get("similar_ids"):
            if service_record["id"] == 6001 and query_tokens & tractor_terms:
                confusion_penalty += 1.0
            if service_record["id"] == 6099 and query_tokens & driver_terms and not (query_tokens & tractor_terms):
                confusion_penalty += 0.9
            if service_record["id"] == 1001 and query_tokens & duplicate_terms:
                confusion_penalty += 1.1
            if service_record["id"] == 1099 and "childbirth" in concept_weights and not (query_tokens & duplicate_terms):
                confusion_penalty += 0.6
            if service_record["id"] == 3001 and "technical_inventory" in concept_weights:
                confusion_penalty += 0.8
            if service_record["id"] == 3099 and "registration" in concept_weights and "technical_inventory" not in concept_weights:
                confusion_penalty += 0.5

        if "pension" in concept_weights and ("retirement_documents" in concept_weights or "pensiya" in query_norm):
            if "pension" not in service_tags:
                confusion_penalty += 0.9
            if "allowance" in service_tags or "childbirth" in service_tags:
                confusion_penalty += 0.8

        if "childbirth" in concept_weights and "pension" not in concept_weights:
            if "pension" in service_tags:
                confusion_penalty += 0.7

        if short_query and "child_services" in concept_weights and "childbirth" not in concept_weights:
            if "childbirth" in service_tags or "allowance" in service_tags:
                confusion_penalty += 0.9
        if short_query and "documents" in concept_weights and "transport" in service_tags:
            confusion_penalty += 0.7

        quality_bonus = 0.0
        if service_record.get("source") == "structured_catalog":
            quality_bonus += 0.45
        if service_record.get("source") == "curated_overlay":
            quality_bonus += 0.5
        if service_record.get("primary"):
            quality_bonus += 0.2
        if any(service_record.get(f"description_{code}", "") for code in ("uz", "ru", "en", "kk")):
            quality_bonus += 0.1
        if sum(len(service_record.get(f"documents_{code}", [])) for code in ("uz", "ru", "en", "kk")) >= 4:
            quality_bonus += 0.1
        if len(service_record.get("tags", [])) >= 2:
            quality_bonus += 0.1

        weights = self.weights
        return (
            weights["alpha"] * tfidf_score
            + weights["beta"] * concept_match_bonus
            + weights["gamma"] * tag_match_bonus
            + weights["delta"] * intent_phrase_match_bonus
            - weights["epsilon"] * exclusion_penalty
            - weights["zeta"] * confusion_penalty
            + quality_bonus
        )

    def rerank(
        self,
        retriever_results: list[dict],
        query: str,
        lang: str,
        concept_weights: dict[str, float],
    ) -> list[dict]:
        """Re-rank retriever results using hybrid scoring."""

        reranked = []
        for result in retriever_results:
            service_record = result.get("service_record", {})
            hybrid_score = self.score_service(
                tfidf_score=float(result.get("score", 0.0)),
                service_record=service_record,
                query=query,
                lang=lang,
                concept_weights=concept_weights,
            )
            reranked.append({**result, "hybrid_score": hybrid_score})

        return sorted(reranked, key=lambda item: item["hybrid_score"], reverse=True)
