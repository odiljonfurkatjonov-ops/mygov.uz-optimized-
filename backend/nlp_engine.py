"""Core NLP primitives for the standalone Python search pipeline."""

from __future__ import annotations

import re
from collections import Counter, defaultdict

import numpy as np


TOKEN_RE = re.compile(r"[0-9A-Za-zА-Яа-яЁёʻ'’`ҒғҚқҲҳЎўҮүӘәІі]+", re.UNICODE)

UZBEK_SUFFIXES = [
    "moqchiman", "moqchimiz", "moqchi", "gandan", "ganda", "ingiz", "imiz",
    "ning", "dagi", "dan", "lar", "lari", "larni", "larga", "gan", "ydi",
    "adi", "ish", "chi", "lik", "siz", "ing", "im", "ga", "da", "ni", "li", "si", "i",
]

RUSSIAN_SUFFIXES = [
    "ствами", "ями", "ами", "ого", "его", "ому", "ему", "ыми", "ими",
    "ость", "ости", "ение", "ений", "аться", "яться", "ться", "ая", "яя", "ую", "юю",
    "ий", "ый", "ой", "ых", "их", "ым", "им", "ов", "ев", "ей", "ам", "ям",
    "ах", "ях", "ом", "ем", "ть", "ся", "сь",
]

ENGLISH_SUFFIXES = [
    "ations", "ation", "ments", "ment", "ness", "ings", "ing", "ied", "ies", "ers", "er", "ed", "ly", "s",
]

KARAKALPAK_SUFFIXES = [
    "лардың", "лердің", "ларға", "лерге", "лардан", "лерден", "ларда", "лерде",
    "лары", "лері", "ның", "ниң", "ға", "ге", "қа", "ке", "да", "де", "та", "те",
    "ды", "ди", "ты", "ти", "ны", "ни", "лар", "лер", "дар", "дер",
]


def normalize_text(text: str) -> str:
    """Normalize multilingual text for matching."""

    text = (text or "").lower()
    text = text.replace("’", "'").replace("`", "'").replace("ʻ", "'").replace("ʼ", "'")
    return re.sub(r"\s+", " ", text).strip()


def detect_language(text: str) -> str:
    """Best-effort language detection for uz, ru, en, and kk."""

    sample = normalize_text(text)
    if not sample:
        return "uz"

    if any(ch in sample for ch in "ҳқғўүәің"):
        return "kk"

    cyrillic = sum(1 for ch in sample if "а" <= ch <= "я" or ch == "ё")
    latin = sum(1 for ch in sample if "a" <= ch <= "z")
    tokens = set(normalize_text(match.group(0)) for match in TOKEN_RE.finditer(sample))

    karakalpak_markers = {"келеді", "туўылды", "жәрдемақы", "мүгедектік", "тіркеў", "ашқым"}
    russian_markers = {"что", "как", "ребёнок", "пенсию", "документы", "оформить", "квартиру"}

    if tokens & karakalpak_markers:
        return "kk"
    if cyrillic > latin:
        return "ru" if tokens & russian_markers else "kk"
    return "en" if any(token in {"the", "my", "what", "next", "application", "documents", "baby", "child"} for token in tokens) else "uz"


def _detect_token_language(token: str, fallback: str = "uz") -> str:
    normalized = normalize_text(token)
    if any(ch in normalized for ch in "ҳқғўүәің"):
        return "kk"
    if any("а" <= ch <= "я" or ch == "ё" for ch in normalized):
        return "ru"
    return fallback if fallback in {"uz", "ru", "en", "kk"} else "en"


def _stem(token: str, lang: str) -> str:
    """Lightweight language-aware stemming for Uzbek, Russian, English, and Karakalpak."""

    t = normalize_text(token)
    if len(t) <= 3:
        return t

    suffixes = {
        "uz": UZBEK_SUFFIXES,
        "ru": RUSSIAN_SUFFIXES,
        "en": ENGLISH_SUFFIXES,
        "kk": KARAKALPAK_SUFFIXES,
    }.get(lang, [])

    for suffix in suffixes:
        if t.endswith(suffix) and len(t) - len(suffix) >= 3:
            t = t[: -len(suffix)]
            break

    if lang == "en":
        if t == "children":
            return "child"
        if t.endswith("ies") and len(t) > 4:
            return t[:-3] + "y"
        if t.endswith("s") and len(t) > 4 and not t.endswith("ss"):
            return t[:-1]

    return t


def tokenize(text: str, language: str | None = None) -> list[str]:
    """Tokenize text into normalized and stemmed multilingual terms."""

    lang = language or detect_language(text)
    cleaned = []
    seen = set()
    for match in TOKEN_RE.finditer(text or ""):
        raw = normalize_text(match.group(0))
        if len(raw) < 2:
            continue
        token_lang = _detect_token_language(raw, fallback=lang)
        stem = _stem(raw, token_lang)
        for candidate in (raw, stem):
            if candidate and candidate not in seen:
                cleaned.append(candidate)
                seen.add(candidate)
    return cleaned


class TFIDFVectorizer:
    """Simple TF-IDF vectorizer implemented with NumPy."""

    def __init__(self) -> None:
        self.vocabulary_: dict[str, int] = {}
        self.idf_: np.ndarray | None = None

    def fit(self, documents: list[str]) -> "TFIDFVectorizer":
        """Learn a vocabulary and IDF weights from documents."""

        doc_tokens = [set(tokenize(doc)) for doc in documents]
        vocab = sorted({token for tokens in doc_tokens for token in tokens})
        self.vocabulary_ = {token: idx for idx, token in enumerate(vocab)}

        doc_count = max(len(documents), 1)
        df = np.zeros(len(vocab), dtype=float)
        for tokens in doc_tokens:
            for token in tokens:
                df[self.vocabulary_[token]] += 1.0

        self.idf_ = np.log((1.0 + doc_count) / (1.0 + df)) + 1.0
        return self

    def transform(self, documents: list[str]) -> np.ndarray:
        """Transform documents into TF-IDF vectors."""

        if self.idf_ is None:
            raise ValueError("TFIDFVectorizer must be fit before transform().")

        matrix = np.zeros((len(documents), len(self.vocabulary_)), dtype=float)
        for row, document in enumerate(documents):
            counts = Counter(tokenize(document))
            if not counts:
                continue
            total = float(sum(counts.values()))
            for token, count in counts.items():
                idx = self.vocabulary_.get(token)
                if idx is not None:
                    matrix[row, idx] = (count / total) * self.idf_[idx]

        norms = np.linalg.norm(matrix, axis=1, keepdims=True)
        norms[norms == 0.0] = 1.0
        return matrix / norms

    def fit_transform(self, documents: list[str]) -> np.ndarray:
        """Fit and transform in one step."""

        return self.fit(documents).transform(documents)


class NeuralClassifier:
    """A lightweight centroid classifier used as a neural-classifier stand-in."""

    def __init__(self) -> None:
        self.vectorizer = TFIDFVectorizer()
        self.labels_: list[str] = []
        self.centroids_: np.ndarray | None = None

    def fit(self, examples: list[dict]) -> "NeuralClassifier":
        """Fit class centroids from labeled training examples."""

        texts = [item["query"] for item in examples]
        labels = [item["situation"] for item in examples]
        matrix = self.vectorizer.fit_transform(texts)

        grouped: dict[str, list[np.ndarray]] = defaultdict(list)
        for label, vector in zip(labels, matrix):
            grouped[label].append(vector)

        self.labels_ = sorted(grouped)
        self.centroids_ = np.vstack([
            np.mean(np.vstack(grouped[label]), axis=0) if grouped[label] else np.zeros(matrix.shape[1], dtype=float)
            for label in self.labels_
        ])
        norms = np.linalg.norm(self.centroids_, axis=1, keepdims=True)
        norms[norms == 0.0] = 1.0
        self.centroids_ = self.centroids_ / norms
        return self

    def predict(self, text: str) -> tuple[str, float]:
        """Predict the best situation label and confidence."""

        if self.centroids_ is None or not self.labels_:
            raise ValueError("NeuralClassifier must be fit before predict().")

        vector = self.vectorizer.transform([text])[0]
        scores = self.centroids_ @ vector
        best_idx = int(np.argmax(scores))
        best_score = float(scores[best_idx])
        shifted = np.exp(scores - np.max(scores))
        probs = shifted / shifted.sum() if shifted.sum() else np.ones_like(scores) / len(scores)
        return self.labels_[best_idx], float(probs[best_idx] * 0.6 + max(best_score, 0.0) * 0.4)


class ServiceRetriever:
    """TF-IDF service retriever over multilingual service records."""

    def __init__(self, services_db: list[dict]) -> None:
        self.services_db = services_db
        self.vectorizer = TFIDFVectorizer()
        self.documents = [self._service_to_text(record) for record in services_db]
        self.matrix = self.vectorizer.fit_transform(self.documents)

    def _service_to_text(self, service: dict) -> str:
        parts = [
            service.get("name_uz", ""),
            service.get("name_ru", ""),
            service.get("name_en", ""),
            service.get("name_kk", ""),
            service.get("description_uz", ""),
            service.get("description_ru", ""),
            service.get("description_en", ""),
            service.get("description_kk", ""),
            " ".join(service.get("documents_uz", [])),
            " ".join(service.get("documents_ru", [])),
            " ".join(service.get("documents_en", [])),
            " ".join(service.get("documents_kk", [])),
            " ".join(service.get("tags", [])),
            " ".join(service.get("keywords", [])),
        ]
        for phrases in service.get("intent_phrases", {}).values():
            parts.extend(phrases)
        for phrases in service.get("exclusion_phrases", {}).values():
            parts.extend(phrases)
        return " ".join(part for part in parts if part)

    def retrieve(self, query: str, top_k: int = 5) -> list[dict]:
        """Return top-k TF-IDF matches for a query."""

        query_vector = self.vectorizer.transform([query])[0]
        scores = self.matrix @ query_vector
        ranked_indices = np.argsort(scores)[::-1][:top_k]

        results = []
        for idx in ranked_indices:
            service = self.services_db[int(idx)]
            score = float(scores[int(idx)])
            if score <= 0.0:
                continue
            results.append({
                "id": service["id"],
                "name": service.get("name_en") or service.get("name_uz"),
                "category": service.get("category", ""),
                "score": score,
                "similar_ids": list(service.get("similar_ids", [])),
                "service_record": service,
            })
        return results
