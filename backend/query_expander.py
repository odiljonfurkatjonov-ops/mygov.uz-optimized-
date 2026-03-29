"""Cross-lingual concept-driven query expansion."""

from __future__ import annotations

from nlp_engine import _stem, normalize_text, tokenize


class QueryExpander:
    """
    Expands a user query using CONCEPT_LEXICON concept clusters.
    If a query matches terms in concept "pension", expand with all
    equivalent terms across all 4 languages so the TF-IDF retriever
    can match services described in different languages.
    """

    def __init__(self, lexicon: dict):
        self.lexicon = lexicon
        self._term_to_concept = {}
        for concept_key, payload in lexicon.items():
            for field in ("terms", "phrases", "typo_variants"):
                for lang, values in payload.get(field, {}).items():
                    for value in values:
                        normalized = normalize_text(value)
                        self._term_to_concept[(lang, normalized)] = concept_key
                        for token in tokenize(value, lang):
                            self._term_to_concept[(lang, token)] = concept_key

    def detect_concepts(self, query: str, lang: str) -> list[tuple[str, float]]:
        """
        Return list of (concept_key, match_score) for concepts found in query.
        For short generic queries, phrase overlap is intentionally conservative.
        """

        normalized_query = normalize_text(query)
        query_tokens = set(tokenize(query, lang))
        short_query = len(query_tokens) <= 1
        hits: dict[str, float] = {}

        for concept_key, payload in self.lexicon.items():
            best_score = 0.0

            for phrase in payload.get("phrases", {}).get(lang, []):
                phrase_norm = normalize_text(phrase)
                phrase_tokens = set(tokenize(phrase, lang))
                if not phrase_tokens:
                    continue
                if phrase_norm and phrase_norm in normalized_query:
                    best_score = max(best_score, 2.0)
                    continue
                overlap = len(phrase_tokens & query_tokens)
                if short_query:
                    if phrase_tokens == query_tokens:
                        best_score = max(best_score, 1.8)
                else:
                    if overlap >= max(1, len(phrase_tokens) // 2):
                        best_score = max(best_score, 2.0 * (overlap / len(phrase_tokens)))

            for term in payload.get("terms", {}).get(lang, []):
                term_norm = normalize_text(term)
                term_tokens = tokenize(term, lang)
                if term_norm and term_norm in normalized_query:
                    best_score = max(best_score, 1.5)
                    continue
                if any(token in query_tokens for token in term_tokens):
                    best_score = max(best_score, 1.2)
                    continue
                term_stem = _stem(term_norm, lang)
                if not short_query:
                    for query_token in query_tokens:
                        if len(query_token) >= 4 and abs(len(query_token) - len(term_stem)) <= 2 and (term_stem.startswith(query_token) or query_token.startswith(term_stem)):
                            best_score = max(best_score, 0.9)
                            break

            for typo in payload.get("typo_variants", {}).get(lang, []):
                typo_norm = normalize_text(typo)
                if typo_norm and (typo_norm in normalized_query or _stem(typo_norm, lang) in query_tokens):
                    best_score = max(best_score, 1.0)

            if best_score > 0.0:
                hits[concept_key] = best_score

        return sorted(hits.items(), key=lambda item: item[1], reverse=True)

    def expand(self, query: str, lang: str, target_langs: list[str] = ("uz", "ru", "en", "kk")) -> str:
        """Detect concepts in query, then append cross-language equivalents."""

        expanded_terms = [normalize_text(query)]
        seen = {normalize_text(query)}

        for concept_key, _score in self.detect_concepts(query, lang):
            payload = self.lexicon[concept_key]
            for target_lang in target_langs:
                for field in ("terms", "phrases"):
                    for value in payload.get(field, {}).get(target_lang, []):
                        normalized = normalize_text(value)
                        if normalized and normalized not in seen:
                            expanded_terms.append(normalized)
                            seen.add(normalized)

        return " ".join(expanded_terms)

    def get_concept_weights(self, query: str, lang: str) -> dict[str, float]:
        """Return {concept_key: weight} for all concepts found in the query."""

        return {
            concept_key: float(self.lexicon[concept_key].get("weight", 1.0))
            for concept_key, _score in self.detect_concepts(query, lang)
        }
