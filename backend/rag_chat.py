"""Interactive CLI chatbot that uses the Groq-backed retrieval pipeline."""

from __future__ import annotations

import sys

from api import build_chat_response


def _coerce_lang(value: str | None) -> str | None:
    if not value or value.lower() in {"auto", "detect"}:
        return None
    return value.lower()


def chat_loop(lang: str | None = None, top_k: int = 3) -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    lang_label = lang or "auto"
    print(f"RAG Chatbot ready (provider: Groq, language: {lang_label}). Type 'exit' to quit.\n")

    history: list[dict[str, str]] = []
    while True:
        query = input(">>> ").strip()
        if not query or query.lower() in {"exit", "quit"}:
            break

        response = build_chat_response(query, lang=lang, top_k=top_k, history=history)
        error = response.get("error")
        answer = (response.get("answer") or "").strip()
        if error:
            print(f"Error: {error}\n")
            continue
        if not answer:
            print("Sorry, no answer was returned.\n")
            continue

        print(f"\n{answer}\n")
        history.append({"role": "user", "content": query})
        history.append({"role": "assistant", "content": answer})
        history = history[-6:]


if __name__ == "__main__":
    arg_lang = _coerce_lang(sys.argv[1]) if len(sys.argv) > 1 else None
    arg_top_k = int(sys.argv[2]) if len(sys.argv) > 2 else 3
    chat_loop(arg_lang, top_k=arg_top_k)
