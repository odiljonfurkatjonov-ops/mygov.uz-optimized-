"""Interactive CLI for the standalone Python NLP pipeline."""

import sys

from pipeline import format_response, process_query, train_and_save


def main() -> None:
    """Start a small terminal chat loop."""

    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    train_and_save()
    print("Multilingual gov services assistant. Type 'exit' to quit.")
    while True:
        query = input("> ").strip()
        if not query or query.lower() in {"exit", "quit"}:
            break
        print(format_response(process_query(query)))
        print()


if __name__ == "__main__":
    main()
