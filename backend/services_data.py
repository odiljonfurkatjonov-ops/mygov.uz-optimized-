"""Shared service catalog loader and enrichment for the Python NLP pipeline."""

from __future__ import annotations

import json
from pathlib import Path
import re

from lexicon import CONCEPT_LEXICON


DATA_PATH = Path(__file__).with_name("data") / "services_catalog.json"
LANGS = ("uz", "ru", "en", "kk")
TOKEN_RE = re.compile(r"[0-9A-Za-zА-Яа-яЁёʻ'’`ҒғҚқҲҳЎўҮүӘәІі]+", re.UNICODE)


CURATED_EXTRA_SERVICES = [
    {
        "id": 7001,
        "category": "Social Protection",
        "name_uz": "Nogironlik guruhini belgilash va rasmiylashtirish",
        "name_ru": "Установление и оформление группы инвалидности",
        "name_en": "Disability group assessment and registration",
        "name_kk": "Мүгедектік тобын белгилеў ҳәм рәсмийлестириў",
        "auth_uz": "Ijtimoiy himoya milliy agentligi",
        "auth_ru": "Национальное агентство социальной защиты",
        "auth_en": "National Agency for Social Protection",
        "auth_kk": "Әлеўметлик қорғаў миллий агентлиги",
        "documents_uz": ["pasport", "tibbiy xulosalar", "yo'llanma"],
        "documents_ru": ["паспорт", "медицинские заключения", "направление"],
        "documents_en": ["passport", "medical conclusions", "referral"],
        "documents_kk": ["паспорт", "медицина қорытындылары", "жоллама"],
        "description_uz": "Tibbiy-ijtimoiy ekspertiza orqali nogironlik guruhini belgilash va tegishli hujjatlarni rasmiylashtirish xizmati.",
        "description_ru": "Услуга прохождения медико-социальной экспертизы и оформления группы инвалидности.",
        "description_en": "Service for medical-social evaluation and registration of a disability group.",
        "description_kk": "Медицина-әлеўметлик сараптама арқалы мүгедектік тобын белгилеў ҳәм ҳужжатларын рәсмийлестириў хызмети.",
        "similar_ids": [],
        "keywords": ["nogironlik", "invalidlik", "disability group", "группа инвалидности", "мүгедектік"],
        "source": "curated_overlay",
    }
]

MANUAL_OVERRIDES = {
    1001: {
        "tags": ["childbirth", "civil_registry", "documents"],
        "intent_phrases": {
            "uz": ["bolam tug'ildi", "chaqaloqni ro'yxatdan o'tkazish", "tug'ilganlik guvohnomasi olish", "yangi tug'ilgan hujjat", "bola tug'ilishini qayd etish"],
            "ru": ["ребёнок родился", "оформить новорождённого", "свидетельство о рождении", "документы на ребёнка", "зарегистрировать рождение"],
            "en": ["my baby was born", "register newborn", "birth certificate", "child registration", "register a birth"],
            "kk": ["балам туўылды", "жаңа туўылған тіркеу", "туўылыў гүўалығы", "бала ҳужжаты", "туўылыўды тіркеў"],
        },
        "exclusion_phrases": {
            "uz": ["yo'qolgan guvohnoma", "takroriy nusxa", "dublikat", "nafaqa", "yordam puli"],
            "ru": ["дубликат", "повторное свидетельство", "утеряно", "пособие"],
            "en": ["duplicate", "replacement", "lost certificate", "allowance"],
            "kk": ["жоғалған куәлік", "қайталама нұсқа", "жәрдемақы"],
        },
    },
    1002: {
        "tags": ["childbirth", "allowance", "social_support", "benefit"],
        "intent_phrases": {
            "uz": ["bola puli", "tug'ruq nafaqasi", "yangi tug'ilgan uchun nafaqa", "bir martalik yordam", "bola tug'ilganda yordam puli"],
            "ru": ["пособие при рождении ребёнка", "детское пособие", "единовременная выплата", "оформить пособие", "выплата при рождении"],
            "en": ["birth allowance", "child benefit", "newborn payment", "apply for childbirth allowance", "baby allowance"],
            "kk": ["туўылыў жәрдемақысы", "бала жәрдемақысы", "бир мәртелик төлем", "жәрдемақыны рәсмийлестириў", "балаға төлем"],
        },
    },
    1099: {
        "tags": ["duplicate_document", "childbirth", "civil_registry", "documents"],
        "intent_phrases": {
            "uz": ["tug'ilganlik guvohnomasi yo'qoldi", "dublikat olish", "takroriy nusxa", "guvohnomani qayta olish", "yo'qolgan tug'ilganlik hujjati"],
            "ru": ["утеряно свидетельство о рождении", "получить дубликат", "повторное свидетельство", "восстановить свидетельство", "замена свидетельства"],
            "en": ["lost birth certificate", "get duplicate certificate", "replacement birth certificate", "reissue certificate", "birth certificate duplicate"],
            "kk": ["туўылыў куәлиги жоғалды", "дубликат алыў", "қайталама нусқа", "куәликтi қайта алыў", "алмастырыў"],
        },
    },
    2001: {
        "tags": ["pension", "retirement_documents", "application", "documents"],
        "intent_phrases": {
            "uz": ["nafaqaga chiqdim", "pensiya rasmiylashtirish", "pensiya olish", "qarilik nafaqasi", "pensiya hujjatlari"],
            "ru": ["вышел на пенсию", "оформить пенсию", "пенсия по возрасту", "документы на пенсию", "назначение пенсии"],
            "en": ["retire pension application", "apply for pension", "pension documents", "retirement paperwork", "age pension"],
            "kk": ["пенсияға шықтым", "пенсия рәсмийлестириў", "пенсия ҳужжатлары", "жас бойынша пенсия", "пенсия алыў"],
        },
    },
    3001: {
        "tags": ["property", "registration", "housing", "documents"],
        "intent_phrases": {
            "uz": ["uy sotib oldim", "kvartirani ro'yxatdan o'tkazish", "mulkni rasmiylashtirish", "ko'chmas mulk registratsiyasi", "uyni nomimga o'tkazish"],
            "ru": ["купил квартиру", "зарегистрировать недвижимость", "оформить квартиру", "регистрация собственности", "оформить покупку жилья"],
            "en": ["I bought an apartment what next", "register property", "apartment registration", "transfer property title", "bought a house register it"],
            "kk": ["пәтер сатып алдым", "мүликтi тіркеў", "үйди рәсмийлестириў", "меншикти тіркеў", "үйді атымға өткізиў"],
        },
    },
    3099: {
        "tags": ["property", "technical_inventory", "documents"],
        "intent_phrases": {
            "uz": ["ko'chmas mulk texnik inventarizatsiya", "texnik o'lchov", "inventarizatsiya hujjati", "kadastr o'lchovi", "obyektni texnik tekshiruv"],
            "ru": ["техническая инвентаризация недвижимости", "обмер объекта", "инвентаризационные документы", "техническое обследование", "инвентаризация здания"],
            "en": ["technical inventory", "property survey", "building measurement", "real estate inventory", "technical inspection of property"],
            "kk": ["мүлик техникалық инвентаризация", "объект өлшеў", "инвентаризация ҳужжаты", "техникалық тексериў", "имарат өлшеў"],
        },
    },
    4001: {
        "tags": ["business", "entrepreneur_registration", "registration", "application"],
        "intent_phrases": {
            "uz": ["biznes ochmoqchiman", "firma ochish", "tadbirkorlikni boshlash", "korxona ro'yxatdan o'tkazish", "yakka tartibdagi tadbirkor"],
            "ru": ["хочу открыть бизнес", "зарегистрировать фирму", "открыть ип", "регистрация компании", "начать предпринимательство"],
            "en": ["start a business", "open a company", "register a business", "sole proprietor registration", "new company setup"],
            "kk": ["бизнес ашқым келеді", "компания ашыў", "кәсипти баслаў", "компанияны тіркеў", "жеке кәсіпкер"],
        },
    },
    6001: {
        "tags": ["driver_license", "license", "transport", "documents"],
        "intent_phrases": {
            "uz": ["haydovchilik guvohnomasi olish", "prava olish", "avto guvohnoma", "haydovchilik uchun hujjat", "mashina haydash guvohnomasi"],
            "ru": ["получить водительское удостоверение", "получить права", "оформить права", "документы на водительское", "права на машину"],
            "en": ["get driver license", "driving licence", "apply for driver license", "license for driving", "car driving license"],
            "kk": ["жүргізуші куәлігін алу", "права алу", "көлік жүргізу куәлігі", "жүргізуші ҳужжаты", "машина куәлігі"],
        },
    },
    6099: {
        "tags": ["tractor_license", "license", "transport", "documents"],
        "intent_phrases": {
            "uz": ["traktor uchun guvohnoma", "traktor prava", "maxsus texnika guvohnomasi", "mexanizator guvohnomasi", "traktor haydash hujjati"],
            "ru": ["удостоверение на трактор", "права на трактор", "самоходная техника", "документы на трактор", "тракторное удостоверение"],
            "en": ["tractor license", "license for tractor", "special machinery permit", "tractor driving certificate", "self propelled machinery license"],
            "kk": ["трактор куәлігі", "тракторға права", "арнаулы техника куәлиги", "механизатор куәлиги", "трактор ҳужжаты"],
        },
    },
    7001: {
        "tags": ["disability", "medical_review", "social_support", "documents"],
        "intent_phrases": {
            "uz": ["nogironlik guruhini rasmiylashtirish", "nogironlik belgilash", "invalidlik guruhi", "tibbiy-ijtimoiy ekspertiza", "nogironlik hujjatlari"],
            "ru": ["оформить группу инвалидности", "установить инвалидность", "медико-социальная экспертиза", "документы на инвалидность", "группа инвалидности"],
            "en": ["apply for disability group", "disability registration", "medical disability assessment", "disability documents", "set disability group"],
            "kk": ["мүгедектік тобын рәсмийлестириў", "мүгедектік белгилеў", "әлеўметлик сараптама", "мүгедектік ҳужжатлары", "мүгедектік тобы"],
        },
    },
}


def _normalize_text(text: str) -> str:
    return (text or "").lower().replace("’", "'").replace("`", "'").replace("ʻ", "'")


def _tokens(text: str) -> list[str]:
    return [_normalize_text(match.group(0)) for match in TOKEN_RE.finditer(text or "")]


def _load_payload() -> dict:
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"Shared catalog not found at {DATA_PATH}. Run `node scripts/export_catalog.mjs` first.")
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def _normalize_service(record: dict) -> dict:
    name = record.get("name", {})
    auth = record.get("auth", {})
    description = record.get("description", {})
    documents = record.get("documents", {})
    return {
        "id": record["id"],
        "category": record.get("cat", ""),
        "name_uz": name.get("uz", ""),
        "name_ru": name.get("ru", ""),
        "name_en": name.get("en", ""),
        "name_kk": name.get("kk", ""),
        "auth_uz": auth.get("uz", ""),
        "auth_ru": auth.get("ru", ""),
        "auth_en": auth.get("en", ""),
        "auth_kk": auth.get("kk", ""),
        "documents_uz": documents.get("uz", []),
        "documents_ru": documents.get("ru", []),
        "documents_en": documents.get("en", []),
        "documents_kk": documents.get("kk", []),
        "description_uz": description.get("uz", ""),
        "description_ru": description.get("ru", ""),
        "description_en": description.get("en", ""),
        "description_kk": description.get("kk", ""),
        "similar_ids": record.get("similar_service_ids", []),
        "keywords": record.get("keywords", []),
        "source": record.get("source", "canonical_catalog"),
    }


def _service_text(service: dict) -> str:
    parts = [service.get("category", "")]
    for lang in LANGS:
        parts.append(service.get(f"name_{lang}", ""))
        parts.append(service.get(f"description_{lang}", ""))
        parts.append(service.get(f"auth_{lang}", ""))
        parts.extend(service.get(f"documents_{lang}", []))
    parts.extend(service.get("keywords", []))
    parts.extend(service.get("aliases", []))
    return " ".join(part for part in parts if part)


def _build_aliases(service: dict) -> list[str]:
    aliases: list[str] = []
    for lang in LANGS:
        name = _normalize_text(service.get(f"name_{lang}", ""))
        if name:
            aliases.append(name)
        auth = _normalize_text(service.get(f"auth_{lang}", ""))
        if auth:
            aliases.append(auth)
    for keyword in service.get("keywords", []):
        normalized = _normalize_text(keyword)
        if normalized:
            aliases.append(normalized)
    deduped: list[str] = []
    seen = set()
    for item in aliases:
        if item and item not in seen:
            deduped.append(item)
            seen.add(item)
    return deduped[:20]


def _phrase_stem(service: dict, lang: str) -> str:
    name = service.get(f"name_{lang}", "") or service.get("name_en", "") or service.get("name_uz", "")
    tokens = [token for token in _tokens(name) if len(token) > 2][:4]
    if tokens:
        return " ".join(tokens)
    return _normalize_text(service.get("category", "service")) or "service"


def _localized_templates(stem: str, category: str, lang: str) -> list[str]:
    if lang == "uz":
        return [stem, f"{stem} hujjatlari", f"{stem} ariza", f"{category} xizmati", f"{stem} olish"]
    if lang == "ru":
        return [stem, f"документы {stem}", f"заявление {stem}", f"услуга {category}", f"оформить {stem}"]
    if lang == "en":
        return [stem, f"{stem} documents", f"{stem} application", f"{category} service", f"apply for {stem}"]
    return [stem, f"{stem} ҳужжатлары", f"{stem} арыз", f"{category} хызмети", f"{stem} алыў"]


def _build_intent_phrases(service: dict) -> dict:
    phrases = {}
    for lang in LANGS:
        stem = _phrase_stem(service, lang)
        category = _normalize_text(service.get("category", "service"))
        items = []
        name = service.get(f"name_{lang}", "")
        if name:
            items.append(_normalize_text(name))
        for keyword in service.get("keywords", [])[:3]:
            keyword_norm = _normalize_text(keyword)
            if keyword_norm:
                items.append(keyword_norm)
        items.extend(_localized_templates(stem, category, lang))
        deduped = []
        seen = set()
        for item in items:
            clean = item.strip()
            if clean and clean not in seen:
                deduped.append(clean)
                seen.add(clean)
        phrases[lang] = deduped[:6]
    return phrases


def _build_exclusion_phrases(service: dict, service_map: dict[int, dict]) -> dict:
    exclusions = {lang: [] for lang in LANGS}
    for similar_id in service.get("similar_ids", []):
        similar = service_map.get(similar_id)
        if not similar:
            continue
        for lang in LANGS:
            name = _normalize_text(similar.get(f"name_{lang}", ""))
            if name:
                exclusions[lang].append(name)
    for lang in LANGS:
        exclusions[lang] = exclusions[lang][:5]
    return exclusions


def _infer_tags(service: dict) -> list[str]:
    override = MANUAL_OVERRIDES.get(service["id"], {})
    if "tags" in override:
        return override["tags"]

    text = _normalize_text(_service_text(service))
    scores = []
    for concept_key, payload in CONCEPT_LEXICON.items():
        score = 0
        for field in ("terms", "phrases"):
            for values in payload.get(field, {}).values():
                for value in values:
                    normalized = _normalize_text(value)
                    if normalized and normalized in text:
                        score += 2 if field == "phrases" else 1
        if score:
            scores.append((concept_key, score))

    if not scores:
        fallback = []
        category = _normalize_text(service.get("category", ""))
        if "business" in category or "iqtisod" in category:
            fallback.append("business")
        if "transport" in category:
            fallback.extend(["transport", "license"])
        if "family" in category or "children" in category or "oila" in category:
            fallback.append("civil_registry")
        if "social" in category:
            fallback.append("social_support")
        return fallback[:4] or ["documents"]

    scores.sort(key=lambda item: (-item[1], item[0]))
    return [concept for concept, _score in scores[:5]]


def _detect_lang(text: str) -> str:
    sample = _normalize_text(text)
    if any(ch in sample for ch in "ҳқғўүәің"):
        return "kk"
    cyrillic = sum(1 for ch in sample if "а" <= ch <= "я" or ch == "ё")
    latin = sum(1 for ch in sample if "a" <= ch <= "z")
    if cyrillic > latin:
        return "ru"
    return "en" if any(token in {"the", "my", "what", "next", "how", "apply"} for token in _tokens(sample)) else "uz"


def _normalize_training_examples(raw_examples: list) -> list[dict]:
    normalized = []
    for item in raw_examples:
        if isinstance(item, dict):
            normalized.append(item)
        elif isinstance(item, list) and len(item) == 2:
            query, situation = item
            normalized.append({"query": query, "lang": _detect_lang(query), "situation": situation})
    return normalized


def _load_catalog() -> tuple[list[dict], dict, list[dict]]:
    payload = _load_payload()
    services = [_normalize_service(record) for record in payload.get("canonical_services", [])]
    existing_ids = {service["id"] for service in services}
    for extra in CURATED_EXTRA_SERVICES:
        if extra["id"] not in existing_ids:
            services.append(extra)

    service_map = {service["id"]: service for service in services}
    primary_ids = {chain.get("steps", [None])[0] for chain in payload.get("situation_chains", {}).values() if chain.get("steps")}

    enriched = []
    for service in services:
        override = MANUAL_OVERRIDES.get(service["id"], {})
        aliases = _build_aliases(service)
        intent_phrases = override.get("intent_phrases") or _build_intent_phrases(service)
        enriched.append({
            **service,
            "aliases": aliases,
            "tags": _infer_tags(service),
            "intent_phrases": intent_phrases,
            "exclusion_phrases": override.get("exclusion_phrases") or _build_exclusion_phrases(service, service_map),
            "search_text": _service_text({**service, "aliases": aliases, "intent_phrases": intent_phrases}),
            "primary": service["id"] in primary_ids,
        })

    return enriched, payload.get("situation_chains", {}), _normalize_training_examples(payload.get("training_examples", []))


SERVICES_DB, SITUATION_CHAINS, TRAINING_EXAMPLES = _load_catalog()
