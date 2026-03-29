"""Verified multilingual concept lexicon for the Python NLP pipeline."""

CONCEPT_LEXICON = {
    "childbirth": {
        "weight": 2.0,
        "terms": {
            "uz": [
                "tug'ilish", "tug'ruq", "tug'ildi", "tug'di", "yangi tug'ilgan",
                "bola", "bolalar", "bolam", "bolang", "bolani", "bolaga",
                "farzand", "farzandim", "farzandlar",
                "chaqaloq", "chaqaloqlar", "chaqaloqni",
                "go'dak", "go'daklar", "godak", "godaklar",
                "ona", "ota", "onalik", "homilador", "homiladorlik",
            ],
            "ru": [
                "рождение", "родился", "родилась", "новорожденный", "новорождённый",
                "ребёнок", "ребенка", "ребёнка", "дети", "детей",
                "младенец", "малыш", "роды", "родить", "беременность",
            ],
            "en": [
                "birth", "born", "newborn", "newborns", "baby", "babies",
                "infant", "infants", "child", "children", "childbirth",
                "delivery", "maternity", "mother", "father",
            ],
            "kk": [
                "туўылыў", "туўылды", "туўылған", "жаңа туўылған",
                "бала", "балалар", "балам", "баланы",
                "нәресте", "нәрестелер", "сәби", "сәбилер", "перзент",
            ],
        },
        "phrases": {
            "uz": [
                "bolam tug'ildi", "farzandim bo'ldi", "chaqaloq tug'ildi",
                "yangi tug'ilgan bolani ro'yxatdan o'tkazish", "bola tug'ilgandan keyin",
                "tug'ilganlik guvohnomasi olish", "bola uchun hujjat", "go'dak uchun nafaqa",
            ],
            "ru": [
                "ребёнок родился", "у меня родился ребёнок", "свидетельство о рождении",
                "оформить новорождённого", "пособие на ребёнка", "что делать после рождения",
            ],
            "en": [
                "my baby was born", "just had a baby", "birth certificate for my child",
                "newborn registration", "child was born", "register my child", "what to do after baby born",
            ],
            "kk": [
                "балам туўылды", "жаңа туўылған баланы тіркеу", "туўылыў гүўалығы алыў",
                "бала ушын жәрдемақы", "нәресте тіркеу",
            ],
        },
        "typo_variants": {
            "uz": ["tugulish", "chaqolaq", "chaqoloq", "farzant", "bolar", "bebek", "bebegi"],
            "ru": ["радился", "новарожденный", "малышь", "ребёнк"],
            "en": ["bron", "newbron", "babie", "babby", "chiild", "chidren"],
            "kk": ["тувылды", "тыўылды", "нәристе", "балалар"],
        },
    },
    "child_services": {
        "weight": 1.5,
        "terms": {
            "uz": ["bola", "bolalar", "farzand", "farzandlar", "chaqaloq", "go'dak", "o'smir", "voyaga yetmagan", "bolalar uchun"],
            "ru": ["ребёнок", "дети", "детей", "несовершеннолетний", "детские", "для детей"],
            "en": ["child", "children", "kids", "minor", "underage", "for children", "child services"],
            "kk": ["бала", "балалар", "нәресте", "кәмелетке толмаған", "балалар ушын"],
        },
        "phrases": {
            "uz": ["bolalar uchun xizmatlar", "farzandlar uchun nafaqa", "voyaga yetmagan bola", "bola nafaqasi"],
            "ru": ["услуги для детей", "пособие на детей", "несовершеннолетний ребёнок"],
            "en": ["services for children", "child benefit", "minor children"],
            "kk": ["балалар ушын қызметлер", "балаға жәрдемақы"],
        },
        "typo_variants": {
            "uz": ["bolar", "bollar", "farzant", "chaqolaq"],
            "ru": ["дете", "детеи"],
            "en": ["childs", "childrens", "chidren", "kds"],
            "kk": ["балалар", "бала"],
        },
    },
    "allowance": {
        "weight": 1.0,
        "terms": {
            "uz": ["nafaqa", "yordam puli", "bir martalik yordam"],
            "ru": ["пособие", "выплата", "помощь"],
            "en": ["allowance", "benefit", "payment"],
            "kk": ["жәрдемақы", "төлем", "ярдем"],
        },
        "phrases": {
            "uz": ["tug'ruq nafaqasi", "bola puli"],
            "ru": ["пособие при рождении", "детское пособие"],
            "en": ["birth allowance", "child benefit"],
            "kk": ["туўылыў жәрдемақысы", "бала жәрдемақысы"],
        },
        "typo_variants": {
            "uz": ["nafaqqa", "nafaqa"],
            "ru": ["посбие"],
            "en": ["alowance", "benfit"],
            "kk": ["жәрдемакы"],
        },
    },
    "duplicate_document": {
        "weight": 0.9,
        "terms": {
            "uz": ["dublikat", "takroriy nusxa", "yo'qolgan"],
            "ru": ["дубликат", "повторное", "утеряно"],
            "en": ["duplicate", "replacement", "lost"],
            "kk": ["дубликат", "қайталама", "жоғалған"],
        },
        "phrases": {
            "uz": ["guvohnoma yo'qoldi", "takroriy olish"],
            "ru": ["свидетельство утеряно", "получить дубликат"],
            "en": ["lost certificate", "get replacement"],
            "kk": ["куәлік жоғалды", "қайталама алу"],
        },
        "typo_variants": {
            "uz": ["yokolgan", "dublikat"],
            "ru": ["дубликатт"],
            "en": ["replacment"],
            "kk": ["жогалған"],
        },
    },
    "pension": {
        "weight": 1.3,
        "terms": {
            "uz": ["pensiya", "nafaqaga chiqish", "qarilik nafaqasi"],
            "ru": ["пенсия", "выход на пенсию", "пенсионный"],
            "en": ["pension", "retirement", "retire"],
            "kk": ["пенсия", "пенсияға шығыў", "зейнет"],
        },
        "phrases": {
            "uz": ["nafaqaga chiqdim", "pensiya rasmiylashtirish"],
            "ru": ["вышел на пенсию", "оформить пенсию"],
            "en": ["retire pension application", "apply for pension"],
            "kk": ["пенсияға шықтым", "пенсия рәсмийлестириў"],
        },
        "typo_variants": {
            "uz": ["pensyia"],
            "ru": ["пенссия"],
            "en": ["pensoin", "retier"],
            "kk": ["пенсйя"],
        },
    },
    "property": {
        "weight": 1.1,
        "terms": {
            "uz": ["uy", "kvartira", "ko'chmas mulk", "xonadon"],
            "ru": ["квартира", "недвижимость", "жильё"],
            "en": ["apartment", "property", "real estate"],
            "kk": ["пәтер", "жылжымайтын мүлик", "үй"],
        },
        "phrases": {
            "uz": ["uy sotib oldim", "ko'chmas mulk"],
            "ru": ["купил квартиру", "недвижимость"],
            "en": ["bought an apartment", "real estate"],
            "kk": ["пәтер сатып алдым", "мүлик"],
        },
        "typo_variants": {
            "uz": ["kochmas", "kvatira"],
            "ru": ["квартираа"],
            "en": ["appartment", "proeprty"],
            "kk": ["пэтер"],
        },
    },
    "registration": {
        "weight": 0.9,
        "terms": {
            "uz": ["ro'yxatdan o'tkazish", "registratsiya", "rasmiylashtirish"],
            "ru": ["регистрация", "оформление"],
            "en": ["registration", "register"],
            "kk": ["тіркеў", "рәсмийлестириў"],
        },
        "phrases": {
            "uz": ["ro'yxatdan o'tkazish kerak", "rasmiylashtirish"],
            "ru": ["нужно зарегистрировать", "оформить"],
            "en": ["need to register", "register property"],
            "kk": ["тіркеў керек", "рәсмийлестириў керек"],
        },
        "typo_variants": {
            "uz": ["royhatdan", "rasmylashtirish"],
            "ru": ["регестрация"],
            "en": ["registartion"],
            "kk": ["тиркеу"],
        },
    },
    "technical_inventory": {
        "weight": 1.0,
        "terms": {
            "uz": ["texnik inventarizatsiya", "kadastr o'lchovi"],
            "ru": ["техническая инвентаризация", "обмер"],
            "en": ["technical inventory", "building survey"],
            "kk": ["техникалық инвентаризация", "өлшеў"],
        },
        "phrases": {
            "uz": ["ko'chmas mulk texnik inventarizatsiya"],
            "ru": ["техническая инвентаризация недвижимости"],
            "en": ["property technical inventory"],
            "kk": ["мүлик техникалық инвентаризация"],
        },
        "typo_variants": {
            "uz": ["inventarizaciya"],
            "ru": ["инвентаризацыя"],
            "en": ["inventroy"],
            "kk": ["инвентаризация"],
        },
    },
    "business": {
        "weight": 1.2,
        "terms": {
            "uz": ["biznes", "tadbirkorlik", "firma"],
            "ru": ["бизнес", "предпринимательство", "фирма"],
            "en": ["business", "entrepreneurship", "company"],
            "kk": ["бизнес", "кәсип", "компания"],
        },
        "phrases": {
            "uz": ["biznes ochmoqchiman", "firma ochish"],
            "ru": ["хочу открыть бизнес", "регистрация фирмы"],
            "en": ["start a business", "open a company"],
            "kk": ["бизнес ашқым келеді", "компания ашыў"],
        },
        "typo_variants": {
            "uz": ["biznez"],
            "ru": ["бизнесс"],
            "en": ["buisness"],
            "kk": ["бизнес"],
        },
    },
    "entrepreneur_registration": {
        "weight": 1.0,
        "terms": {
            "uz": ["yakka tartibdagi tadbirkor", "ro'yxatdan o'tkazish"],
            "ru": ["индивидуальный предприниматель", "регистрация ип"],
            "en": ["sole proprietor", "business registration"],
            "kk": ["жеке кәсіпкер", "тіркеў"],
        },
        "phrases": {
            "uz": ["tadbirkorni ro'yxatdan o'tkazish"],
            "ru": ["зарегистрировать ип"],
            "en": ["register sole proprietor"],
            "kk": ["жеке кәсіпкерди тіркеў"],
        },
        "typo_variants": {
            "uz": ["tadbirkorlikni"],
            "ru": ["предпрениматель"],
            "en": ["proprietorr"],
            "kk": ["кәсипкер"],
        },
    },
    "driver_license": {
        "weight": 1.3,
        "terms": {
            "uz": ["haydovchilik guvohnomasi", "prava", "avto guvohnoma"],
            "ru": ["водительское удостоверение", "права"],
            "en": ["driver license", "driving licence", "license"],
            "kk": ["жүргізуші куәлігі", "права"],
        },
        "phrases": {
            "uz": ["haydovchilik guvohnomasi olish"],
            "ru": ["получить водительское удостоверение"],
            "en": ["get driver license"],
            "kk": ["жүргізуші куәлігін алу"],
        },
        "typo_variants": {
            "uz": ["haydovchlik", "guvohnmasi"],
            "ru": ["удостоврение"],
            "en": ["lisence"],
            "kk": ["куәлигi"],
        },
    },
    "tractor_license": {
        "weight": 1.35,
        "terms": {
            "uz": ["traktor", "maxsus texnika", "mexanizator"],
            "ru": ["трактор", "самоходная техника"],
            "en": ["tractor", "special machinery"],
            "kk": ["трактор", "арнаулы техника"],
        },
        "phrases": {
            "uz": ["traktor uchun guvohnoma"],
            "ru": ["удостоверение на трактор"],
            "en": ["tractor license"],
            "kk": ["трактор куәлігі"],
        },
        "typo_variants": {
            "uz": ["traktr"],
            "ru": ["тракторр"],
            "en": ["tracter"],
            "kk": ["трактр"],
        },
    },
    "disability": {
        "weight": 1.25,
        "terms": {
            "uz": ["nogironlik", "nogironlik guruhi", "invalidlik"],
            "ru": ["инвалидность", "группа инвалидности"],
            "en": ["disability", "disability group"],
            "kk": ["мүгедеклик", "мүгедектік тобы"],
        },
        "phrases": {
            "uz": ["nogironlik guruhini rasmiylashtirish"],
            "ru": ["оформить группу инвалидности"],
            "en": ["apply for disability group"],
            "kk": ["мүгедектік тобын рәсмийлестириў"],
        },
        "typo_variants": {
            "uz": ["nogronlik"],
            "ru": ["инвалиндность"],
            "en": ["disabilty"],
            "kk": ["мугедеклик"],
        },
    },
    "medical_review": {
        "weight": 0.8,
        "terms": {
            "uz": ["tibbiy komissiya", "ekspertiza"],
            "ru": ["медицинская комиссия", "экспертиза"],
            "en": ["medical board", "medical review"],
            "kk": ["медицина комиссиясы", "сараптама"],
        },
        "phrases": {
            "uz": ["tibbiy ko'rik", "ekspertiza olish"],
            "ru": ["пройти медкомиссию"],
            "en": ["medical review process"],
            "kk": ["медициналық комиссиядан өтиў"],
        },
        "typo_variants": {
            "uz": ["meditsina"],
            "ru": ["коммиссия"],
            "en": ["medcial"],
            "kk": ["комиссия"],
        },
    },
    "documents": {
        "weight": 0.7,
        "terms": {
            "uz": ["hujjat", "ma'lumotnoma", "guvohnoma"],
            "ru": ["документ", "справка", "свидетельство"],
            "en": ["document", "certificate", "paperwork"],
            "kk": ["ҳужжат", "анықтама", "куәлік"],
        },
        "phrases": {
            "uz": ["qanday hujjatlar kerak"],
            "ru": ["какие документы нужны"],
            "en": ["what documents are needed"],
            "kk": ["қандай ҳужжат керек"],
        },
        "typo_variants": {
            "uz": ["xujjat"],
            "ru": ["документыы"],
            "en": ["documnts"],
            "kk": ["ҳужат"],
        },
    },
    "application": {
        "weight": 0.6,
        "terms": {
            "uz": ["ariza", "murojaat", "topshirish"],
            "ru": ["заявление", "обращение", "подать"],
            "en": ["application", "apply", "submit"],
            "kk": ["арыз", "өтініш", "тапсырыў"],
        },
        "phrases": {
            "uz": ["ariza topshirish", "qanday murojaat qilish"],
            "ru": ["подать заявление"],
            "en": ["submit application"],
            "kk": ["арыз тапсырыў"],
        },
        "typo_variants": {
            "uz": ["arza"],
            "ru": ["заявлене"],
            "en": ["aplication"],
            "kk": ["ариз"],
        },
    },
    "housing": {
        "weight": 0.9,
        "terms": {
            "uz": ["uy-joy", "uy", "turar joy"],
            "ru": ["жильё", "дом", "квартира"],
            "en": ["housing", "home", "residence"],
            "kk": ["тұрғын үй", "үй", "баспана"],
        },
        "phrases": {
            "uz": ["uy-joy masalasi"],
            "ru": ["жилищный вопрос"],
            "en": ["housing issue"],
            "kk": ["тұрғын үй мәселеси"],
        },
        "typo_variants": {
            "uz": ["uyjoy"],
            "ru": ["жилье"],
            "en": ["housingg"],
            "kk": ["баспанаа"],
        },
    },
    "license": {
        "weight": 0.8,
        "terms": {
            "uz": ["guvohnoma", "ruxsatnoma", "litsenziya"],
            "ru": ["удостоверение", "разрешение", "лицензия"],
            "en": ["license", "permit", "certificate"],
            "kk": ["куәлік", "рұқсат", "лицензия"],
        },
        "phrases": {
            "uz": ["guvohnoma olish"],
            "ru": ["получить удостоверение"],
            "en": ["obtain license"],
            "kk": ["куәлік алу"],
        },
        "typo_variants": {
            "uz": ["guvohnoma"],
            "ru": ["лицензияя"],
            "en": ["licencee"],
            "kk": ["куалик"],
        },
    },
    "transport": {
        "weight": 0.7,
        "terms": {
            "uz": ["transport", "avtomobil", "texnika"],
            "ru": ["транспорт", "автомобиль", "техника"],
            "en": ["transport", "vehicle", "machinery"],
            "kk": ["көлик", "автомобиль", "техника"],
        },
        "phrases": {
            "uz": ["transport hujjatlari"],
            "ru": ["документы на транспорт"],
            "en": ["transport documents"],
            "kk": ["көлик ҳужжатлары"],
        },
        "typo_variants": {
            "uz": ["transpart"],
            "ru": ["транпорт"],
            "en": ["vehcle"],
            "kk": ["колик"],
        },
    },
    "social_support": {
        "weight": 0.9,
        "terms": {
            "uz": ["ijtimoiy yordam", "nafaqa", "qo'llab-quvvatlash"],
            "ru": ["социальная помощь", "поддержка"],
            "en": ["social support", "assistance"],
            "kk": ["әлеўметлик жәрдем", "қоллаў"],
        },
        "phrases": {
            "uz": ["ijtimoiy yordam olish"],
            "ru": ["получить социальную помощь"],
            "en": ["get social support"],
            "kk": ["әлеўметлик жәрдем алыў"],
        },
        "typo_variants": {
            "uz": ["ijtimoy"],
            "ru": ["социяльная"],
            "en": ["assitance"],
            "kk": ["әлеуметлик"],
        },
    },
    "retirement_documents": {
        "weight": 0.85,
        "terms": {
            "uz": ["pensiya hujjatlari", "mehnat daftarchasi"],
            "ru": ["документы на пенсию", "трудовая книжка"],
            "en": ["pension documents", "employment record"],
            "kk": ["пенсия ҳужжатлары", "еңбек дәптери"],
        },
        "phrases": {
            "uz": ["pensiya uchun hujjatlar"],
            "ru": ["какие документы на пенсию"],
            "en": ["documents for pension"],
            "kk": ["пенсия ушын ҳужжатлар"],
        },
        "typo_variants": {
            "uz": ["xujjatlari"],
            "ru": ["докуметы"],
            "en": ["docments"],
            "kk": ["ҳужжатлары"],
        },
    },
    "civil_registry": {
        "weight": 0.8,
        "terms": {
            "uz": ["FHDYO", "fuqarolik holati", "dalolatnoma"],
            "ru": ["ЗАГС", "гражданское состояние"],
            "en": ["civil registry", "registry office"],
            "kk": ["АХАЖ", "азаматлық хал"],
        },
        "phrases": {
            "uz": ["FHDYO xizmati"],
            "ru": ["услуга загса"],
            "en": ["civil registry service"],
            "kk": ["АХАЖ хызмети"],
        },
        "typo_variants": {
            "uz": ["fxdyo"],
            "ru": ["загц"],
            "en": ["regsitry"],
            "kk": ["ахаж"],
        },
    },
    "benefit": {
        "weight": 0.8,
        "terms": {
            "uz": ["imtiyoz", "foyda", "naf"],
            "ru": ["льгота", "выгода"],
            "en": ["benefit", "privilege"],
            "kk": ["жеңиллик", "пайда"],
        },
        "phrases": {
            "uz": ["davlat imtiyozi"],
            "ru": ["государственная льгота"],
            "en": ["state benefit"],
            "kk": ["мәмлекетлик жеңиллик"],
        },
        "typo_variants": {
            "uz": ["imtiyoz"],
            "ru": ["льготаа"],
            "en": ["benfit"],
            "kk": ["жениллик"],
        },
    },
}
