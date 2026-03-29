"""Pure Python multilingual fuzzy spell checker."""

from __future__ import annotations

from collections import defaultdict

from nlp_engine import tokenize


class SpellChecker:
    """
    Levenshtein edit-distance spell corrector.
    Uses CONCEPT_LEXICON typo_variants + all service terms as vocabulary.
    No external libraries - pure Python only.
    """

    def __init__(self, lexicon: dict, services_db: list):
        """Build language-aware vocabularies from the lexicon and service data."""

        self.vocab_by_lang: dict[str, set[str]] = defaultdict(set)
        self.global_vocab: set[str] = set()

        for payload in lexicon.values():
            for key in ("terms", "phrases", "typo_variants"):
                for lang, values in payload.get(key, {}).items():
                    for value in values:
                        for token in tokenize(value):
                            self.vocab_by_lang[lang].add(token)
                            self.global_vocab.add(token)

        for service in services_db:
            for lang in ("uz", "ru", "en", "kk"):
                text_fields = [
                    service.get(f"name_{lang}", ""),
                    service.get(f"description_{lang}", ""),
                    " ".join(service.get(f"documents_{lang}", [])),
                ]
                for text in text_fields:
                    for token in tokenize(text):
                        self.vocab_by_lang[lang].add(token)
                        self.global_vocab.add(token)

    @staticmethod
    def levenshtein(s1: str, s2: str) -> int:
        """Standard dynamic programming Levenshtein distance."""

        if s1 == s2:
            return 0
        if not s1:
            return len(s2)
        if not s2:
            return len(s1)

        prev = list(range(len(s2) + 1))
        for i, ch1 in enumerate(s1, start=1):
            curr = [i]
            for j, ch2 in enumerate(s2, start=1):
                insert_cost = curr[j - 1] + 1
                delete_cost = prev[j] + 1
                replace_cost = prev[j - 1] + (0 if ch1 == ch2 else 1)
                curr.append(min(insert_cost, delete_cost, replace_cost))
            prev = curr
        return prev[-1]

    def correct_token(self, token: str, lang: str, max_distance: int = 2) -> str:
        """
        Return the closest vocabulary word within max_distance edits.
        If no match within distance, return original token.
        Only correct tokens of length >= 4 to avoid false corrections.
        """

        if len(token) < 4 or token.isupper():
            return token

        lang_vocab = self.vocab_by_lang.get(lang, set())
        if token in lang_vocab or token in self.global_vocab:
            return token

        best_word = token
        best_distance = max_distance + 1

        for pool in (lang_vocab, self.global_vocab):
            for candidate in pool:
                if abs(len(candidate) - len(token)) > max_distance:
                    continue
                if candidate[:1] != token[:1]:
                    continue
                distance = self.levenshtein(token, candidate)
                if distance > max_distance:
                    continue
                ratio = distance / max(len(token), len(candidate))
                if ratio > 0.34:
                    continue
                if distance < best_distance or (distance == best_distance and candidate < best_word):
                    best_distance = distance
                    best_word = candidate
            if best_distance <= max_distance:
                break

        return best_word if best_distance <= max_distance else token

    def correct_query(self, query: str, lang: str) -> tuple[str, list[str]]:
        """
        Tokenize query, correct each token, reassemble.
        Return (corrected_query, list_of_corrections_made).
        Example: ("ipoteka kredit", ["ipateka→ipoteka"])
        """

        tokens = query.split()
        corrected_tokens = []
        corrections = []

        for raw_token in tokens:
            stripped = raw_token.strip()
            candidate = self.correct_token(stripped.lower(), lang)
            corrected_tokens.append(candidate)
            if candidate != stripped.lower():
                corrections.append(f"{stripped.lower()}→{candidate}")

        return " ".join(corrected_tokens), corrections
