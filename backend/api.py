# -*- coding: utf-8 -*-
"""Lightweight HTTP API for the standalone Python NLP pipeline."""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib import error as urllib_error
from urllib import request as urllib_request

from nlp_engine import normalize_text, tokenize
from pipeline import process_query, train_and_save


def _load_local_env() -> None:
    env_path = Path(__file__).with_name(".env")
    if not env_path.exists():
        return
    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


_load_local_env()


HOST = "127.0.0.1"
PORT = 8000
ALLOWED_ORIGINS = {"http://127.0.0.1:5173", "http://localhost:5173"}
GROQ_MODEL = os.environ.get("GROQ_MODEL", "llama-3.1-8b-instant")
XAI_MODEL = os.environ.get("XAI_MODEL", "grok-3-mini")
XAI_BASE_URL = os.environ.get("XAI_BASE_URL", "https://api.x.ai/v1")
CHAT_TEMPERATURE = 0.2
CHAT_MAX_TOKENS = 384

try:
    from groq import Groq
except ImportError:
    Groq = None

groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY")) if Groq and os.environ.get("GROQ_API_KEY") else None


def _chat_provider() -> str | None:
    explicit = (os.environ.get("CHAT_PROVIDER") or "").strip().lower()
    if explicit in {"xai", "grok"}:
        return "xai"
    if explicit == "groq":
        return "groq"
    if os.environ.get("XAI_API_KEY"):
        return "xai"
    if os.environ.get("GROQ_API_KEY"):
        return "groq"
    return None


def _provider_error_message() -> str:
    provider = _chat_provider()
    if provider == "xai":
        return "Grok is not available. Set XAI_API_KEY."
    if provider == "groq" and not os.environ.get("GROQ_API_KEY"):
        return "Groq is not available. Set GROQ_API_KEY."
    return "No chat provider is configured. Set XAI_API_KEY for Grok or GROQ_API_KEY for Groq."


def _xai_headers() -> dict[str, str]:
    return {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.environ.get('XAI_API_KEY', '')}",
    }


def _groq_headers() -> dict[str, str]:
    return {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.environ.get('GROQ_API_KEY', '')}",
    }


def _groq_request_payload(messages: list[dict], model: str | None, stream: bool) -> bytes:
    payload = {
        "model": model or GROQ_MODEL,
        "messages": messages,
        "stream": stream,
        "max_tokens": CHAT_MAX_TOKENS,
        "temperature": CHAT_TEMPERATURE,
    }
    return json.dumps(payload).encode("utf-8")


def _groq_chat(messages: list[dict], model: str | None) -> str:
    if groq_client is not None:
        response = groq_client.chat.completions.create(
            model=model or GROQ_MODEL,
            messages=messages,
            max_tokens=CHAT_MAX_TOKENS,
            temperature=CHAT_TEMPERATURE,
        )
        return response.choices[0].message.content or ""

    req = urllib_request.Request(
        "https://api.groq.com/openai/v1/chat/completions",
        data=_groq_request_payload(messages, model, stream=False),
        headers=_groq_headers(),
        method="POST",
    )
    with urllib_request.urlopen(req, timeout=90) as response:
        payload = json.loads(response.read().decode("utf-8"))
    return payload.get("choices", [{}])[0].get("message", {}).get("content", "") or ""


def _groq_chat_stream(messages: list[dict], model: str | None):
    if groq_client is not None:
        return groq_client.chat.completions.create(
            model=model or GROQ_MODEL,
            messages=messages,
            stream=True,
            max_tokens=CHAT_MAX_TOKENS,
            temperature=CHAT_TEMPERATURE,
        )

    req = urllib_request.Request(
        "https://api.groq.com/openai/v1/chat/completions",
        data=_groq_request_payload(messages, model, stream=True),
        headers=_groq_headers(),
        method="POST",
    )
    return urllib_request.urlopen(req, timeout=90)


def _extract_openai_stream_token(chunk: dict) -> str:
    choices = chunk.get("choices") or []
    if not choices:
        return ""
    delta = choices[0].get("delta") or {}
    content = delta.get("content") or ""
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        return "".join(
            item.get("text", "")
            for item in content
            if isinstance(item, dict) and item.get("type") == "text"
        )
    return ""


def _xai_request_payload(messages: list[dict], model: str | None, stream: bool) -> bytes:
    payload = {
        "model": model or XAI_MODEL,
        "messages": messages,
        "stream": stream,
        "max_tokens": CHAT_MAX_TOKENS,
        "temperature": CHAT_TEMPERATURE,
    }
    return json.dumps(payload).encode("utf-8")


def _xai_chat(messages: list[dict], model: str | None) -> str:
    req = urllib_request.Request(
        f"{XAI_BASE_URL}/chat/completions",
        data=_xai_request_payload(messages, model, stream=False),
        headers=_xai_headers(),
        method="POST",
    )
    with urllib_request.urlopen(req, timeout=90) as response:
        payload = json.loads(response.read().decode("utf-8"))
    return payload.get("choices", [{}])[0].get("message", {}).get("content", "") or ""


def _xai_chat_stream(messages: list[dict], model: str | None):
    req = urllib_request.Request(
        f"{XAI_BASE_URL}/chat/completions",
        data=_xai_request_payload(messages, model, stream=True),
        headers=_xai_headers(),
        method="POST",
    )
    return urllib_request.urlopen(req, timeout=90)


def _extract_xai_stream_token(chunk: dict) -> str:
    choices = chunk.get("choices") or []
    if not choices:
        return ""
    delta = choices[0].get("delta") or {}
    content = delta.get("content") or ""
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        return "".join(
            item.get("text", "")
            for item in content
            if isinstance(item, dict) and item.get("type") == "text"
        )
    return ""


def _format_provider_error(exc: Exception) -> str:
    provider = _chat_provider() or "provider"
    if isinstance(exc, urllib_error.HTTPError):
        if exc.code in {401, 403}:
            if provider == "xai":
                return "xAI rejected the API key or request. Check that XAI_API_KEY is valid and that your account has access to the selected model."
            if provider == "groq":
                return "Groq rejected the API key. Check that GROQ_API_KEY is valid and has chat access enabled."
            return "The AI provider rejected the API key or request."
        return f"Provider request failed with HTTP {exc.code}."
    if isinstance(exc, urllib_error.URLError):
        return f"Provider request failed: {exc.reason}"
    return str(exc)


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
            "Siz my.gov.uz portali yordamchisiz. "
            "Faqat berilgan xizmatlar kontekstiga tayangan holda javob bering. "
            "Malumot yetarli bolmasa, taxmin qilmang va qisqa aniqlashtiruvchi savol bering. "
            "Javobda eng mos xizmat nomini, kerakli hujjatlarni va keyingi qadamni korsating. Faqat ozbek tilida javob bering."
        ),
        "ru": (
            "Vy pomoshchnik portala my.gov.uz. "
            "Otvechayte tolko na osnove peredannogo konteksta uslug. "
            "Esli dannyh nedostatochno, ne pridumyvayte i zadayte korotkiy utochnyayushchiy vopros. "
            "Nazovite naibolee podhodyashchuyu uslugu, klyuchevye dokumenty i sleduyushchiy shag. Otvechayte tolko na russkom yazyke."
        ),
        "en": (
            "You are an assistant for the my.gov.uz portal of the Republic of Uzbekistan. "
            "Answer only from the provided service context. "
            "If the data is insufficient, do not guess and ask one short clarifying question. "
            "Name the best matching service, list key documents, and state the next practical step. Reply only in English."
        ),
        "kk": (
            "Siz my.gov.uz portali komekshisisiz. "
            "Tek berilgen qyzmet kontekstine tayanip jawab beriniz. "
            "Magliwmat jetispeyse, oylap tappang ham qysqa anyqlastiriw sawalin beriniz. "
            "En mas qyzmetti, tiykargy hujjetlerdi ham keyingi qademdi korsetiniz. Tek qaraqalpaq tilinde jawab beriniz."
        ),
    }
    return prompts.get(lang, prompts["en"])


def _select_chat_hits(result: dict, limit: int = 3) -> list[dict]:
    hits = list(result.get("retriever_hits", []))
    if not hits:
        return []

    query = result.get("corrected_query") or result.get("query") or ""
    query_tokens = set(tokenize(normalize_text(query), result.get("language") or "en"))
    filtered: list[dict] = []

    for idx, hit in enumerate(hits):
        service = hit.get("service_record", {})
        search_blob = " ".join([
            service.get(f"name_{result.get('language')}", ""),
            service.get("name_en", ""),
            service.get(f"auth_{result.get('language')}", ""),
            " ".join(service.get("aliases", [])),
            " ".join(service.get("keywords", [])),
        ])
        overlap = query_tokens & set(tokenize(search_blob, result.get("language") or "en"))
        if idx == 0 or overlap:
            filtered.append(hit)
        if len(filtered) >= limit:
            break

    if not filtered:
        filtered = hits[:limit]

    top_score = float(filtered[0].get("hybrid_score", filtered[0].get("score", 0.0)))
    if len(filtered) < limit and len(hits) > len(filtered) and top_score < 1.35:
        for hit in hits[len(filtered):]:
            if hit not in filtered:
                filtered.append(hit)
            if len(filtered) >= limit:
                break

    return filtered[:limit]


def _build_chat_context(services: list[dict], lang: str) -> str:
    lines: list[str] = []
    for idx, hit in enumerate(services, start=1):
        service = hit.get("service_record", {})
        name = _get_localized(service, "name", lang)
        org = _get_localized(service, "auth", lang)
        description = _get_localized(service, "description", lang)
        documents = _get_localized(service, "documents", lang)
        hybrid_score = round(float(hit.get("hybrid_score", hit.get("score", 0.0))), 3)
        doc_text = "; ".join(str(item) for item in documents[:5]) if documents else "Not specified"
        lines.append(
            "\n".join(
                [
                    f"Service {idx}: {name}",
                    f"Match score: {hybrid_score}",
                    f"Category: {service.get('category', '')}",
                    f"Organization: {org}",
                    f"Description: {description}",
                    f"Documents: {doc_text}",
                ]
            ).strip()
        )
    return "\n\n".join(lines)


def _build_chat_user_message(query: str, result: dict, selected_hits: list[dict], lang: str) -> str:
    journey_steps = [
        _get_localized(service, "name", lang)
        for service in result.get("chain", [])[:4]
        if _get_localized(service, "name", lang)
    ]
    confidence = float(result.get("confidence", 0.0))
    corrected_query = result.get("corrected_query") or query
    expanded_query = result.get("expanded_query") or corrected_query
    detected_concepts = ", ".join(result.get("detected_concepts", [])) or "none"
    journey_text = "; ".join(journey_steps) if journey_steps else "none"
    context = _build_chat_context(selected_hits, lang)

    return (
        f"User query: {query}\n"
        f"Corrected query: {corrected_query}\n"
        f"Expanded query: {expanded_query}\n"
        f"Detected concepts: {detected_concepts}\n"
        f"Detected situation: {result.get('situation_label', '')}\n"
        f"Situation confidence: {confidence:.2f}\n"
        f"Journey hints: {journey_text}\n"
        f"Required response language: {lang}\n\n"
        f"Relevant services:\n{context}\n\n"
        "Response rules:\n"
        "- Prefer the highest-match service unless another listed service is clearly a better fit.\n"
        "- If several services may apply, briefly compare them before recommending one.\n"
        "- If match confidence is low, say that briefly and ask one short clarifying question.\n"
        "- Keep the answer grounded in the listed services only.\n"
        "- Respond in the same language as the original user query.\n"
        "- Make the answer visually clean with a short intro, then bullet points for service, documents, and next step.\n"
        "- Use short paragraphs or concise bullets."
    )


def _stream_chat_response(
    query: str,
    lang: str | None,
    top_k: int,
    history: list[dict],
    model: str | None,
    writer,
) -> dict:
    """Stream chat response as NDJSON chunks."""

    provider = _chat_provider()
    if provider == "xai" and not os.environ.get("XAI_API_KEY"):
        error_message = _provider_error_message()
        writer.write(json.dumps({"error": error_message, "done": True}).encode("utf-8") + b"\n")
        writer.flush()
        return {"error": error_message}
    if provider == "groq" and not os.environ.get("GROQ_API_KEY"):
        error_message = _provider_error_message()
        writer.write(json.dumps({"error": error_message, "done": True}).encode("utf-8") + b"\n")
        writer.flush()
        return {"error": error_message}
    if provider is None:
        error_message = _provider_error_message()
        writer.write(json.dumps({"error": error_message, "done": True}).encode("utf-8") + b"\n")
        writer.flush()
        return {"error": error_message}

    result = process_query(query, lang=lang, top_k=top_k)
    target_lang = result["language"]
    selected_hits = _select_chat_hits(result)
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
            "content": _build_chat_user_message(query, result, selected_hits, target_lang),
        }
    )

    answer_parts: list[str] = []
    last_error = None
    try:
        if provider == "xai":
            with _xai_chat_stream(messages, model) as stream:
                for raw_line in stream:
                    line = raw_line.decode("utf-8", errors="ignore").strip()
                    if not line.startswith("data:"):
                        continue
                    data = line[5:].strip()
                    if not data or data == "[DONE]":
                        continue
                    chunk = json.loads(data)
                    token = _extract_xai_stream_token(chunk)
                    if token:
                        answer_parts.append(token)
                        writer.write(json.dumps({"token": token}, ensure_ascii=False).encode("utf-8") + b"\n")
                        writer.flush()
        else:
            stream = _groq_chat_stream(messages, model)
            if groq_client is not None:
                for chunk in stream:
                    token = chunk.choices[0].delta.content or ""
                    if token:
                        answer_parts.append(token)
                        writer.write(json.dumps({"token": token}, ensure_ascii=False).encode("utf-8") + b"\n")
                        writer.flush()
            else:
                with stream as response:
                    for raw_line in response:
                        line = raw_line.decode("utf-8", errors="ignore").strip()
                        if not line.startswith("data:"):
                            continue
                        data = line[5:].strip()
                        if not data or data == "[DONE]":
                            continue
                        chunk = json.loads(data)
                        token = _extract_openai_stream_token(chunk)
                        if token:
                            answer_parts.append(token)
                            writer.write(json.dumps({"token": token}, ensure_ascii=False).encode("utf-8") + b"\n")
                            writer.flush()
        last_error = None
    except (urllib_error.HTTPError, urllib_error.URLError) as exc:
        last_error = exc
    except Exception as exc:
        last_error = exc

    answer = "".join(answer_parts).strip()
    payload = {
        "answer": answer,
        "language": target_lang,
        "services": [_format_service_for_frontend(hit, target_lang) for hit in selected_hits],
        "detected_concepts": result["detected_concepts"],
        "corrected_query": result["corrected_query"],
        "expanded_query": result["expanded_query"],
        "error": _format_provider_error(last_error) if last_error else None,
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
    provider = _chat_provider()
    if provider == "xai" and not os.environ.get("XAI_API_KEY"):
        return {
            "error": _provider_error_message(),
            "answer": "",
            "services": [],
        }
    if provider == "groq" and not os.environ.get("GROQ_API_KEY"):
        return {
            "error": _provider_error_message(),
            "answer": "",
            "services": [],
        }
    if provider is None:
        return {
            "error": _provider_error_message(),
            "answer": "",
            "services": [],
        }

    result = process_query(query, lang=lang, top_k=top_k)
    target_lang = result["language"]
    selected_hits = _select_chat_hits(result)
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
            "content": _build_chat_user_message(query, result, selected_hits, target_lang),
        }
    )

    answer = ""
    last_error = None
    try:
        if provider == "xai":
            answer = _xai_chat(messages, model)
        else:
            answer = _groq_chat(messages, model)
        last_error = None
    except (urllib_error.HTTPError, urllib_error.URLError) as exc:
        last_error = exc
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
        "error": _format_provider_error(last_error) if last_error else None,
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






