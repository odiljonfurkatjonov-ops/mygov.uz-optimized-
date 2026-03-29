# -*- coding: utf-8 -*-
"""Ollama integration utilities for the my.gov.uz backend."""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import time
import urllib.request
from pathlib import Path
from typing import Any, Iterable

import numpy as np

from lexicon import CONCEPT_LEXICON
from nlp_engine import detect_language


OLLAMA_BASE_URL = "http://localhost:11434"

GOV_SYSTEM_PROMPT = """Role: Assistant for my.gov.uz covering 800+ government services.
Languages: Uzbek, Russian, English, Karakalpak.
Rule: Only recommend services that appear in the retrieved context.
Rule: Respond in the same language the user wrote in.
Rule: Structure answers as numbered steps, not paragraphs.
Rule: If a service has a similarly-named alternative, warn the user explicitly which one they need.
Parameters: temperature=0.15, num_ctx=4096."""


def write_modelfile(path: Path, base_model: str, system_prompt: str) -> None:
    """Write an Ollama Modelfile to disk."""

    modelfile = "\n".join(
        [
            f"FROM {base_model}",
            "SYSTEM \"\"\"",
            system_prompt,
            "\"\"\"",
            "PARAMETER temperature 0.15",
            "PARAMETER num_ctx 4096",
            "",
        ]
    )
    path.write_text(modelfile, encoding="utf-8")


def check_ollama() -> dict:
    """Check whether the Ollama server is running and list models."""

    try:
        url = f"{OLLAMA_BASE_URL}/api/tags"
        with urllib.request.urlopen(url, timeout=3) as response:
            payload = json.loads(response.read().decode("utf-8"))
        models = [item.get("name", "") for item in payload.get("models", []) if item.get("name")]
        return {"running": True, "models": models}
    except Exception:
        return {"running": False, "models": []}


class ModelManager:
    """Manage Ollama models used by the backend."""

    def __init__(self) -> None:
        self.base_dir = Path(__file__).resolve().parent
        self.modelfile_path = self.base_dir / "Modelfile"

    def ensure_model(self, name: str) -> bool:
        """Ensure a model is present locally, pulling if needed."""

        if name in self.list_available():
            return True
        try:
            result = subprocess.run(["ollama", "pull", name], check=False)
            return result.returncode == 0
        except Exception:
            return False

    def create_govbot(self, base: str) -> bool:
        """Create the govbot model from a base model and Modelfile."""

        try:
            write_modelfile(self.modelfile_path, base, GOV_SYSTEM_PROMPT)
            result = subprocess.run(["ollama", "create", "govbot", "-f", str(self.modelfile_path)], check=False)
            return result.returncode == 0
        except Exception:
            return False

    def list_available(self) -> list[str]:
        """Return a list of available model names."""

        return check_ollama().get("models", [])

    def best_chat_model(self) -> str | None:
        """Return the best available chat model from a priority list."""

        priority = ["govbot", "llama3.2", "mistral", "gemma2:2b", "qwen2.5:3b"]
        available = set(self.list_available())
        for name in priority:
            if name in available:
                return name
        return None

    def embedding_model_ready(self) -> bool:
        """Return True when the embedding model is available."""

        return "nomic-embed-text" in set(self.list_available())


def _read_json(path: Path) -> dict:
    """Read a JSON file from disk."""

    return json.loads(path.read_text(encoding="utf-8"))


def _normalize_service_record(record: dict) -> dict | None:
    """Normalize a raw service record into a flat multilingual schema."""

    service_id = record.get("id")
    if service_id is None:
        return None

    name = record.get("name") if isinstance(record.get("name"), dict) else {}
    auth = record.get("auth") if isinstance(record.get("auth"), dict) else {}
    authority = record.get("authority") if isinstance(record.get("authority"), dict) else {}
    description = record.get("description") if isinstance(record.get("description"), dict) else {}
    documents = record.get("documents") if isinstance(record.get("documents"), dict) else {}

    def _lang_field(base: str, fallback: dict) -> dict:
        return {
            "uz": record.get(f"{base}_uz") or fallback.get("uz", ""),
            "ru": record.get(f"{base}_ru") or fallback.get("ru", ""),
            "en": record.get(f"{base}_en") or fallback.get("en", ""),
            "kk": record.get(f"{base}_kk") or fallback.get("kk", ""),
        }

    names = _lang_field("name", name)
    descriptions = _lang_field("description", description)
    auths = _lang_field("auth", auth)
    authorities = _lang_field("authority", authority)

    docs: dict[str, list[str]] = {
        "uz": record.get("documents_uz") or documents.get("uz", []) or [],
        "ru": record.get("documents_ru") or documents.get("ru", []) or [],
        "en": record.get("documents_en") or documents.get("en", []) or [],
        "kk": record.get("documents_kk") or documents.get("kk", []) or [],
    }

    normalized = {
        "id": service_id,
        "category": record.get("category") or record.get("cat", ""),
        "name_uz": names["uz"],
        "name_ru": names["ru"],
        "name_en": names["en"],
        "name_kk": names["kk"],
        "description_uz": descriptions["uz"],
        "description_ru": descriptions["ru"],
        "description_en": descriptions["en"],
        "description_kk": descriptions["kk"],
        "authority_uz": authorities["uz"],
        "authority_ru": authorities["ru"],
        "authority_en": authorities["en"],
        "authority_kk": authorities["kk"],
        "auth_uz": auths["uz"],
        "auth_ru": auths["ru"],
        "auth_en": auths["en"],
        "auth_kk": auths["kk"],
        "documents_uz": docs["uz"],
        "documents_ru": docs["ru"],
        "documents_en": docs["en"],
        "documents_kk": docs["kk"],
        "similar_service_ids": record.get("similar_service_ids") or record.get("similar_ids") or [],
        "keywords": record.get("keywords") or [],
        "tags": record.get("tags") or [],
    }
    return normalized


def _parse_js_export(path: Path) -> list[dict]:
    """Parse a JS export const assignment into a list of records."""

    content = path.read_text(encoding="utf-8")
    match = re.search(r"export\s+const\s+\w+\s*=\s*(\[.*?\]|\{.*?\})\s*;", content, re.S)
    if not match:
        return []
    payload = json.loads(match.group(1))

    if isinstance(payload, list):
        return [item for item in payload if isinstance(item, dict)]
    if isinstance(payload, dict):
        if isinstance(payload.get("services"), list):
            return [item for item in payload["services"] if isinstance(item, dict)]
        if isinstance(payload.get("canonical_services"), list):
            return [item for item in payload["canonical_services"] if isinstance(item, dict)]
        records = []
        for value in payload.values():
            if isinstance(value, list):
                records.extend([item for item in value if isinstance(item, dict)])
        return records
    return []


def load_all_services() -> list[dict]:
    """Load and merge all service records from JSON or JS sources."""

    services: list[dict] = []
    base_dir = Path(__file__).resolve().parent
    catalog_path = base_dir / "data" / "services_catalog.json"

    if catalog_path.exists():
        payload = _read_json(catalog_path)
        for record in payload.get("canonical_services", []):
            normalized = _normalize_service_record(record)
            if normalized:
                services.append(normalized)

    if not services:
        repo_root = base_dir.parent
        data_dir = repo_root / "data"
        if data_dir.exists():
            for path in sorted(data_dir.glob("*.js")):
                for record in _parse_js_export(path):
                    normalized = _normalize_service_record(record)
                    if normalized:
                        services.append(normalized)

    deduped: dict[int, dict] = {}
    for service in services:
        service_id = service.get("id")
        if service_id is not None and service_id not in deduped:
            deduped[int(service_id)] = service

    return list(deduped.values())


def _iter_values(values: Iterable[Any]) -> Iterable[str]:
    """Yield normalized string values from mixed iterables."""

    for value in values:
        if value is None:
            continue
        if isinstance(value, (list, tuple, set)):
            for item in _iter_values(value):
                yield item
            continue
        text = str(value).strip()
        if text:
            yield text


def _concept_terms_for_service(text: str) -> list[str]:
    """Return concept terms to append for concepts matched in the service text."""

    normalized = text.lower()
    extra_terms: list[str] = []

    for concept_key, payload in CONCEPT_LEXICON.items():
        matched = False
        for field in ("terms", "phrases", "typo_variants"):
            for values in payload.get(field, {}).values():
                for value in values:
                    if value and value.lower() in normalized:
                        matched = True
                        break
                if matched:
                    break
            if matched:
                break

        if matched:
            extra_terms.append(concept_key)
            for field in ("terms", "phrases", "typo_variants"):
                for values in payload.get(field, {}).values():
                    extra_terms.extend(values)

    return extra_terms


def service_to_embed_text(svc: dict) -> str:
    """Convert a service record to a single embedding string."""

    fields = [
        svc.get("name_uz"),
        svc.get("name_ru"),
        svc.get("name_en"),
        svc.get("name_kk"),
        svc.get("description_uz"),
        svc.get("description_ru"),
        svc.get("description_en"),
        svc.get("description_kk"),
        svc.get("category"),
        svc.get("authority_uz") or svc.get("auth_uz"),
        svc.get("authority_ru") or svc.get("auth_ru"),
        svc.get("authority_en") or svc.get("auth_en"),
    ]

    docs = []
    for lang in ("uz", "ru", "en", "kk"):
        docs.extend(_iter_values(svc.get(f"documents_{lang}") or []))

    if isinstance(svc.get("documents"), dict):
        for value in svc["documents"].values():
            docs.extend(_iter_values(value))

    values = list(_iter_values(fields))
    values.extend(docs)
    values.extend(_iter_values(svc.get("keywords") or []))
    values.extend(_iter_values(svc.get("tags") or []))

    base_text = " ".join(values)
    values.extend(_iter_values(_concept_terms_for_service(base_text)))

    deduped: list[str] = []
    seen: set[str] = set()
    for item in values:
        if item not in seen:
            deduped.append(item)
            seen.add(item)

    joined = " | ".join(deduped)
    return joined[:800]


def _post_json(url: str, payload: dict, timeout: int = 30) -> dict:
    """POST JSON payload to Ollama and return parsed response."""

    data = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return json.loads(response.read().decode("utf-8"))


def _stream_chat(url: str, payload: dict) -> Iterable[dict]:
    """Yield streamed chat responses from Ollama."""

    data = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(request, timeout=60) as response:
        for raw_line in response:
            line = raw_line.decode("utf-8").strip()
            if not line:
                continue
            try:
                yield json.loads(line)
            except json.JSONDecodeError:
                continue


class EmbeddingIndex:
    """Persistent embedding index backed by Ollama embeddings."""

    INDEX_PATH = Path("backend/ollama_index/embeddings.npz")

    def __init__(self) -> None:
        self.vectors: np.ndarray | None = None
        self.services: list[dict] | None = None

    def build(self, services: list[dict], limit: int | None = None, progress_every: int = 50) -> None:
        """Build and save embeddings for a list of services."""

        total = len(services)
        if limit is not None:
            total = min(total, max(int(limit), 0))
            services = services[:total]

        vectors: list[list[float]] = []
        service_ids: list[int] = []
        service_texts: list[str] = []
        services_json: list[str] = []

        start = time.time()
        for idx, service in enumerate(services, start=1):
            text = service_to_embed_text(service)
            if not text:
                text = str(service.get("id", ""))
            response = _post_json(
                f"{OLLAMA_BASE_URL}/api/embeddings",
                {"model": "nomic-embed-text", "prompt": text},
            )
            embedding = response.get("embedding")
            if not embedding:
                continue
            vectors.append(embedding)
            service_ids.append(service.get("id"))
            service_texts.append(text)
            services_json.append(json.dumps(service, ensure_ascii=False))

            if progress_every and (idx % progress_every == 0 or idx == total):
                elapsed = time.time() - start
                rate = idx / elapsed if elapsed > 0 else 0.0
                eta = (total - idx) / rate if rate > 0 else 0.0
                print(
                    f"Embedded {idx}/{total} services "
                    f"({rate:.2f} svc/s, ETA {eta/60:.1f} min)"
                )

        matrix = np.array(vectors, dtype=np.float32)
        norms = np.linalg.norm(matrix, axis=1, keepdims=True)
        norms[norms == 0.0] = 1.0
        matrix = matrix / norms

        self.INDEX_PATH.parent.mkdir(parents=True, exist_ok=True)
        np.savez(
            self.INDEX_PATH,
            vectors=matrix,
            service_ids=np.array(service_ids, dtype=object),
            service_texts=np.array(service_texts, dtype=object),
            services_json=np.array(services_json, dtype=object),
        )

        self.vectors = matrix
        self.services = [json.loads(item) for item in services_json]

    def load(self) -> None:
        """Load embeddings from disk."""

        data = np.load(self.INDEX_PATH, allow_pickle=True)
        self.vectors = data["vectors"].astype(np.float32)
        services_json = data["services_json"].tolist()
        self.services = [json.loads(item) for item in services_json]

    def needs_rebuild(self, services: list[dict]) -> bool:
        """Return True when the index should be rebuilt."""

        if not self.INDEX_PATH.exists():
            return True
        if self.services is None or self.vectors is None:
            self.load()
        return self.services is None or len(services) != len(self.services)

    def search(self, query: str, top_k: int = 6) -> list[dict]:
        """Search the embedding index for relevant services."""

        if self.vectors is None or self.services is None:
            self.load()

        response = _post_json(
            f"{OLLAMA_BASE_URL}/api/embeddings",
            {"model": "nomic-embed-text", "prompt": query},
        )
        embedding = response.get("embedding")
        if not embedding:
            return []

        query_vec = np.array(embedding, dtype=np.float32)
        norm = np.linalg.norm(query_vec)
        if norm == 0.0:
            return []
        query_vec = query_vec / norm

        scores = self.vectors @ query_vec
        ranked = np.argsort(scores)[::-1][:top_k]

        results: list[dict] = []
        for idx in ranked:
            score = float(scores[int(idx)])
            if score < 0.15:
                continue
            service = dict(self.services[int(idx)])
            service["_score"] = score
            results.append(service)
        return results


def _pick_localized(service: dict, field: str, lang: str) -> str:
    """Pick a localized field with fallbacks."""

    return (
        service.get(f"{field}_{lang}")
        or service.get(f"{field}_en")
        or service.get(field)
        or ""
    )


def _pick_documents(service: dict, lang: str) -> list[str]:
    """Pick localized documents list with fallbacks."""

    value = service.get(f"documents_{lang}")
    if isinstance(value, list) and value:
        return value
    value = service.get("documents_en") or service.get("documents_uz") or []
    if isinstance(value, list):
        return value
    if isinstance(service.get("documents"), dict):
        fallback = service["documents"].get(lang) or service["documents"].get("en") or []
        return fallback if isinstance(fallback, list) else []
    return []


def build_context(results: list[dict], lang: str) -> str:
    """Build an LLM-ready context block from retrieved services."""

    lines: list[str] = ["Relevant services:"]
    confusion_lines: list[str] = []

    for idx, service in enumerate(results, start=1):
        name = _pick_localized(service, "name", lang)
        authority = (
            _pick_localized(service, "authority", lang)
            or _pick_localized(service, "auth", lang)
        )
        category = service.get("category", "")
        documents = _pick_documents(service, lang)[:5]
        doc_text = "; ".join(documents)

        lines.append(f"{idx}. {name}")
        lines.append(f"Authority: {authority}")
        lines.append(f"Category: {category}")
        if doc_text:
            lines.append(f"Required documents: {doc_text}")
        lines.append("")

        similar = service.get("similar_service_ids") or []
        if similar:
            confusion_lines.append(f"- Service {service.get('id')}: similar services {', '.join(map(str, similar))}")

    if confusion_lines:
        lines.append("CONFUSION WARNING:")
        lines.extend(confusion_lines)

    context = "\n".join(lines).strip()
    return context[:3500]


def rag_query(
    user_input: str,
    index: EmbeddingIndex,
    history: list[dict],
    lang: str | None = None,
    stream: bool = True,
) -> str:
    """Run a RAG query against Ollama and return the response text."""

    detected_lang = lang or detect_language(user_input)
    results = index.search(user_input, top_k=6)
    context = build_context(results, detected_lang)

    manager = ModelManager()
    model = manager.best_chat_model() or "qwen2.5:3b"

    messages: list[dict] = [{"role": "system", "content": GOV_SYSTEM_PROMPT + "\n\n" + context}]
    for item in history:
        role = item.get("role")
        content = item.get("content")
        if role in {"user", "assistant", "system"} and content:
            messages.append({"role": role, "content": content})
    messages.append({"role": "user", "content": user_input})

    payload = {"model": model, "messages": messages, "stream": True}
    answer_parts: list[str] = []

    for chunk in _stream_chat(f"{OLLAMA_BASE_URL}/api/chat", payload):
        message = chunk.get("message", {})
        token = message.get("content", "")
        if token:
            answer_parts.append(token)
            if stream:
                print(token, end="", flush=True)
        if chunk.get("done"):
            break

    if stream:
        print()

    answer = "".join(answer_parts).strip()
    history.append({"role": "user", "content": user_input})
    history.append({"role": "assistant", "content": answer})
    return answer


def _prepare_index(
    index: EmbeddingIndex,
    force_rebuild: bool = False,
    limit: int | None = None,
) -> EmbeddingIndex:
    """Load or rebuild the embedding index."""

    services = load_all_services()
    if force_rebuild or index.needs_rebuild(services):
        index.build(services, limit=limit)
    return index


def _setup_flow(force_rebuild: bool = False, limit: int | None = None) -> None:
    """Run the setup flow to create models and build embeddings."""

    manager = ModelManager()
    status = check_ollama()
    if not status.get("running"):
        print("Ollama is not running. Start Ollama and retry.")
        return

    manager.ensure_model("nomic-embed-text")
    manager.ensure_model("qwen2.5:3b")
    created = manager.create_govbot("qwen2.5:3b")

    services = load_all_services()
    index = EmbeddingIndex()
    if force_rebuild or index.needs_rebuild(services):
        index.build(services, limit=limit)

    print("Setup summary:")
    print(f"- Ollama running: {status.get('running')}")
    print(f"- Available models: {len(status.get('models', []))}")
    print(f"- govbot created: {created}")
    print(f"- Services indexed: {len(services) if limit is None else min(len(services), limit)}")
    print(f"- Index path: {index.INDEX_PATH}")


def _run_single_query(query: str) -> None:
    """Run a single RAG query and exit."""

    index = _prepare_index(EmbeddingIndex())
    history: list[dict] = []
    rag_query(query, index, history, stream=True)


def _interactive_chat() -> None:
    """Start an interactive RAG chat loop."""

    index = _prepare_index(EmbeddingIndex())
    history: list[dict] = []

    print("Gov RAG chat ready. Use /reset to clear history or /quit to exit.")
    while True:
        user_input = input(">>> ").strip()
        if not user_input:
            continue
        if user_input.lower() in {"/quit", "/exit", "quit", "exit"}:
            break
        if user_input.lower() == "/reset":
            history.clear()
            print("History cleared.")
            continue
        rag_query(user_input, index, history, stream=True)


def main() -> None:
    """CLI entry point for managing Ollama RAG utilities."""

    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    parser = argparse.ArgumentParser(description="Ollama manager for my.gov.uz backend")
    parser.add_argument("--setup", action="store_true", help="Create govbot model and build index")
    parser.add_argument("--reindex", action="store_true", help="Force rebuild of embedding index")
    parser.add_argument("--query", type=str, help="Run a single query and exit")
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Limit number of services to embed (useful for partial indexing).",
    )
    args = parser.parse_args()

    if args.setup:
        _setup_flow(force_rebuild=args.reindex, limit=args.limit)
        return
    if args.query:
        _run_single_query(args.query)
        return
    if args.reindex:
        _prepare_index(EmbeddingIndex(), force_rebuild=True, limit=args.limit)
        print("Index rebuilt.")
        return

    _interactive_chat()


if __name__ == "__main__":
    main()
