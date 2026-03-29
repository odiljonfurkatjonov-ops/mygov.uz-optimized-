"""RAG-powered CLI chatbot that uses the local retrieval pipeline + Ollama."""

from __future__ import annotations

import sys
from typing import Any

try:
    from ollama_manager import rag_query, EmbeddingIndex
    OLLAMA_AVAILABLE = True
except ImportError:
    OLLAMA_AVAILABLE = False

import ollama

from pipeline import process_query, train_and_save


MODEL = "qwen2.5:3b"

LANG_INSTRUCTIONS = {
    "uz": (
        "Siz O‘zbekiston Respublikasining my.gov.uz portalining yordamchisisiz. "
        "Foydalanuvchiga quyida keltirilgan davlat xizmatlari asosida javob bering."
    ),
    "ru": (
        "Вы – помощник портала my.gov.uz Республики Узбекистан. "
        "Отвечайте пользователю на основе приведённых ниже государственных услуг."
    ),
    "en": (
        "You are an assistant for the my.gov.uz portal of the Republic of Uzbekistan. "
        "Answer the user based on the government services listed below."
    ),
    "kk": (
        "Сіз Өзбекстан Республикасының my.gov.uz порталының көмекшісіз. "
        "Пайдаланушыға төменде келтірілген мемлекеттік қызметтер негізінде жауап беріңіз."
    ),
}


def _localized(record: dict, field: str, lang: str) -> str:
    """Fetch a localized field with safe fallbacks."""

    return (
        record.get(f"{field}_{lang}")
        or record.get(f"{field}_en")
        or record.get(f"{field}_uz")
        or ""
    )


def _localized_list(record: dict, field: str, lang: str) -> list[str]:
    value = record.get(f"{field}_{lang}")
    if isinstance(value, list) and value:
        return value
    fallback = record.get(f"{field}_en") or record.get(f"{field}_uz") or []
    return fallback if isinstance(fallback, list) else []


def build_prompt(query: str, services: list[dict], lang: str = "en") -> str:
    """Create a prompt with system instructions and retrieved services."""

    system = LANG_INSTRUCTIONS.get(lang, LANG_INSTRUCTIONS["en"])

    blocks = []
    for service in services:
        name = _localized(service, "name", lang)
        description = _localized(service, "description", lang)
        org = _localized(service, "auth", lang)
        documents = _localized_list(service, "documents", lang)
        doc_text = ", ".join(documents) if documents else ""

        blocks.append(
            f"### {name}\n"
            f"**Kategoriya / Category:** {service.get('category', '')}\n"
            f"**Tashkilot / Organization:** {org}\n"
            f"**Tavsif / Description:** {description}\n"
            f"**Hujjatlar / Documents:** {doc_text}"
        )

    context = "\n\n".join(blocks)

    prompt = (
        f"{system}\n\n"
        f"Foydalanuvchining soʻrovi: {query}\n\n"
        "Quyida ushbu soʻrovga mos keladigan davlat xizmatlari keltirilgan:\n"
        f"{context}\n\n"
        "Iltimos, foydalanuvchiga ushbu xizmatlar asosida batafsil, tushunarli va foydali javob bering."
    )
    return prompt


def _coerce_lang(value: str | None) -> str | None:
    if not value or value.lower() in {"auto", "detect"}:
        return None
    return value.lower()


def chat_loop(lang: str | None = None, top_k: int = 3) -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    train_and_save()
    lang_label = lang or "auto"
    print(f"RAG Chatbot ready (model: {MODEL}, language: {lang_label}). Type 'exit' to quit.\n")

    while True:
        query = input(">>> ").strip()
        if not query or query.lower() in {"exit", "quit"}:
            break

        result = process_query(query, top_k=top_k, lang=lang)
        services = [
            item.get("service_record", {})
            for item in result.get("retriever_hits", [])
            if item.get("service_record")
        ]

        if not services:
            print("Kechirasiz, hech qanday xizmat topilmadi.\nSorry, no services found.\n")
            continue

        prompt = build_prompt(query, services, result.get("language") or (lang or "en"))

        try:
            response: dict[str, Any] = ollama.chat(
                model=MODEL,
                messages=[{"role": "user", "content": prompt}],
            )
            answer = response["message"]["content"]
            print(f"\n{answer}\n")
        except Exception as exc:
            print(f"Xatolik yuz berdi / Error: {exc}\n")


if __name__ == "__main__":
    arg_lang = _coerce_lang(sys.argv[1]) if len(sys.argv) > 1 else None
    arg_top_k = int(sys.argv[2]) if len(sys.argv) > 2 else 3
    chat_loop(arg_lang, top_k=arg_top_k)
