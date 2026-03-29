# -*- coding: utf-8 -*-
"""Lightweight HTTP API for the standalone Python NLP pipeline."""

from __future__ import annotations

import json
import os
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from pipeline import process_query, train_and_save


HOST = "127.0.0.1"
PORT = 8000
ALLOWED_ORIGINS = {"http://127.0.0.1:5173", "http://localhost:5173"}
GROQ_MODEL = os.environ.get("GROQ_MODEL", "llama-3.1-8b-instant")
CHAT_TEMPERATURE = 0.2
CHAT_MAX_TOKENS = 256

from groq import Groq

groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))


def _get_localized(service: dict, field: str, lang: str, fallback: str = "en"):
    if field == "name":
        return service.get(f"name_{lang}") or service.get("name_uz") or service.get(f"name_{fallback}") or ""
    if field == "description":
        return service.get(f"description_{lang}") or service.get("description_uz") or service.get(f"description_{fallback}") or ""
    if field == "documents":
        return service.get(f"documents_{lang}") or service.get("documents_uz") or service.get(f"documents_{fallback}") or []
    if field == "auth":
        return service.get(f"auth_{lang}") or service.get("auth_uz") or service.get(f"auth_{fallback}") or ""
    return service.get(field, "")


def _format_service_for_frontend(hit: dict, lang: str) -> dict:
    service = hit.get("service_record", {})
    hybrid_score = float(hit.get("hybrid_score", hit.get("score", 0.0)))
    score = max(0.0, min(0.98, hybrid_score / 4.0 if hybrid_score else float(hit.get("score", 0.0))))
    match_percent = max(1, round(score * 100))

    return {
        "id": service.get("id", hit.get("id")),
        "name": _get_localized(service, "name", lang),
        "category": service.get("category", hit.get("category", "")),
        "org": _get_localized(service, "auth", lang),
        "description": _get_localized(service, "description", lang),
        "documents": _get_localized(service, "documents", lang),
        "score": match_percent,
        "matchPercent": match_percent,
        "hybridScore": round(hybrid_score, 4),
        "raw": service,
    }


def build_api_response(query: str, lang: str | None = None, top_k: int = 10) -> dict:
    """Build the frontend-facing API response payload."""

    result = process_query(query, lang=lang, top_k=top_k)
    target_lang = result["language"]
    formatted_results = [_format_service_for_frontend(hit, target_lang) for hit in result["retriever_hits"]]
    journey_steps = [_get_localized(service, "name", target_lang) for service in result["chain"]]

    return {
        "query": result["query"],
        "corrected_query": result["corrected_query"],
        "expanded_query": result["expanded_query"],
        "spell_corrections": result["spell_corrections"],
        "detected_concepts": result["detected_concepts"],
        "language": result["language"],
        "situation": result["situation"],
        "situation_label": result["situation_label"],
        "confidence": result["confidence"],
        "high_confidence": result["high_confidence"],
        "journey_steps": journey_steps,
        "results": formatted_results,
        "hybrid_scores": result["hybrid_scores"],
    }


def _chat_system_prompt(lang: str) -> str:
    prompts = {
        "uz": (
            "Siz O‘zbekiston Respublikasining my.gov.uz portali yordamchisiz. "
            "Faqat quyidagi xizmatlar va ularning tavsiflariga tayanib javob bering."
        ),
        "ru": (
            "Вы — помощник портала my.gov.uz Республики Узбекистан. "
            "Отвечайте, опираясь только на перечисленные ниже услуги."
        ),
        "en": (
            "You are an assistant for the my.gov.uz portal of the Republic of Uzbekistan. "
            "Answer only using the services provided below."
        ),
        "kk": (
            "Siz Ozbekiston Respublikasining my.gov.uz portali komekshisisiz. "
            "Tek tomende berilgen qyzmetterge suyene otip jawab beriniz."
        ),
    }
    return prompts.get(lang, prompts["en"])


def _build_chat_context(services: list[dict], lang: str) -> str:
    lines: list[str] = []
    for idx, hit in enumerate(services, start=1):
        service = hit.get("service_record", {})
        name = _get_localized(service, "name", lang)
        org = _get_localized(service, "auth", lang)
        description = _get_localized(service, "description", lang)
        documents = _get_localized(service, "documents", lang)
        doc_text = ""
        if documents:
            doc_text = "Documents: " + "; ".join([str(item) for item in documents])
        lines.append(
            "\n".join(
                [
                    f"{idx}. {name}",
                    f"Organization: {org}",
                    f"Description: {description}",
                    doc_text,
                ]
            ).strip()
        )
    return "\n\n".join(lines)


def _stream_chat_response(
    query: str,
    lang: str | None,
    top_k: int,
    history: list[dict],
    model: str | None,
    writer,
) -> dict:
    """Stream chat response as NDJSON chunks."""

    if not os.environ.get("GROQ_API_KEY"):
        writer.write(json.dumps({"error": "Groq is not available. Set GROQ_API_KEY.", "done": True}).encode("utf-8") + b"\n")
        writer.flush()
        return {"error": "Groq is not available. Set GROQ_API_KEY."}

    result = process_query(query, lang=lang, top_k=top_k)
    target_lang = result["language"]
    context = _build_chat_context(result["retriever_hits"], target_lang)
    system_prompt = _chat_system_prompt(target_lang)

    messages: list[dict] = [{"role": "system", "content": system_prompt}]
    for item in history[-6:]:
        role = item.get("role")
        content = item.get("content", "")
        if role in {"user", "assistant"} and content:
            messages.append({"role": role, "content": content})

    messages.append(
        {
            "role": "user",
            "content": (
                f"User query: {query}\n\n"
                f"Relevant services:\n{context}\n\n"
                "Provide a concise, helpful response grounded in the services."
            ),
        }
    )

    answer_parts: list[str] = []
    last_error = None
    try:
        stream = groq_client.chat.completions.create(
            model=model or GROQ_MODEL,
            messages=messages,
            stream=True,
            max_tokens=CHAT_MAX_TOKENS,
            temperature=CHAT_TEMPERATURE,
        )
        for chunk in stream:
            token = chunk.choices[0].delta.content or ""
            if token:
                answer_parts.append(token)
                writer.write(json.dumps({"token": token}).encode("utf-8") + b"\n")
                writer.flush()
        last_error = None
    except Exception as exc:
        last_error = exc

    answer = "".join(answer_parts).strip()
    payload = {
        "answer": answer,
        "language": target_lang,
        "services": [_format_service_for_frontend(hit, target_lang) for hit in result["retriever_hits"]],
        "detected_concepts": result["detected_concepts"],
        "corrected_query": result["corrected_query"],
        "expanded_query": result["expanded_query"],
        "error": str(last_error) if last_error else None,
        "done": True,
    }
    writer.write(json.dumps(payload, ensure_ascii=False).encode("utf-8") + b"\n")
    writer.flush()
    return payload


def build_chat_response(
    query: str,
    lang: str | None = None,
    top_k: int = 5,
    history: list[dict] | None = None,
    model: str | None = None,
) -> dict:
    if not os.environ.get("GROQ_API_KEY"):
        return {
            "error": "Groq is not available. Set GROQ_API_KEY.",
            "answer": "",
            "services": [],
        }

    result = process_query(query, lang=lang, top_k=top_k)
    target_lang = result["language"]
    context = _build_chat_context(result["retriever_hits"], target_lang)
    system_prompt = _chat_system_prompt(target_lang)

    messages: list[dict] = [{"role": "system", "content": system_prompt}]
    if history:
        for item in history[-6:]:
            role = item.get("role")
            content = item.get("content", "")
            if role in {"user", "assistant"} and content:
                messages.append({"role": role, "content": content})

    messages.append(
        {
            "role": "user",
            "content": (
                f"User query: {query}\n\n"
                f"Relevant services:\n{context}\n\n"
                "Provide a concise, helpful response grounded in the services."
            ),
        }
    )

    answer = ""
    last_error = None
    try:
        response = groq_client.chat.completions.create(
            model=model or GROQ_MODEL,
            messages=messages,
            max_tokens=CHAT_MAX_TOKENS,
            temperature=CHAT_TEMPERATURE,
        )
        answer = response.choices[0].message.content or ""
        last_error = None
    except Exception as exc:
        last_error = exc

    formatted_results = [_format_service_for_frontend(hit, target_lang) for hit in result["retriever_hits"]]
    return {
        "answer": answer,
        "language": target_lang,
        "services": formatted_results,
        "detected_concepts": result["detected_concepts"],
        "corrected_query": result["corrected_query"],
        "expanded_query": result["expanded_query"],
        "error": str(last_error) if last_error else None,
    }


class QueryHandler(BaseHTTPRequestHandler):
    """Serve JSON endpoints for the React frontend."""

    server_version = "GovNlpApi/1.0"

    def _origin(self) -> str:
        origin = self.headers.get("Origin", "")
        return origin if origin in ALLOWED_ORIGINS else "*"

    def _send_stream_headers(self) -> None:
        self.send_response(200)
        self.send_header("Content-Type", "application/x-ndjson; charset=utf-8")
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Access-Control-Allow-Origin", self._origin())
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def _send_json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", self._origin())
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", self._origin())
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self) -> None:
        if self.path == "/health":
            self._send_json(200, {"status": "ok"})
            return
        self._send_json(404, {"error": "Not found"})

    def do_POST(self) -> None:
        if self.path not in {"/query", "/chat"}:
            self._send_json(404, {"error": "Not found"})
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            raw_body = self.rfile.read(length) if length else b"{}"
            payload = json.loads(raw_body.decode("utf-8"))
            query = (payload.get("text") or "").strip()
            lang = payload.get("lang") or None
            top_k = int(payload.get("top_k") or 10)
            if not query:
                self._send_json(400, {"error": "Field 'text' is required."})
                return
            if self.path == "/chat":
                history = payload.get("history") or []
                model = payload.get("model") or None
                stream = bool(payload.get("stream"))
                if stream:
                    self._send_stream_headers()
                    _stream_chat_response(
                        query,
                        lang=lang,
                        top_k=min(top_k, 8),
                        history=history,
                        model=model,
                        writer=self.wfile,
                    )
                    return
                response = build_chat_response(query, lang=lang, top_k=min(top_k, 8), history=history, model=model)
                status = 200 if response.get("answer") else 503
                self._send_json(status, response)
            else:
                response = build_api_response(query, lang=lang, top_k=top_k)
                self._send_json(200, response)
        except Exception as exc:
            self._send_json(500, {"error": str(exc)})

    def log_message(self, fmt: str, *args) -> None:
        return


def main() -> None:
    """Start the local API server."""

    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    train_and_save()
    server = ThreadingHTTPServer((HOST, PORT), QueryHandler)
    print(f"Python NLP API listening on http://{HOST}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()






