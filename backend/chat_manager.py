"""Compatibility helpers for Groq-backed RAG chat."""

from __future__ import annotations

import argparse
import sys
from typing import Any

from api import GROQ_MODEL, build_chat_response, _chat_provider


def check_provider() -> dict[str, Any]:
    provider = _chat_provider()
    return {
        "provider": provider,
        "configured": provider == "groq",
        "model": GROQ_MODEL,
    }


def list_available() -> list[str]:
    return [GROQ_MODEL]


def best_chat_model() -> str:
    return GROQ_MODEL


def rag_query(
    query: str,
    history: list[dict[str, str]] | None = None,
    lang: str | None = None,
    top_k: int = 5,
    model: str | None = None,
    stream: bool = False,
) -> dict[str, Any]:
    response = build_chat_response(query, lang=lang, top_k=top_k, history=history or [], model=model)
    if stream and response.get("answer"):
        print(response["answer"])
    return response


def chat_loop(lang: str | None = None, top_k: int = 5) -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    status = check_provider()
    print(f"Chat helper ready (provider: {status['provider'] or 'none'}, model: {status['model']}). Type 'exit' to quit.\n")

    history: list[dict[str, str]] = []
    while True:
        query = input(">>> ").strip()
        if not query or query.lower() in {"exit", "quit"}:
            break
        response = rag_query(query, history=history, lang=lang, top_k=top_k)
        error = response.get("error")
        answer = (response.get("answer") or "").strip()
        if error:
            print(f"Error: {error}\n")
            continue
        print(f"\n{answer}\n")
        history.append({"role": "user", "content": query})
        history.append({"role": "assistant", "content": answer})
        history = history[-6:]


def main() -> None:
    parser = argparse.ArgumentParser(description="Groq chat helper for my.gov.uz backend")
    parser.add_argument("lang", nargs="?", default=None, help="Language code or auto")
    parser.add_argument("top_k", nargs="?", type=int, default=5, help="Number of services to retrieve")
    args = parser.parse_args()
    lang = None if args.lang in {None, "auto", "detect"} else str(args.lang).lower()
    chat_loop(lang=lang, top_k=args.top_k)


if __name__ == "__main__":
    main()
