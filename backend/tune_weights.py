"""Grid search tuner for HybridReranker weights."""

from __future__ import annotations

import itertools
import json
import sys

from pipeline import MODEL_DIR, WEIGHTS_PATH, process_query, train_and_save


LABELED_TESTS = [
    ("Bolam tug'ildi nima qilishim kerak", "uz", 1001),
    ("Вышел на пенсию как оформить", "ru", 2001),
    ("I bought an apartment what next", "en", 3001),
    ("Haydovchilik guvohnomasi olish", "uz", 6001),
    ("Traktor uchun guvohnoma", "uz", 6099),
    ("Tug'ilganlik guvohnomasi yo'qoldi", "uz", 1099),
    ("Biznes ochmoqchiman", "uz", 4001),
    ("Бизнес ашқым келеді", "kk", 4001),
    ("Uy sotib oldim ro'yxatdan o'tkazish", "uz", 3001),
    ("Ko'chmas mulk texnik inventarizatsiya", "uz", 3099),
    ("Nafaqaga chiqdim pensiya hujjatlari", "uz", 2001),
    ("Пособие при рождении ребёнка", "ru", 1002),
    ("My baby was born", "en", 1001),
    ("Retire pension application documents", "en", 2001),
    ("Nogironlik guruhini rasmiylashtirish", "uz", 7001),
]


def evaluate(weights: dict) -> tuple[float, list[tuple[str, int, int | None]]]:
    """Return top-1 accuracy and failures for a weight combination."""

    failures = []
    correct = 0
    for query, lang, expected in LABELED_TESTS:
        result = process_query(query, lang=lang, reranker_weights=weights)
        top_id = result["retriever_hits"][0]["id"] if result["retriever_hits"] else None
        if top_id == expected:
            correct += 1
        else:
            failures.append((query, expected, top_id))
    return correct / len(LABELED_TESTS), failures


def main() -> None:
    """Run grid search, save the best weights, and print failures."""

    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    train_and_save()
    grid = {
        "alpha": [0.5, 1.0, 1.5],
        "beta": [0.5, 0.8, 1.2],
        "gamma": [0.3, 0.6, 1.0],
        "delta": [0.8, 1.2, 1.8],
        "epsilon": [0.5, 0.9, 1.5],
        "zeta": [0.3, 0.5, 0.8],
    }

    best_weights = None
    best_accuracy = -1.0
    best_failures = []

    for values in itertools.product(*(grid[key] for key in grid)):
        weights = dict(zip(grid.keys(), values))
        accuracy, failures = evaluate(weights)
        if accuracy > best_accuracy:
            best_accuracy = accuracy
            best_weights = weights
            best_failures = failures

    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    with WEIGHTS_PATH.open("w", encoding="utf-8") as handle:
        json.dump(best_weights, handle, ensure_ascii=False, indent=2)

    print(f"Best accuracy: {best_accuracy:.3f}")
    print(f"Best weights: {best_weights}")
    print("Confusion table:")
    if not best_failures:
        print("  All labeled tests passed.")
    else:
        for query, expected, predicted in best_failures:
            print(f"  query={query!r} expected={expected} predicted={predicted}")


if __name__ == "__main__":
    main()
