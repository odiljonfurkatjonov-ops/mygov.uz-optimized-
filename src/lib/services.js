export const MASTER_SERVICES = [
	// ── FAMILY & CIVIL REGISTRY ──────────────────────────────────────────────
	{
		id: 1,
		uz: { name: "Tug'ilganlik haqida guvohnoma olish", category: "Oila va bolalar", org: "FHDY" },
		ru: { name: "Получение свидетельства о рождении", category: "Семья и дети", org: "ЗАГС" },
		en: { name: "Birth Certificate Issuance", category: "Family and Children", org: "Civil Registry" },
		kk: { name: "Туу туралы куәлік алу", category: "Отбасы және балалар", org: "АХАЖ" },
		keywords: ["tug'ilgan", "guvohnoma", "bola", "chaqaloq", "son born", "daughter born", "o'g'il", "qiz", "рождение", "свидетельство", "новорождённый", "сын", "дочь", "birth", "certificate", "baby", "newborn", "infant", "child", "kid", "son", "daughter", "туу", "куәлік", "нәресте", "ул", "қыз", "yangi bola", "register baby"]
	},
	{
		id: 6,
		uz: { name: "Nikohni qayd etish", category: "Oila va bolalar", org: "FHDY" },
		ru: { name: "Регистрация брака", category: "Семья и дети", org: "ЗАГС" },
		en: { name: "Marriage Registration", category: "Family and Children", org: "Civil Registry" },
		kk: { name: "Некені тіркеу", category: "Отбасы және балалар", org: "АХАЖ" },
		keywords: ["nikoh", "turmush", "to'y", "uylanish", "uylangan", "брак", "свадьба", "бракосочетание", "marriage", "wedding", "wed", "marry", "неке", "get married", "uylanyapman"]
	},
	{
		id: 15,
		uz: { name: "Bolani ro'yxatdan o'tkazish (propiska)", category: "Oila va bolalar", org: "IIV Pasport xizmati" },
		ru: { name: "Регистрация ребёнка по месту жительства", category: "Семья и дети", org: "МВД" },
		en: { name: "Child Residential Registration", category: "Family and Children", org: "Ministry of Interior" },
		kk: { name: "Баланы тұрғылықты жері бойынша тіркеу", category: "Отбасы және балалар", org: "ІІМ" },
		keywords: ["propiska", "ro'yxatdan", "bola", "manzil", "прописка", "регистрация", "ребенок", "child registration", "residency", "register son", "register daughter", "o'g'il ro'yxat", "qiz ro'yxat"]
	},
	{
		id: 19,
		uz: { name: "O'lim guvohnomasi olish", category: "Oila va bolalar", org: "FHDY" },
		ru: { name: "Получение свидетельства о смерти", category: "Семья и дети", org: "ЗАГС" },
		en: { name: "Death Certificate Issuance", category: "Family and Children", org: "Civil Registry" },
		kk: { name: "Қайтыс болу туралы куәлік алу", category: "Отбасы және балалар", org: "АХАЖ" },
		keywords: ["o'lim", "vafot", "смерть", "умер", "death", "deceased", "certificate", "meros", "наследство", "inheritance", "ota vafot", "ona vafot", "parent death", "died", "passed away"]
	},
	{
		id: 26,
		uz: { name: "Ajralish (ajrim) ni qayd etish", category: "Oila va bolalar", org: "FHDY" },
		ru: { name: "Регистрация развода", category: "Семья и дети", org: "ЗАГС" },
		en: { name: "Divorce Registration", category: "Family and Children", org: "Civil Registry" },
		kk: { name: "Ажырасуды тіркеу", category: "Отбасы және балалар", org: "АХАЖ" },
		keywords: ["ajralish", "ajrim", "divorce", "развод", "nikoh buzish", "talaq", "separated", "разведён", "ажырасу", "rasmiylashtirishajrim"]
	},
	{
		id: 27,
		uz: { name: "Ism-familyani o'zgartirish", category: "Fuqarolik", org: "FHDY" },
		ru: { name: "Смена имени и фамилии", category: "Гражданство", org: "ЗАГС" },
		en: { name: "Name Change", category: "Citizenship", org: "Civil Registry" },
		kk: { name: "Аты-жөнін өзгерту", category: "Азаматтық", org: "АХАЖ" },
		keywords: ["ism", "familya", "o'zgartirish", "имя", "фамилия", "смена", "name change", "surname change", "новое имя", "аты", "жөні"]
	},
	{
		id: 28,
		uz: { name: "Vasiylik va homiylikni rasmiylashtirish", category: "Oila va bolalar", org: "Mahalla va oila vazirligi" },
		ru: { name: "Оформление опеки и попечительства", category: "Семья и дети", org: "Министерство семьи" },
		en: { name: "Guardianship and Trusteeship", category: "Family and Children", org: "Ministry of Family" },
		kk: { name: "Қорғаншылық және қамқорлықты ресімдеу", category: "Отбасы және балалар", org: "Отбасы министрлігі" },
		keywords: ["vasiylik", "homiylik", "opeka", "guardian", "trusteeship", "orphan", "yetim", "опека", "попечительство", "сирота", "усыновление", "adoption", "farzandlikka olish"]
	},

	// ── CITIZENSHIP & DOCUMENTS ──────────────────────────────────────────────
	{
		id: 11,
		uz: { name: "Passport olish yoki almashtirish", category: "Fuqarolik", org: "IIV" },
		ru: { name: "Получение или замена паспорта", category: "Гражданство", org: "МВД" },
		en: { name: "Passport Issuance or Replacement", category: "Citizenship", org: "Ministry of Interior" },
		kk: { name: "Паспорт алу немесе ауыстыру", category: "Азаматтық", org: "ІІМ" },
		keywords: ["pasport", "id", "id karta", "hujjat", "паспорт", "удостоверение", "замена", "passport", "identification", "ID card", "identity", "document", "жеке куәлік", "yangi pasport", "lost passport"]
	},
	{
		id: 29,
		uz: { name: "Xorijiy pasport olish (biometrik)", category: "Fuqarolik", org: "IIV" },
		ru: { name: "Получение загранпаспорта (биометрического)", category: "Гражданство", org: "МВД" },
		en: { name: "International Passport (Biometric)", category: "Citizenship", org: "Ministry of Interior" },
		kk: { name: "Шетелдік паспорт (биометриялық) алу", category: "Азаматтық", org: "ІІМ" },
		keywords: ["xorijiy pasport", "zagran", "international passport", "biometric", "загранпаспорт", "биометрический", "travel document", "chet elga", "xorijga", "abroad", "travel", "sayohat"]
	},
	{
		id: 30,
		uz: { name: "O'zbekiston fuqaroligini olish", category: "Fuqarolik", org: "IIV" },
		ru: { name: "Получение гражданства Узбекистана", category: "Гражданство", org: "МВД" },
		en: { name: "Uzbekistan Citizenship Application", category: "Citizenship", org: "Ministry of Interior" },
		kk: { name: "Өзбекстан азаматтығын алу", category: "Азаматтық", org: "ІІМ" },
		keywords: ["fuqarolik", "citizenship", "гражданство", "naturalization", "natiralizatsiya", "fuqaro", "citizen", "получить гражданство", "азаматтық"]
	},
	{
		id: 31,
		uz: { name: "Doimiy yashash joyi uchun ruxsatnoma (propiska)", category: "Fuqarolik", org: "IIV Pasport xizmati" },
		ru: { name: "Разрешение на постоянное проживание (прописка)", category: "Гражданство", org: "МВД" },
		en: { name: "Permanent Residency Registration", category: "Citizenship", org: "Ministry of Interior" },
		kk: { name: "Тұрақты тұруға рұқсат", category: "Азаматтық", org: "ІІМ" },
		keywords: ["propiska", "ro'yxatdan", "manzil", "yashash", "прописка", "регистрация", "residency", "permanent residence", "постоянное проживание", "тіркеу"]
	},
	{
		id: 32,
		uz: { name: "Viza olish (chet elliklar uchun)", category: "Fuqarolik", org: "Tashqi ishlar vazirligi" },
		ru: { name: "Получение визы для иностранцев", category: "Гражданство", org: "МИД" },
		en: { name: "Visa Application (for foreigners)", category: "Citizenship", org: "Ministry of Foreign Affairs" },
		kk: { name: "Виза алу (шетелдіктер үшін)", category: "Азаматтық", org: "СІМ" },
		keywords: ["viza", "visa", "foreigner", "иностранец", "шетелдік", "chet ellik", "permit", "рабочая виза", "work visa", "tourist visa", "turist viza"]
	},

	// ── TRANSPORT ──────────────────────────────────────────────────────────
	{
		id: 2,
		uz: { name: "Haydovchilik guvohnomasini rasmiylashtirish", category: "Transport", org: "IIV" },
		ru: { name: "Оформление водительского удостоверения", category: "Транспорт", org: "МВД" },
		en: { name: "Driver's License Processing", category: "Transport", org: "Ministry of Interior" },
		kk: { name: "Жүргізуші куәлігін ресімдеу", category: "Көлік", org: "ІІМ" },
		keywords: ["haydovchilik", "guvohnoma", "avtomobil", "mashina", "prava", "voditel", "водитель", "права", "driver", "license", "driving", "car", "vehicle", "жүргізуші", "куәлік", "DL", "avto"]
	},
	{
		id: 33,
		uz: { name: "Transport vositasini ro'yxatdan o'tkazish", category: "Transport", org: "IIV" },
		ru: { name: "Регистрация транспортного средства", category: "Транспорт", org: "МВД" },
		en: { name: "Vehicle Registration", category: "Transport", org: "Ministry of Interior" },
		kk: { name: "Көлік құралын тіркеу", category: "Көлік", org: "ІІМ" },
		keywords: ["mashina", "ro'yxat", "avto", "transport", "vehicle registration", "car register", "автомобиль", "регистрация", "ТС", "техпаспорт", "tech passport", "davlat raqami", "number plate", "nomor"]
	},
	{
		id: 34,
		uz: { name: "Texnik ko'rik (TO) o'tkazish", category: "Transport", org: "IIV" },
		ru: { name: "Прохождение технического осмотра (ТО)", category: "Транспорт", org: "МВД" },
		en: { name: "Vehicle Technical Inspection (MOT)", category: "Transport", org: "Ministry of Interior" },
		kk: { name: "Техникалық тексеруден өту", category: "Көлік", org: "ІІМ" },
		keywords: ["texnik ko'rik", "TO", "техосмотр", "ТО", "MOT", "inspection", "car check", "vehicle check", "mashina tekshirish", "техническое обслуживание"]
	},
	{
		id: 35,
		uz: { name: "Yo'l harakati jarimalarini to'lash", category: "Transport", org: "IIV" },
		ru: { name: "Оплата штрафов ПДД", category: "Транспорт", org: "МВД" },
		en: { name: "Traffic Fine Payment", category: "Transport", org: "Ministry of Interior" },
		kk: { name: "Жол айыппұлдарын төлеу", category: "Көлік", org: "ІІМ" },
		keywords: ["jarima", "штраф", "fine", "traffic fine", "yo'l", "ПДД", "платить штраф", "pay fine", "pul to'lash", "jarimani to'lash", "traffic violation"]
	},

	// ── REAL ESTATE & LAND ────────────────────────────────────────────────
	{
		id: 8,
		uz: { name: "Ko'chmas mulkni davlat ro'yxatidan o'tkazish", category: "Ko'chmas mulk", org: "Kadastr agentligi" },
		ru: { name: "Регистрация недвижимости", category: "Недвижимость", org: "Кадастр" },
		en: { name: "Real Estate Registration", category: "Real Estate", org: "Cadastre Agency" },
		kk: { name: "Жылжымайтын мүлікті тіркеу", category: "Жылжымайтын мүлік", org: "Кадастр агенттігі" },
		keywords: ["ko'chmas", "mulk", "uy", "ro'yxat", "kadastr", "дом", "недвижимость", "регистрация", "квартира", "real estate", "property", "house", "apartment", "cadastre", "жылжымайтын", "мүлік", "uy sotib", "bought house", "new home"]
	},
	{
		id: 4,
		uz: { name: "Ipoteka kreditiga davlat subsidiyasi", category: "Subsidiya", org: "Iqtisodiyot vazirligi" },
		ru: { name: "Государственная субсидия на ипотеку", category: "Субсидия", org: "Минэкономики" },
		en: { name: "Mortgage State Subsidy", category: "Subsidy", org: "Ministry of Economy" },
		kk: { name: "Ипотекаға мемлекеттік субсидия", category: "Субсидия", org: "Экономика министрлігі" },
		keywords: ["ipoteka", "kredit", "uy", "subsidiya", "arzon", "ипотека", "субсидия", "mortgage", "subsidy", "house", "loan", "housing loan", "льготный кредит", "үй", "тұрғын үй", "cheap house", "arzon uy"]
	},
	{
		id: 36,
		uz: { name: "Yer uchastkasini ajratish yoki ijaraga olish", category: "Ko'chmas mulk", org: "Yer resurslari agentligi" },
		ru: { name: "Выделение или аренда земельного участка", category: "Недвижимость", org: "Агентство земельных ресурсов" },
		en: { name: "Land Allocation or Lease", category: "Real Estate", org: "Land Resources Agency" },
		kk: { name: "Жер учаскесін бөлу немесе жалға алу", category: "Жылжымайтын мүлік", org: "Жер ресурстары агенттігі" },
		keywords: ["yer", "uchastkа", "ijara", "land", "plot", "участок", "земля", "аренда", "земельный участок", "yer ajratish", "dala", "bog'", "garden land"]
	},
	{
		id: 37,
		uz: { name: "Uy-joy qurilishiga ruxsatnoma olish", category: "Ko'chmas mulk", org: "Qurilish vazirligi" },
		ru: { name: "Разрешение на строительство жилья", category: "Недвижимость", org: "Министерство строительства" },
		en: { name: "Building Permit for Residential Construction", category: "Real Estate", org: "Ministry of Construction" },
		kk: { name: "Тұрғын үй құрылысына рұқсат", category: "Жылжымайтын мүлік", org: "Құрылыс министрлігі" },
		keywords: ["qurilish", "ruxsat", "build permit", "строить", "разрешение", "стройка", "uy qurish", "build house", "construction permit", "qurishga ruxsat", "yangi uy qurish"]
	},
	{
		id: 38,
		uz: { name: "Kvartira yoki uy ijarasi shartnomasini ro'yxatdan o'tkazish", category: "Ko'chmas mulk", org: "Soliq qo'mitasi" },
		ru: { name: "Регистрация договора аренды жилья", category: "Недвижимость", org: "Налоговый комитет" },
		en: { name: "Rental Agreement Registration", category: "Real Estate", org: "Tax Committee" },
		kk: { name: "Тұрғын үй жалдау шартын тіркеу", category: "Жылжымайтын мүлік", org: "Салық комитеті" },
		keywords: ["ijara", "rent", "shartnoma", "квартира", "аренда", "договор", "rental", "lease", "rent apartment", "ijaraga", "ijara shartnomasi", "yashash uchun ijara"]
	},

	// ── UTILITIES & COMMUNAL ──────────────────────────────────────────────
	{
		id: 12,
		uz: { name: "Kommunal xizmatlarga ulanish (gaz, suv, elektr)", category: "Kommunal xizmatlar", org: "Hududiy tarmoqlar" },
		ru: { name: "Подключение к коммунальным услугам", category: "Коммунальные услуги", org: "Региональные сети" },
		en: { name: "Utility Connection (gas, water, electricity)", category: "Utilities", org: "Regional Networks" },
		kk: { name: "Коммуналдық қызметтерге қосылу", category: "Коммуналдық қызметтер", org: "Аймақтық желілер" },
		keywords: ["gaz", "suv", "elektr", "kommunal", "ulanish", "газ", "вода", "электричество", "коммунальный", "gas", "water", "electricity", "utilities", "connect", "communal", "light", "heat"]
	},
	{
		id: 39,
		uz: { name: "Kommunal to'lovlarni onlayn to'lash", category: "Kommunal xizmatlar", org: "O'zinfotizim" },
		ru: { name: "Онлайн оплата коммунальных услуг", category: "Коммунальные услуги", org: "Узинфотизим" },
		en: { name: "Online Utility Bill Payment", category: "Utilities", org: "Uzinfotizim" },
		kk: { name: "Коммуналдық қызметтерді онлайн төлеу", category: "Коммуналдық қызметтер", org: "Узинфотизим" },
		keywords: ["kommunal", "to'lash", "pay", "оплата", "платить", "utility payment", "online pay", "internet payment", "suv puli", "gaz puli", "elektr puli", "счёт", "bill", "hisob"]
	},
	{
		id: 40,
		uz: { name: "Suv ta'minoti muammolarini hal qilish", category: "Kommunal xizmatlar", org: "Suvta'minot" },
		ru: { name: "Решение проблем водоснабжения", category: "Коммунальные услуги", org: "Водоснабжение" },
		en: { name: "Water Supply Issue Resolution", category: "Utilities", org: "Water Supply Agency" },
		kk: { name: "Сумен жабдықтау мәселелерін шешу", category: "Коммуналдық қызметтер", org: "Сумен жабдықтау" },
		keywords: ["suv", "ta'minot", "water supply", "водоснабжение", "water problem", "no water", "suv yo'q", "сухой трубе", "water pressure", "suv bosimi"]
	},

	// ── HEALTHCARE ────────────────────────────────────────────────────────
	{
		id: 18,
		uz: { name: "Tibbiy sug'urta polisi olish", category: "Sog'liqni saqlash", org: "Tibbiy sug'urta agentligi" },
		ru: { name: "Получение полиса ОМС", category: "Здравоохранение", org: "Агентство медстрахования" },
		en: { name: "Health Insurance Policy", category: "Healthcare", org: "Medical Insurance Agency" },
		kk: { name: "Медициналық сақтандыру полисін алу", category: "Денсаулық сақтау", org: "Медициналық сақтандыру агенттігі" },
		keywords: ["sug'urta", "tibbiy", "salomatlik", "kasalxona", "davolash", "полис", "ОМС", "страховка", "медицина", "больница", "лечение", "health insurance", "medical insurance", "policy", "healthcare", "hospital", "sick", "doctor", "illness", "sog'liq", "shifoxona"]
	},
	{
		id: 21,
		uz: { name: "Kasallik varaqasi (elektron)", category: "Sog'liqni saqlash", org: "Sog'liqni saqlash vazirligi" },
		ru: { name: "Электронный больничный лист", category: "Здравоохранение", org: "Министерство здравоохранения" },
		en: { name: "Electronic Sick Leave Certificate", category: "Healthcare", org: "Ministry of Health" },
		kk: { name: "Электрондық науқас парағы", category: "Денсаулық сақтау", org: "Денсаулық сақтау министрлігі" },
		keywords: ["kasallik", "varaq", "davolash", "shifoxona", "больничный", "лист", "sick leave", "sick note", "doctor certificate", "ill", "unwell", "medical leave", "tibbiy", "cannot work", "kasal", "health issue", "sick"]
	},
	{
		id: 22,
		uz: { name: "Poliklinikaga yozilish va shifokor tanlash", category: "Sog'liqni saqlash", org: "Sog'liqni saqlash vazirligi" },
		ru: { name: "Запись к врачу в поликлинику", category: "Здравоохранение", org: "Министерство здравоохранения" },
		en: { name: "Doctor Appointment at Clinic", category: "Healthcare", org: "Ministry of Health" },
		kk: { name: "Емханада дәрігерге жазылу", category: "Денсаулық сақтау", org: "Денсаулық сақтау министрлігі" },
		keywords: ["poliklinika", "shifokor", "qabul", "davolash", "врач", "поликлиника", "доктор", "записаться", "doctor", "clinic", "appointment", "health", "see doctor", "sick", "ill", "hospital visit", "tibbiy yordam", "health problem", "kasallik"]
	},
	{
		id: 24,
		uz: { name: "Bolalar uchun bepul ovqat va dori", category: "Sog'liqni saqlash", org: "Sog'liqni saqlash vazirligi" },
		ru: { name: "Бесплатное питание и лекарства для детей", category: "Здравоохранение", org: "Министерство здравоохранения" },
		en: { name: "Free Food and Medicine for Children", category: "Healthcare", org: "Ministry of Health" },
		kk: { name: "Балаларға тегін тамақ пен дәрілер", category: "Денсаулық сақтау", org: "Денсаулық сақтау министрлігі" },
		keywords: ["bepul", "dori", "ovqat", "bola", "tibbiy", "бесплатный", "лекарство", "питание", "дети", "free", "medicine", "food", "child", "children", "nutrition", "baby health", "bola kasallik", "sick child"]
	},
	{
		id: 25,
		uz: { name: "Pensionerlar uchun sog'liqni saqlash imtiyozlari", category: "Sog'liqni saqlash", org: "Tibbiy sug'urta agentligi" },
		ru: { name: "Льготы пенсионеров на лечение", category: "Здравоохранение", org: "Агентство медстрахования" },
		en: { name: "Healthcare Benefits for Pensioners", category: "Healthcare", org: "Medical Insurance Agency" },
		kk: { name: "Зейнеткерлерге медициналық жеңілдіктер", category: "Денсаулық сақтау", org: "Медициналық сақтандыру агенттігі" },
		keywords: ["pensioner", "keksa", "tibbiy", "sog'liq", "ota", "ona", "пенсионер", "лечение", "льгота", "pensioner health", "elderly health", "old people medical", "retired sick", "grandparent", "parent sick", "medical benefit"]
	},
	{
		id: 41,
		uz: { name: "Tug'ruqxonaga yo'llama olish", category: "Sog'liqni saqlash", org: "Sog'liqni saqlash vazirligi" },
		ru: { name: "Направление в родильный дом", category: "Здравоохранение", org: "Министерство здравоохранения" },
		en: { name: "Maternity Hospital Referral", category: "Healthcare", org: "Ministry of Health" },
		kk: { name: "Босану үйіне жолдама алу", category: "Денсаулық сақтау", org: "Денсаулық сақтау министрлігі" },
		keywords: ["tug'ruq", "homilador", "pregnancy", "pregnant", "роды", "беременность", "maternity", "prenatal", "tug'ish", "bola kutish", "kutilayotgan bola", "hamiladorlik"]
	},
	{
		id: 42,
		uz: { name: "Dori vositalarini bepul olish (imtiyozlilar uchun)", category: "Sog'liqni saqlash", org: "Sog'liqni saqlash vazirligi" },
		ru: { name: "Получение бесплатных лекарств (для льготников)", category: "Здравоохранение", org: "Министерство здравоохранения" },
		en: { name: "Free Medicines for Eligible Persons", category: "Healthcare", org: "Ministry of Health" },
		kk: { name: "Жеңілдік иелеріне тегін дәрілер", category: "Денсаулық сақтау", org: "Денсаулық сақтау министрлігі" },
		keywords: ["bepul dori", "dori", "medicine", "лекарство", "бесплатный", "free medicine", "льгота дари", "льготные лекарства", "chronic disease", "surunkali kasallik", "диабет", "diabetes", "gipertenziya", "hypertension"]
	},
	{
		id: 43,
		uz: { name: "Psixologik yordam va ruhiy salomatlik xizmati", category: "Sog'liqni saqlash", org: "Sog'liqni saqlash vazirligi" },
		ru: { name: "Психологическая помощь и служба психического здоровья", category: "Здравоохранение", org: "Министерство здравоохранения" },
		en: { name: "Psychological Support and Mental Health Service", category: "Healthcare", org: "Ministry of Health" },
		kk: { name: "Психологиялық көмек және психикалық денсаулық", category: "Денсаулық сақтау", org: "Денсаулық сақтау министрлігі" },
		keywords: ["psixolog", "ruhiy", "stress", "depressiya", "mental health", "психолог", "депрессия", "психическое здоровье", "anxiety", "qayg'u", "xavotir", "counseling", "therapist", "emotional support"]
	},

	// ── EDUCATION ────────────────────────────────────────────────────────
	{
		id: 10,
		uz: { name: "Bolani maktabga qabul qilish", category: "Ta'lim", org: "Maktab ta'limi vazirligi" },
		ru: { name: "Зачисление ребенка в школу", category: "Образование", org: "Минобразования" },
		en: { name: "School Enrollment", category: "Education", org: "Ministry of Education" },
		kk: { name: "Баланы мектепке қабылдау", category: "Білім", org: "Білім министрлігі" },
		keywords: ["maktab", "bola", "o'qish", "qabul", "школа", "зачисление", "дети", "ребенок", "school", "enrollment", "child", "enroll", "мектеп", "бала", "1-sinf", "first grade", "son school", "daughter school", "kid school"]
	},
	{
		id: 16,
		uz: { name: "Bolani bog'chaga joylash", category: "Ta'lim", org: "Maktabgacha ta'lim vazirligi" },
		ru: { name: "Запись ребёнка в детский сад", category: "Образование", org: "Минпросвещения" },
		en: { name: "Kindergarten Enrollment", category: "Education", org: "Ministry of Education" },
		kk: { name: "Баланы балабақшаға орналастыру", category: "Білім", org: "Білім министрлігі" },
		keywords: ["bog'cha", "bolalar", "maktabgacha", "детский сад", "садик", "kindergarten", "daycare", "nursery", "preschool", "bola", "child", "балабақша", "son kindergarten", "daughter daycare"]
	},
	{
		id: 44,
		uz: { name: "Universitetga o'tish (davlat granti)", category: "Ta'lim", org: "Oliy ta'lim vazirligi" },
		ru: { name: "Поступление в вуз (государственный грант)", category: "Образование", org: "Министерство высшего образования" },
		en: { name: "University Admission (State Grant)", category: "Education", org: "Ministry of Higher Education" },
		kk: { name: "Университетке түсу (мемлекеттік грант)", category: "Білім", org: "Жоғары білім министрлігі" },
		keywords: ["universitet", "oliy", "grant", "talaba", "вуз", "университет", "поступление", "грант", "university", "higher education", "student", "admission", "DTM", "test", "grant olish", "o'qishga kirish"]
	},
	{
		id: 45,
		uz: { name: "Xorijda o'qish stipendiyasi (El-yurt umidi va b.)", category: "Ta'lim", org: "Yoshlar ishlari agentligi" },
		ru: { name: "Стипендия на обучение за рубежом", category: "Образование", org: "Агентство по делам молодёжи" },
		en: { name: "Scholarship for Study Abroad", category: "Education", org: "Youth Affairs Agency" },
		kk: { name: "Шетелде оқуға стипендия", category: "Білім", org: "Жастар істері агенттігі" },
		keywords: ["stipendiya", "xorij", "abroad", "scholarship", "grant", "el-yurt umidi", "стипендия", "зарубеж", "study abroad", "chetda o'qish", "foreign scholarship", "xorijda ta'lim"]
	},
	{
		id: 46,
		uz: { name: "Maktab attestati yoki diplomni qayta olish", category: "Ta'lim", org: "Maktab ta'limi vazirligi" },
		ru: { name: "Повторное получение аттестата или диплома", category: "Образование", org: "Минобразования" },
		en: { name: "Duplicate School Certificate or Diploma", category: "Education", org: "Ministry of Education" },
		kk: { name: "Аттестат немесе диплом көшірмесін алу", category: "Білім", org: "Білім министрлігі" },
		keywords: ["attestat", "diplom", "duplicate", "дубликат", "аттестат", "диплом", "lost certificate", "certificate copy", "yo'qotilgan diplom", "copy of diploma", "school certificate"]
	},
	{
		id: 47,
		uz: { name: "Kasb-hunar ta'limi va kurslar", category: "Ta'lim", org: "Kasb-hunar ta'limi agentligi" },
		ru: { name: "Профессиональное образование и курсы", category: "Образование", org: "Агентство профобразования" },
		en: { name: "Vocational Education and Training Courses", category: "Education", org: "Vocational Education Agency" },
		kk: { name: "Кәсіптік оқыту және курстар", category: "Білім", org: "Кәсіптік білім беру агенттігі" },
		keywords: ["kasb", "hunar", "kurs", "vocational", "training", "профессиональный", "курсы", "техникум", "college", "kolledj", "skill", "hunarmand", "o'qish", "kasbni o'rganish", "retraining", "qualification"]
	},

	// ── PENSION & SOCIAL PROTECTION ──────────────────────────────────────
	{
		id: 3,
		uz: { name: "Pensiya tayinlash", category: "Pensiya", org: "Pensiya jamg'armasi" },
		ru: { name: "Назначение пенсии", category: "Пенсия", org: "Пенсионный фонд" },
		en: { name: "Pension Assignment", category: "Pension", org: "Pension Fund" },
		kk: { name: "Зейнетақы тағайындау", category: "Зейнетақы", org: "Зейнетақы қоры" },
		keywords: ["pensiya", "nafaqa", "keksa", "qarilik", "retired", "пенсия", "пособие", "pension", "retirement", "retire", "old age", "зейнетақы", "зейнет", "pensioner", "ota pensiya", "ona pensiya"]
	},
	{
		id: 7,
		uz: { name: "Bolalar nafaqasi tayinlash", category: "Ijtimoiy himoya", org: "Ijtimoiy himoya agentligi" },
		ru: { name: "Назначение детского пособия", category: "Социальная защита", org: "Агентство соцзащиты" },
		en: { name: "Child Allowance", category: "Social Protection", org: "Social Protection Agency" },
		kk: { name: "Балалар жәрдемақысын тағайындау", category: "Әлеуметтік қорғау", org: "Әлеуметтік қорғау агенттігі" },
		keywords: ["bola", "nafaqa", "yordam", "bolalar", "детское", "пособие", "дети", "child", "allowance", "benefit", "children benefit", "бала", "жәрдемақы", "child support", "kids", "money for child", "o'g'il", "qiz", "son", "daughter"]
	},
	{
		id: 14,
		uz: { name: "Nogironlikni belgilash va nafaqa", category: "Ijtimoiy himoya", org: "Tibbiy ekspertiza" },
		ru: { name: "Установление инвалидности и пособие", category: "Социальная защита", org: "Медэкспертиза" },
		en: { name: "Disability Determination and Benefits", category: "Social Protection", org: "Medical Expertise" },
		kk: { name: "Мүгедектікті белгілеу және жәрдемақы", category: "Әлеуметтік қорғау", org: "Медициналық сараптама" },
		keywords: ["nogiron", "nogironlik", "инвалид", "инвалидность", "disability", "disabled", "мүгедек", "handicap", "special needs", "can't work", "sick", "ill", "injury", "not working", "travma", "kasallik", "mayib"]
	},
	{
		id: 20,
		uz: { name: "Ijtimoiy yordam (muhtoj oilalarga)", category: "Ijtimoiy himoya", org: "Ijtimoiy himoya agentligi" },
		ru: { name: "Социальная помощь (малоимущим семьям)", category: "Социальная защита", org: "Агентство соцзащиты" },
		en: { name: "Social Assistance (low-income families)", category: "Social Protection", org: "Social Protection Agency" },
		kk: { name: "Әлеуметтік көмек (аз қамтылған отбасыларға)", category: "Әлеуметтік қорғау", org: "Әлеуметтік қорғау агенттігі" },
		keywords: ["yordam", "ijtimoiy", "muhtoj", "kambag'al", "помощь", "малоимущий", "бедный", "social", "assistance", "welfare", "poor", "poverty", "aid", "support", "pul yo'q", "no money", "hard times", "financial help"]
	},
	{
		id: 48,
		uz: { name: "Yolg'iz keksalar uchun ijtimoiy xizmat", category: "Ijtimoiy himoya", org: "Ijtimoiy himoya agentligi" },
		ru: { name: "Социальные услуги для одиноких пожилых", category: "Социальная защита", org: "Агентство соцзащиты" },
		en: { name: "Social Services for Elderly Living Alone", category: "Social Protection", org: "Social Protection Agency" },
		kk: { name: "Жалғызілікті қарттарға әлеуметтік қызмет", category: "Әлеуметтік қорғау", org: "Әлеуметтік қорғау агенттігі" },
		keywords: ["yolg'iz", "keksa", "qariya", "elderly alone", "одинокий", "пожилой", "old person alone", "senior care", "uy-joy xizmati", "uyda yordam", "home care", "ata yolg'iz", "buvi yolg'iz"]
	},
	{
		id: 49,
		uz: { name: "Nafaqa uchun murojaat (ko'p bolali ona)", category: "Ijtimoiy himoya", org: "Ijtimoiy himoya agentligi" },
		ru: { name: "Пособие многодетной матери", category: "Социальная защита", org: "Агентство соцзащиты" },
		en: { name: "Large Family Mother Allowance", category: "Social Protection", org: "Social Protection Agency" },
		kk: { name: "Көп балалы анаға жәрдемақы", category: "Әлеуметтік қорғау", org: "Әлеуметтік қорғау агенттігі" },
		keywords: ["ko'p bolali", "ona", "nafaqa", "многодетная", "мать", "пособие", "large family", "many children", "bir necha bola", "ko'p farzand", "multi child benefit", "mother benefit"]
	},
	{
		id: 50,
		uz: { name: "Pensiya jamg'arma hisobini tekshirish", category: "Pensiya", org: "Pensiya jamg'armasi" },
		ru: { name: "Проверка пенсионного накопительного счёта", category: "Пенсия", org: "Пенсионный фонд" },
		en: { name: "Pension Savings Account Check", category: "Pension", org: "Pension Fund" },
		kk: { name: "Зейнетақы жинақ шотын тексеру", category: "Зейнетақы", org: "Зейнетақы қоры" },
		keywords: ["pensiya jamg'arma", "накопительный счёт", "pension savings", "pension account", "pensiya hisobi", "jamg'arma", "check pension", "менинг пенсиям", "my pension balance"]
	},

	// ── LABOUR & EMPLOYMENT ───────────────────────────────────────────────
	{
		id: 17,
		uz: { name: "Mehnat daftarchasini rasmiylashtirish", category: "Mehnat va ish", org: "Mehnat vazirligi" },
		ru: { name: "Оформление трудовой книжки", category: "Труд и занятость", org: "Минтруд" },
		en: { name: "Employment Record Book", category: "Labour and Employment", org: "Ministry of Labour" },
		kk: { name: "Еңбек кітапшасын ресімдеу", category: "Еңбек және жұмыспен қамту", org: "Еңбек министрлігі" },
		keywords: ["mehnat", "ish", "daftarcha", "ishchi", "трудовой", "книжка", "employment", "work", "labor", "job", "employment book", "job record", "yangi ish", "new job", "first job"]
	},
	{
		id: 23,
		uz: { name: "Ishsizlik nafaqasi olish", category: "Mehnat va ish", org: "Bandlik agentligi" },
		ru: { name: "Пособие по безработице", category: "Труд и занятость", org: "Агентство занятости" },
		en: { name: "Unemployment Benefit", category: "Labour and Employment", org: "Employment Agency" },
		kk: { name: "Жұмыссыздық бойынша жәрдемақы", category: "Еңбек және жұмыспен қамту", org: "Жұмыспен қамту агенттігі" },
		keywords: ["ishsiz", "ish yo'q", "ishdan bo'shatilgan", "nafaqa", "безработный", "пособие", "уволен", "unemployed", "lost job", "fired", "laid off", "no job", "out of work", "bandlik", "ishsizlik", "job loss"]
	},
	{
		id: 51,
		uz: { name: "Xorijiy fuqarolarni ishga olish uchun ruxsat", category: "Mehnat va ish", org: "Mehnat vazirligi" },
		ru: { name: "Разрешение на найм иностранных работников", category: "Труд и занятость", org: "Минтруд" },
		en: { name: "Work Permit for Foreign Nationals", category: "Labour and Employment", org: "Ministry of Labour" },
		kk: { name: "Шетелдіктерге жұмыс рұқсатнамасы", category: "Еңбек және жұмыспен қамту", org: "Еңбек министрлігі" },
		keywords: ["xorijiy", "ishchi", "work permit", "рабочая виза", "иностранный", "работник", "foreign worker", "chet ellik ishchi", "expat", "hire foreigner", "migrant worker"]
	},
	{
		id: 52,
		uz: { name: "Mehnat nizolarini hal qilish", category: "Mehnat va ish", org: "Mehnat vazirligi" },
		ru: { name: "Разрешение трудовых споров", category: "Труд и занятость", org: "Минтруд" },
		en: { name: "Labour Dispute Resolution", category: "Labour and Employment", org: "Ministry of Labour" },
		kk: { name: "Еңбек дауларын шешу", category: "Еңбек және жұмыспен қамту", org: "Еңбек министрлігі" },
		keywords: ["mehnat nizo", "boss", "employer", "ishdan bo'sh", "dispute", "трудовой спор", "конфликт", "labor dispute", "wrongful dismissal", "haqsiz ishdan olish", "salary not paid", "maosh berilmaydi"]
	},
	{
		id: 53,
		uz: { name: "Xorijda ishlash uchun vositachilik xizmati", category: "Mehnat va ish", org: "Tashqi mehnat migratsiyasi agentligi" },
		ru: { name: "Содействие в трудоустройстве за рубежом", category: "Труд и занятость", org: "Агентство внешней трудовой миграции" },
		en: { name: "Employment Assistance Abroad", category: "Labour and Employment", org: "External Labour Migration Agency" },
		kk: { name: "Шетелде жұмысқа орналасуға көмек", category: "Еңбек және жұмыспен қамту", org: "Сыртқы еңбек миграциясы агенттігі" },
		keywords: ["xorij", "mehnat", "abroad work", "work abroad", "chetda ishlash", "трудовая миграция", "foreign employment", "chet elda ish", "Russia", "Korea", "Qatar", "migrant", "миграция"]
	},

	// ── TAXES & BUSINESS ─────────────────────────────────────────────────
	{
		id: 9,
		uz: { name: "Soliq qarzi to'g'risida ma'lumotnoma", category: "Soliqlar", org: "Soliq qo'mitasi" },
		ru: { name: "Справка о налоговой задолженности", category: "Налоги", org: "Налоговый комитет" },
		en: { name: "Tax Debt Certificate", category: "Taxes", org: "Tax Committee" },
		kk: { name: "Салық қарызы туралы анықтама", category: "Салықтар", org: "Салық комитеті" },
		keywords: ["soliq", "qarz", "ma'lumotnoma", "налог", "задолженность", "справка", "долг", "tax", "debt", "certificate", "arrears", "салық", "қарыз", "owe tax"]
	},
	{
		id: 13,
		uz: { name: "STIR (soliq identifikatsiya raqami) olish", category: "Soliqlar", org: "Soliq qo'mitasi" },
		ru: { name: "Получение ИНН", category: "Налоги", org: "Налоговый комитет" },
		en: { name: "Tax Identification Number (TIN)", category: "Taxes", org: "Tax Committee" },
		kk: { name: "СТН алу", category: "Салықтар", org: "Салық комитеті" },
		keywords: ["stir", "инн", "tin", "tax id", "солиқ", "идентификация", "ИНН", "identification number", "fiscal", "стир", "tax number"]
	},
	{
		id: 5,
		uz: { name: "Yakka tartibdagi tadbirkorlikni ro'yxatdan o'tkazish", category: "Iqtisodiyot va biznes", org: "Adliya" },
		ru: { name: "Регистрация ИП", category: "Экономика и бизнес", org: "Минюст" },
		en: { name: "Individual Entrepreneur Registration", category: "Economy and Business", org: "Ministry of Justice" },
		kk: { name: "Жеке кәсіпкерлікті тіркеу", category: "Экономика және бизнес", org: "Әділет" },
		keywords: ["tadbirkor", "biznes", "ro'yxat", "ochish", "IP", "ИП", "предприниматель", "бизнес", "регистрация", "business", "entrepreneur", "register", "start", "solo", "freelance", "кәсіпкер", "own business", "self employed", "work for myself"]
	},
	{
		id: 54,
		uz: { name: "Mas'uliyati cheklangan jamiyat (MChJ) ro'yxatdan o'tkazish", category: "Iqtisodiyot va biznes", org: "Adliya" },
		ru: { name: "Регистрация ООО", category: "Экономика и бизнес", org: "Минюст" },
		en: { name: "LLC Company Registration", category: "Economy and Business", org: "Ministry of Justice" },
		kk: { name: "ЖШС тіркеу", category: "Экономика және бизнес", org: "Әділет" },
		keywords: ["MChJ", "LLC", "ООО", "company", "компания", "юридическое лицо", "register company", "фирма", "firma", "yuridik shaxs", "legal entity", "corporate", "kompaniya ochish"]
	},
	{
		id: 55,
		uz: { name: "Soliq hisobotini topshirish (onlayn)", category: "Soliqlar", org: "Soliq qo'mitasi" },
		ru: { name: "Сдача налоговой декларации (онлайн)", category: "Налоги", org: "Налоговый комитет" },
		en: { name: "Online Tax Return Filing", category: "Taxes", org: "Tax Committee" },
		kk: { name: "Онлайн салық декларациясын тапсыру", category: "Салықтар", org: "Салық комитеті" },
		keywords: ["soliq hisobot", "deklaratsiya", "декларация", "tax return", "tax filing", "online tax", "soliq topshirish", "налоговая отчётность", "submit tax", "annual tax", "yillik soliq"]
	},
	{
		id: 56,
		uz: { name: "Litsenziya olish (tibbiy, ta'lim, savdo va b.)", category: "Iqtisodiyot va biznes", org: "Litsenziyalash agentligi" },
		ru: { name: "Получение лицензии (медицина, образование, торговля и др.)", category: "Экономика и бизнес", org: "Агентство лицензирования" },
		en: { name: "Business License (medical, education, trade, etc.)", category: "Economy and Business", org: "Licensing Agency" },
		kk: { name: "Лицензия алу (медицина, білім, сауда және т.б.)", category: "Экономика және бизнес", org: "Лицензиялау агенттігі" },
		keywords: ["litsenziya", "license", "лицензия", "permit", "ruxsatnoma", "medical license", "tibbiy litsenziya", "trade license", "savdo ruxsat", "biznes ruxsat", "license application"]
	},
	{
		id: 57,
		uz: { name: "Davlat xaridlarida ishtirok etish (tender)", category: "Iqtisodiyot va biznes", org: "Davlat xaridlari agentligi" },
		ru: { name: "Участие в государственных закупках (тендер)", category: "Экономика и бизнес", org: "Агентство госзакупок" },
		en: { name: "Government Procurement Participation (Tender)", category: "Economy and Business", org: "Public Procurement Agency" },
		kk: { name: "Мемлекеттік сатып алуларға қатысу (тендер)", category: "Экономика және бизнес", org: "Мемлекеттік сатып алу агенттігі" },
		keywords: ["tender", "davlat xarid", "государственные закупки", "procurement", "bid", "government contract", "tenderda ishtirok", "government purchase", "tender ariza"]
	},

	// ── COURTS & LEGAL ───────────────────────────────────────────────────
	{
		id: 58,
		uz: { name: "Sud arizasini berish (fuqarolik ishi)", category: "Huquq va sud", org: "Sudlar" },
		ru: { name: "Подача искового заявления (гражданское дело)", category: "Право и суд", org: "Суды" },
		en: { name: "Court Claim Filing (Civil Case)", category: "Law and Courts", org: "Courts" },
		kk: { name: "Сотқа арыз беру (азаматтық іс)", category: "Құқық және сот", org: "Соттар" },
		keywords: ["sud", "ariza", "court", "иск", "судебный", "civil case", "claim", "sue", "courtcase", "юридический", "huquq", "legal", "shartnoma buzilishi", "contract breach"]
	},
	{
		id: 59,
		uz: { name: "Notarial hujjatlarni tasdiqlash", category: "Huquq va sud", org: "Notariat" },
		ru: { name: "Нотариальное удостоверение документов", category: "Право и суд", org: "Нотариат" },
		en: { name: "Notarial Document Authentication", category: "Law and Courts", org: "Notariat" },
		kk: { name: "Нотариалдық құжаттарды растау", category: "Құқық және сот", org: "Нотариат" },
		keywords: ["notarius", "notarial", "нотариус", "нотариальный", "notarize", "hujjat tasdiqlash", "certify document", "legal document", "vasiyatnoma", "will", "meros", "inheritance document"]
	},
	{
		id: 60,
		uz: { name: "Bepul huquqiy yordam olish", category: "Huquq va sud", org: "Adliya vazirligi" },
		ru: { name: "Получение бесплатной юридической помощи", category: "Право и суд", org: "Министерство юстиции" },
		en: { name: "Free Legal Aid", category: "Law and Courts", org: "Ministry of Justice" },
		kk: { name: "Тегін заң көмегін алу", category: "Құқық және сот", org: "Әділет министрлігі" },
		keywords: ["bepul huquq", "legal aid", "free legal", "юридическая помощь", "бесплатный юрист", "lawyer", "advokat", "attorney", "huquqshunoslik", "right", "huquq yordam", "legal advice"]
	},
	{
		id: 61,
		uz: { name: "Mulkni meros qilib olish (vasiyatnoma)", category: "Huquq va sud", org: "Notariat" },
		ru: { name: "Наследование имущества (завещание)", category: "Право и суд", org: "Нотариат" },
		en: { name: "Property Inheritance (Will)", category: "Law and Courts", org: "Notariat" },
		kk: { name: "Мүлікті мұраға алу (өсиет)", category: "Құқық және сот", org: "Нотариат" },
		keywords: ["meros", "vasiyatnoma", "inheritance", "will", "наследство", "завещание", "property after death", "merosxo'r", "heir", "dad died property", "ota mulki", "ona mulki"]
	},

	// ── MILITARY & NATIONAL SERVICE ──────────────────────────────────────
	{
		id: 62,
		uz: { name: "Harbiy xizmatga chaqiriq va ro'yxatga olish", category: "Mudofaa", org: "Mudofaa vazirligi" },
		ru: { name: "Призыв и постановка на воинский учёт", category: "Оборона", org: "Министерство обороны" },
		en: { name: "Military Conscription and Registration", category: "Defence", org: "Ministry of Defence" },
		kk: { name: "Әскери шақыру және есепке алу", category: "Қорғаныс", org: "Қорғаныс министрлігі" },
		keywords: ["harbiy", "xizmat", "armiya", "военный", "призыв", "military", "conscription", "служба", "army", "soldier", "harb", "askarga", "armiyaga", "chaqiriq"]
	},
	{
		id: 63,
		uz: { name: "Harbiy guvohnoma yoki chegirma olish", category: "Mudofaa", org: "Mudofaa vazirligi" },
		ru: { name: "Военный билет или отсрочка", category: "Оборона", org: "Министерство обороны" },
		en: { name: "Military ID or Deferment", category: "Defence", org: "Ministry of Defence" },
		kk: { name: "Әскери куәлік немесе кейінге қалдыру", category: "Қорғаныс", org: "Қорғаныс министрлігі" },
		keywords: ["harbiy guvohnoma", "kechiktirish", "военный билет", "отсрочка", "военник", "military ID", "deferment", "army exemption", "student deferment", "o'qish uchun kechiktirish"]
	},

	// ── AGRICULTURE ──────────────────────────────────────────────────────
	{
		id: 64,
		uz: { name: "Fermer xo'jaligi ro'yxatdan o'tkazish", category: "Qishloq xo'jaligi", org: "Qishloq xo'jaligi vazirligi" },
		ru: { name: "Регистрация фермерского хозяйства", category: "Сельское хозяйство", org: "Министерство сельского хозяйства" },
		en: { name: "Farm Registration", category: "Agriculture", org: "Ministry of Agriculture" },
		kk: { name: "Шаруа қожалығын тіркеу", category: "Ауыл шаруашылығы", org: "Ауыл шаруашылығы министрлігі" },
		keywords: ["fermer", "qishloq", "ro'yxat", "farm", "farmer", "register farm", "сельское", "хозяйство", "фермер", "dехqon", "dehqonchilik", "agriculture", "agro", "land farming"]
	},
	{
		id: 65,
		uz: { name: "Qishloq xo'jaligi subsidiyasi olish", category: "Qishloq xo'jaligi", org: "Qishloq xo'jaligi vazirligi" },
		ru: { name: "Получение сельскохозяйственной субсидии", category: "Сельское хозяйство", org: "Министерство сельского хозяйства" },
		en: { name: "Agricultural Subsidy", category: "Agriculture", org: "Ministry of Agriculture" },
		kk: { name: "Ауыл шаруашылығы субсидиясы", category: "Ауыл шаруашылығы", org: "Ауыл шаруашылығы министрлігі" },
		keywords: ["qishloq subsidiya", "yer subsidiya", "agricultural subsidy", "fertilizer", "o'g'it", "tovar", "crop support", "деревня", "субсидия", "сельхоз", "seed subsidy", "urug' yordam"]
	},
	{
		id: 66,
		uz: { name: "Veterinariya sertifikati olish", category: "Qishloq xo'jaligi", org: "Veterinariya agentligi" },
		ru: { name: "Получение ветеринарного сертификата", category: "Сельское хозяйство", org: "Ветеринарное агентство" },
		en: { name: "Veterinary Certificate", category: "Agriculture", org: "Veterinary Agency" },
		kk: { name: "Ветеринариялық куәлік алу", category: "Ауыл шаруашылығы", org: "Ветеринария агенттігі" },
		keywords: ["veterinar", "hayvon", "mol", "livestock", "veterinary", "ветеринар", "животное", "сертификат", "animal certificate", "chorva", "qoramol", "qo'y", "echki", "chicken", "tovuq"]
	},

	// ── ENVIRONMENT & ECOLOGY ────────────────────────────────────────────
	{
		id: 67,
		uz: { name: "Ekologik ruxsatnoma (korxonalar uchun)", category: "Ekologiya", org: "Ekologiya agentligi" },
		ru: { name: "Экологическое разрешение (для предприятий)", category: "Экология", org: "Агентство экологии" },
		en: { name: "Environmental Permit (for businesses)", category: "Ecology", org: "Ecology Agency" },
		kk: { name: "Экологиялық рұқсатнама (кәсіпорындар үшін)", category: "Экология", org: "Экология агенттігі" },
		keywords: ["ekologiya", "atrof-muhit", "ecology", "environment", "pollution", "ifloslanish", "environmental permit", "завод", "factory", "emission", "chiqindi", "waste"]
	},
	{
		id: 68,
		uz: { name: "Suv resurslari ishlatish uchun ruxsatnoma", category: "Ekologiya", org: "Suv xo'jaligi vazirligi" },
		ru: { name: "Разрешение на использование водных ресурсов", category: "Экология", org: "Министерство водного хозяйства" },
		en: { name: "Water Resource Usage Permit", category: "Ecology", org: "Ministry of Water Resources" },
		kk: { name: "Су ресурстарын пайдалануға рұқсат", category: "Экология", org: "Су шаруашылығы министрлігі" },
		keywords: ["suv resursi", "water permit", "водные ресурсы", "irrigation", "sug'orish", "дарья", "river", "канал", "canal", "water use", "farming water", "daryodan suv"]
	},

	// ── CUSTOMS & TRADE ─────────────────────────────────────────────────
	{
		id: 69,
		uz: { name: "Import-eksport litsenziyasi olish", category: "Savdo va bojxona", org: "Bojxona agentligi" },
		ru: { name: "Лицензия на импорт и экспорт", category: "Торговля и таможня", org: "Таможенное агентство" },
		en: { name: "Import-Export License", category: "Trade and Customs", org: "Customs Agency" },
		kk: { name: "Импорт-экспорт лицензиясы", category: "Сауда және кеден", org: "Кеден агенттігі" },
		keywords: ["import", "eksport", "bojxona", "customs", "лицензия", "import export", "license", "trade", "savdo", "товар", "goods", "chet eldan", "foreign goods", "customs clearance"]
	},
	{
		id: 70,
		uz: { name: "Tovarlarni bojxonadan o'tkazish", category: "Savdo va bojxona", org: "Bojxona agentligi" },
		ru: { name: "Таможенное оформление товаров", category: "Торговля и таможня", org: "Таможенное агентство" },
		en: { name: "Customs Clearance of Goods", category: "Trade and Customs", org: "Customs Agency" },
		kk: { name: "Тауарларды кедендік рәсімдеу", category: "Сауда және кеден", org: "Кеден агенттігі" },
		keywords: ["bojxona", "customs clearance", "tovar", "customs", "таможня", "clearance", "декларирование", "declaration", "посылка", "parcel", "package", "bring goods", "tovar olib kirish"]
	},

	// ── CULTURE, SPORT & TOURISM ─────────────────────────────────────────
	{
		id: 71,
		uz: { name: "Madaniy meros ob'ektlarida tadbirlar uchun ruxsat", category: "Madaniyat va turizm", org: "Madaniyat vazirligi" },
		ru: { name: "Разрешение на мероприятие в объектах культурного наследия", category: "Культура и туризм", org: "Министерство культуры" },
		en: { name: "Event Permit at Cultural Heritage Sites", category: "Culture and Tourism", org: "Ministry of Culture" },
		kk: { name: "Мәдени мұра нысандарында іс-шараға рұқсат", category: "Мәдениет және туризм", org: "Мәдениет министрлігі" },
		keywords: ["madaniyat", "meros", "tadbir", "культура", "наследие", "мероприятие", "event permit", "culture", "heritage", "festival", "concert", "tadbirga ruxsat"]
	},
	{
		id: 72,
		uz: { name: "Turizm agentligini ro'yxatdan o'tkazish", category: "Madaniyat va turizm", org: "Turizm agentligi" },
		ru: { name: "Регистрация туристического агентства", category: "Культура и туризм", org: "Агентство туризма" },
		en: { name: "Tourism Agency Registration", category: "Culture and Tourism", org: "Tourism Agency" },
		kk: { name: "Туристік агенттікті тіркеу", category: "Мәдениет және туризм", org: "Туризм агенттігі" },
		keywords: ["turizm", "sayohat", "agency", "туризм", "агентство", "tourism business", "travel agency", "register tourism", "sayyoh", "tourist company", "tour operator"]
	},

	// ── INFORMATION TECHNOLOGY ────────────────────────────────────────────
	{
		id: 73,
		uz: { name: "ERI (elektron raqamli imzo) olish", category: "Raqamli xizmatlar", org: "Axborot texnologiyalari vazirligi" },
		ru: { name: "Получение ЭЦП (электронная цифровая подпись)", category: "Цифровые услуги", org: "Министерство ИТ" },
		en: { name: "Digital Signature (ERI/EDS)", category: "Digital Services", org: "Ministry of IT" },
		kk: { name: "ЭЦП (электрондық цифрлық қол қою) алу", category: "Цифрлық қызметтер", org: "АТ министрлігі" },
		keywords: ["ERI", "EDS", "elektron imzo", "digital signature", "ЭЦП", "электронная подпись", "e-signature", "raqamli imzo", "digital cert", "online sign", "onlayn imzo"]
	},
	{
		id: 74,
		uz: { name: "My.gov.uz portalda ro'yxatdan o'tish", category: "Raqamli xizmatlar", org: "Axborot texnologiyalari vazirligi" },
		ru: { name: "Регистрация на портале My.gov.uz", category: "Цифровые услуги", org: "Министерство ИТ" },
		en: { name: "Registration on My.gov.uz Portal", category: "Digital Services", org: "Ministry of IT" },
		kk: { name: "My.gov.uz порталына тіркелу", category: "Цифрлық қызметтер", org: "АТ министрлігі" },
		keywords: ["my.gov", "portal", "ro'yxat", "registration", "онлайн", "online account", "profile", "shaxsiy kabinet", "my gov", "mygov", "government portal", "hukumat portali", "create account"]
	},
	{
		id: 75,
		uz: { name: "Raqamli hujjatni online tekshirish", category: "Raqamli xizmatlar", org: "Axborot texnologiyalari vazirligi" },
		ru: { name: "Онлайн проверка цифрового документа", category: "Цифровые услуги", org: "Министерство ИТ" },
		en: { name: "Online Digital Document Verification", category: "Digital Services", org: "Ministry of IT" },
		kk: { name: "Цифрлық құжатты онлайн тексеру", category: "Цифрлық қызметтер", org: "АТ министрлігі" },
		keywords: ["hujjat tekshirish", "verify document", "онлайн проверка", "document check", "autentifikatsiya", "authentic", "real document", "подлинность", "fake check", "haqiqiymi"]
	},

	// ── RELIGION ────────────────────────────────────────────────────────
	{
		id: 76,
		uz: { name: "Diniy tashkilotni ro'yxatdan o'tkazish", category: "Din ishlari", org: "Din ishlari qo'mitasi" },
		ru: { name: "Регистрация религиозной организации", category: "Религиозные дела", org: "Комитет по делам религий" },
		en: { name: "Religious Organisation Registration", category: "Religious Affairs", org: "Committee for Religious Affairs" },
		kk: { name: "Діни ұйымды тіркеу", category: "Дін істері", org: "Дін істері жөніндегі комитет" },
		keywords: ["diniy", "masjid", "cherkov", "sinagog", "din", "religion", "mosque", "church", "register religion", "religious org", "diniy tashkilot", "ruhoniy"]
	},
	{
		id: 77,
		uz: { name: "Haj va umra sayohatiga ro'yxat", category: "Din ishlari", org: "Din ishlari qo'mitasi" },
		ru: { name: "Регистрация на хадж или умру", category: "Религиозные дела", org: "Комитет по делам религий" },
		en: { name: "Hajj and Umrah Registration", category: "Religious Affairs", org: "Committee for Religious Affairs" },
		kk: { name: "Қажылыққа және умраға тіркелу", category: "Дін істері", org: "Дін істері жөніндегі комитет" },
		keywords: ["haj", "umra", "mecca", "makka", "hajj", "pilgrimage", "ziyorat", "haj uchun", "umra uchun", "register hajj", "мекка", "хадж", "умра", "паломничество"]
	},

	// ── COMMUNICATIONS & POSTAL ──────────────────────────────────────────
	{
		id: 78,
		uz: { name: "Pochta xizmatlari va jo'natmalarni kuzatish", category: "Aloqa va pochta", org: "O'zbekiston pochtasi" },
		ru: { name: "Почтовые услуги и отслеживание посылок", category: "Связь и почта", org: "Почта Узбекистана" },
		en: { name: "Postal Services and Parcel Tracking", category: "Communications and Post", org: "Uzbekistan Post" },
		kk: { name: "Пошта қызметтері және жіберімдерді қадағалау", category: "Байланыс және пошта", org: "Өзбекстан поштасы" },
		keywords: ["pochta", "parcel", "посылка", "tracking", "track", "jo'natma", "mail", "letter", "xat", "postal", "доставка", "delivery", "received package", "pochta yubor"]
	},
	{
		id: 79,
		uz: { name: "Mobil raqamni saqlash holda operator almashtirish (MNP)", category: "Aloqa va pochta", org: "Axborot texnologiyalari vazirligi" },
		ru: { name: "Смена оператора с сохранением номера (MNP)", category: "Связь и почта", org: "Министерство ИТ" },
		en: { name: "Mobile Number Portability (MNP)", category: "Communications and Post", org: "Ministry of IT" },
		kk: { name: "Нөмірді сақтап оператор ауыстыру (MNP)", category: "Байланыс және пошта", org: "АТ министрлігі" },
		keywords: ["MNP", "operator", "mobil", "raqam", "phone number", "change operator", "номер телефона", "оператор", "ucell", "beeline", "mobiuz", "sim", "sim card", "raqamni saqlash"]
	},

	// ── CONSUMER PROTECTION ──────────────────────────────────────────────
	{
		id: 80,
		uz: { name: "Iste'molchi huquqlarini himoya qilish arizasi", category: "Iste'molchilar himoyasi", org: "Antimonopol qo'mita" },
		ru: { name: "Жалоба на защиту прав потребителей", category: "Защита потребителей", org: "Антимонопольный комитет" },
		en: { name: "Consumer Rights Protection Complaint", category: "Consumer Protection", org: "Anti-Monopoly Committee" },
		kk: { name: "Тұтынушы құқықтарын қорғау шағымы", category: "Тұтынушыларды қорғау", org: "Монополияға қарсы комитет" },
		keywords: ["iste'molchi", "huquq", "consumer", "protection", "shikoyat", "complaint", "права потребителя", "жалоба", "product return", "tovar qaytarish", "refund", "sotuvchi aldadi", "seller fraud", "quality complaint"]
	},
	{
		id: 81,
		uz: { name: "Narx va sifat nazorati shikoyati", category: "Iste'molchilar himoyasi", org: "Antimonopol qo'mita" },
		ru: { name: "Жалоба на контроль цен и качества", category: "Защита потребителей", org: "Антимонопольный комитет" },
		en: { name: "Price and Quality Control Complaint", category: "Consumer Protection", org: "Anti-Monopoly Committee" },
		kk: { name: "Баға мен сапаны бақылауға шағым", category: "Тұтынушыларды қорғау", org: "Монополияға қарсы комитет" },
		keywords: ["narx", "sifat", "qimmat", "overpriced", "expensive", "price control", "quality issue", "товар некачественный", "bad product", "food safety", "oziq-ovqat", "restaurant complaint", "do'kon shikoyat"]
	},

	// ── SAFETY & EMERGENCY ───────────────────────────────────────────────
	{
		id: 82,
		uz: { name: "Yong'in xavfsizligi sertifikati", category: "Xavfsizlik", org: "FVV (Favqulodda vaziyatlar)" },
		ru: { name: "Сертификат пожарной безопасности", category: "Безопасность", org: "МЧС" },
		en: { name: "Fire Safety Certificate", category: "Safety", org: "Emergency Situations Ministry" },
		kk: { name: "Өрт қауіпсіздігі сертификаты", category: "Қауіпсіздік", org: "ТЖМ" },
		keywords: ["yong'in", "xavfsizlik", "fire safety", "пожар", "безопасность", "МЧС", "fire certificate", "ruxsat", "binoga ruxsat", "building permit", "fire inspection", "sprinkler"]
	},
	{
		id: 83,
		uz: { name: "Favqulodda vaziyatda yordam chaqirish", category: "Xavfsizlik", org: "Tez tibbiy yordam" },
		ru: { name: "Вызов экстренной помощи", category: "Безопасность", org: "Скорая помощь" },
		en: { name: "Emergency Services Call", category: "Safety", org: "Emergency Services" },
		kk: { name: "Шұғыл жәрдем шақыру", category: "Қауіпсіздік", org: "Жедел жәрдем" },
		keywords: ["tez yordam", "favqulodda", "103", "ambulance", "emergency", "скорая", "тез ёрдам", "accident", "baxtsiz hodisa", "shoshilinch", "urgent help", "critical", "hospital emergency"]
	},

	// ── BANKING & FINANCE ────────────────────────────────────────────────
	{
		id: 84,
		uz: { name: "Bank hisobini ochish (yuridik shaxslar uchun)", category: "Moliya va bank", org: "Markaziy bank" },
		ru: { name: "Открытие банковского счёта (для юридических лиц)", category: "Финансы и банки", org: "Центральный банк" },
		en: { name: "Bank Account Opening (for Legal Entities)", category: "Finance and Banking", org: "Central Bank" },
		kk: { name: "Банктік шот ашу (заңды тұлғалар үшін)", category: "Қаржы және банк", org: "Орталық банк" },
		keywords: ["bank hisob", "bank account", "открыть счёт", "юридическое", "company account", "business bank", "банк", "хисоб", "открытие счёта", "tax account", "pul hisob"]
	},
	{
		id: 85,
		uz: { name: "Kreditga murojaat (iste'mol krediti)", category: "Moliya va bank", org: "Bank tizimi" },
		ru: { name: "Заявка на потребительский кредит", category: "Финансы и банки", org: "Банковская система" },
		en: { name: "Consumer Loan Application", category: "Finance and Banking", org: "Banking System" },
		kk: { name: "Тұтынушылық несие өтінімі", category: "Қаржы және банк", org: "Банк жүйесі" },
		keywords: ["kredit", "loan", "qarz", "пол кредит", "потребительский кредит", "consumer loan", "borrow money", "pul olish", "qarz olish", "bank loan", "bank krediti", "get loan", "installment"]
	},

	// ── PROPERTY TAX & FEES ──────────────────────────────────────────────
	{
		id: 86,
		uz: { name: "Mulk solig'ini to'lash", category: "Soliqlar", org: "Soliq qo'mitasi" },
		ru: { name: "Оплата налога на имущество", category: "Налоги", org: "Налоговый комитет" },
		en: { name: "Property Tax Payment", category: "Taxes", org: "Tax Committee" },
		kk: { name: "Мүлік салығын төлеу", category: "Салықтар", org: "Салық комитеті" },
		keywords: ["mulk solig'i", "property tax", "налог имущество", "yer solig'i", "land tax", "uy solig'i", "house tax", "estate tax", "солиқ", "pay property tax", "mulkka soliq"]
	},
	{
		id: 87,
		uz: { name: "Transport solig'ini to'lash", category: "Soliqlar", org: "Soliq qo'mitasi" },
		ru: { name: "Оплата транспортного налога", category: "Налоги", org: "Налоговый комитет" },
		en: { name: "Vehicle Tax Payment", category: "Taxes", org: "Tax Committee" },
		kk: { name: "Көлік салығын төлеу", category: "Салықтар", org: "Салық комитеті" },
		keywords: ["transport soliq", "vehicle tax", "машина solig'i", "car tax", "транспортный налог", "pay car tax", "avtomobil soliq", "налог машина"]
	},

	// ── DIASPORA & MIGRATION ─────────────────────────────────────────────
	{
		id: 88,
		uz: { name: "Chet eldagi o'zbekistonliklar uchun konsullik xizmati", category: "Tashqi ishlar", org: "Tashqi ishlar vazirligi" },
		ru: { name: "Консульские услуги для граждан за рубежом", category: "Внешние дела", org: "МИД" },
		en: { name: "Consular Services for Uzbeks Abroad", category: "Foreign Affairs", org: "Ministry of Foreign Affairs" },
		kk: { name: "Шетелдегі өзбекстандықтарға консулдық қызмет", category: "Сыртқы істер", org: "СІМ" },
		keywords: ["konsullik", "konsulat", "consulate", "abroad", "chet el", "embassy", "elchixona", "citizenship abroad", "pasport abroad", "xorijdagi o'zbek", "chetda yashayman", "консульство", "МИД", "overseas"]
	},
	{
		id: 89,
		uz: { name: "Ko'chib kelgan fuqarolarni ro'yxatdan o'tkazish", category: "Migratsiya", org: "IIV Migratsiya xizmati" },
		ru: { name: "Регистрация прибывших граждан (внутренняя миграция)", category: "Миграция", org: "МВД — Миграционная служба" },
		en: { name: "Internal Migrant Registration", category: "Migration", org: "Ministry of Interior — Migration Service" },
		kk: { name: "Ішкі мигранттарды тіркеу", category: "Миграция", org: "ІІМ — Миграция қызметі" },
		keywords: ["ko'chib", "boshqa shahar", "yangi manzil", "ko'ch", "move city", "internal migration", "moved to city", "boshqа joyga", "переехал", "переезд", "migration", "register new address", "manzil o'zgartirish"]
	},

	// ── ANTICORRUPTION & COMPLAINTS ──────────────────────────────────────
	{
		id: 90,
		uz: { name: "Korrupsiya faktlari haqida xabar berish", category: "Shikoyat va nazorat", org: "Antikorrupsiya agentligi" },
		ru: { name: "Сообщение о фактах коррупции", category: "Жалобы и контроль", org: "Агентство по борьбе с коррупцией" },
		en: { name: "Report Corruption", category: "Complaints and Oversight", org: "Anti-Corruption Agency" },
		kk: { name: "Сыбайлас жемқорлық фактілері туралы хабарлау", category: "Шағымдар және бақылау", org: "Сыбайлас жемқорлыққа қарсы агенттік" },
		keywords: ["korrupsiya", "pora", "bribe", "corruption", "report", "шикоят", "взятка", "коррупция", "anti corruption", "illegal", "qonunsiz", "noqonuniy", "pora berish", "hotline", "xabar berish"]
	},
	{
		id: 91,
		uz: { name: "Davlat organlari faoliyatiga shikoyat qilish", category: "Shikoyat va nazorat", org: "Ombudsman" },
		ru: { name: "Жалоба на действия государственных органов", category: "Жалобы и контроль", org: "Омбудсман" },
		en: { name: "Complaint Against Government Bodies", category: "Complaints and Oversight", org: "Ombudsman" },
		kk: { name: "Мемлекеттік органдар іс-әрекеттеріне шағым", category: "Шағымдар және бақылау", org: "Омбудсман" },
		keywords: ["shikoyat", "ombudsman", "complaint", "government complaint", "hukumat shikoyat", "жалоба", "омбудсман", "police complaint", "mansabdor shikoyat", "official complaint", "admin complaint"]
	},

	// ── ADDITIONAL COMMON SERVICES ────────────────────────────────────────
	{
		id: 92,
		uz: { name: "Davlat boji to'lash", category: "Moliya va bank", org: "Soliq qo'mitasi" },
		ru: { name: "Оплата государственной пошлины", category: "Финансы и банки", org: "Налоговый комитет" },
		en: { name: "State Fee Payment", category: "Finance and Banking", org: "Tax Committee" },
		kk: { name: "Мемлекеттік баж төлеу", category: "Қаржы және банк", org: "Салық комитеті" },
		keywords: ["davlat boji", "государственная пошлина", "state fee", "госпошлина", "to'lov", "fee payment", "pay fee", "notarius boji", "court fee", "register fee", "boj"]
	},
	{
		id: 93,
		uz: { name: "Milliy gvardiyaga murojaat (xavfsizlik)", category: "Xavfsizlik", org: "Milliy gvardiya" },
		ru: { name: "Обращение в Национальную гвардию", category: "Безопасность", org: "Национальная гвардия" },
		en: { name: "National Guard Appeal (Security)", category: "Safety", org: "National Guard" },
		kk: { name: "Ұлттық гвардияға жүгіну", category: "Қауіпсіздік", org: "Ұлттық гвардия" },
		keywords: ["milliy gvardiya", "xavfsizlik", "security", "national guard", "police", "militsiya", "protection", "protection request", "tahdid", "threat", "danger"]
	},
	{
		id: 94,
		uz: { name: "Uy-joy muammolari bo'yicha mahalla komissiyasi", category: "Mahalla va jamoat", org: "Mahalla va oila vazirligi" },
		ru: { name: "Комиссия махалли по жилищным вопросам", category: "Махалля и общество", org: "Министерство семьи и махалли" },
		en: { name: "Mahalla Commission for Housing Issues", category: "Mahalla and Community", org: "Ministry of Family and Mahalla" },
		kk: { name: "Тұрғын үй мәселелері бойынша махалла комиссиясы", category: "Махалла және қоғам", org: "Отбасы және махалла министрлігі" },
		keywords: ["mahalla", "qo'mitа", "uy-joy", "housing issue", "kvartira muammo", "neighbor", "qo'shni", "community", "jamoat", "mahalla yig'ilish", "local community", "neighborhood dispute"]
	},
	{
		id: 95,
		uz: { name: "Yoshlar dasturlari va stipendiyalar", category: "Yoshlar", org: "Yoshlar ishlari agentligi" },
		ru: { name: "Молодёжные программы и стипендии", category: "Молодёжь", org: "Агентство по делам молодёжи" },
		en: { name: "Youth Programs and Scholarships", category: "Youth", org: "Youth Affairs Agency" },
		kk: { name: "Жастар бағдарламалары мен стипендиялары", category: "Жастар", org: "Жастар істері агенттігі" },
		keywords: ["yosh", "yoshlar", "youth", "молодёжь", "программа", "стипендия", "grant", "fellowship", "yosh tadbirkor", "young entrepreneur", "startup", "startup grant", "internship", "stajirovka"]
	},
	{
		id: 96,
		uz: { name: "Sport ob'ektlaridan foydalanish va ro'yxatga olish", category: "Sport va jismoniy tarbiya", org: "Sport agentligi" },
		ru: { name: "Использование спортивных объектов и регистрация", category: "Спорт и физкультура", org: "Агентство спорта" },
		en: { name: "Sports Facilities Use and Registration", category: "Sports and Physical Education", org: "Sports Agency" },
		kk: { name: "Спорт нысандарын пайдалану және тіркеу", category: "Спорт және дене тәрбиесі", org: "Спорт агенттігі" },
		keywords: ["sport", "stadion", "gym", "fitness", "zal", "club", "sport club", "sportchilar", "athlete", "рекорд", "спортсмен", "register athlete", "sportchi ro'yxat", "federation"]
	},
	{
		id: 97,
		uz: { name: "Bozor va savdo markazlari uchun ruxsatnoma", category: "Iqtisodiyot va biznes", org: "Savdo vazirligi" },
		ru: { name: "Разрешение для рынков и торговых центров", category: "Экономика и бизнес", org: "Министерство торговли" },
		en: { name: "Market and Shopping Centre Permit", category: "Economy and Business", org: "Ministry of Trade" },
		kk: { name: "Базарлар мен сауда орталықтарына рұқсат", category: "Экономика және бизнес", org: "Сауда министрлігі" },
		keywords: ["bozor", "savdo", "market", "ruxsat", "trade permit", "магазин", "магазины", "shop permit", "bazaar", "торговля", "торговый", "selling permit", "do'kon ochish"]
	},
	{
		id: 98,
		uz: { name: "Radiofrekvens va telekommunikatsiya ruxsati", category: "Aloqa va pochta", org: "Radiofrequency agentligi" },
		ru: { name: "Разрешение на радиочастоты и телекоммуникации", category: "Связь и почта", org: "Агентство радиочастот" },
		en: { name: "Radio Frequency and Telecom License", category: "Communications and Post", org: "Radio Frequency Agency" },
		kk: { name: "Радиожиілік және телекоммуникация рұқсаты", category: "Байланыс және пошта", org: "Радиожиілік агенттігі" },
		keywords: ["radio", "frequency", "telecom", "TV", "television", "broadcast", "radiofrequency", "рация", "walkie talkie", "broadcasting permit", "license telecom", "media license"]
	},
	{
		id: 99,
		uz: { name: "Qurol-yarog'ga ruxsatnoma (ov miltiq va h.k.)", category: "Xavfsizlik", org: "IIV" },
		ru: { name: "Разрешение на оружие (охотничье ружьё и др.)", category: "Безопасность", org: "МВД" },
		en: { name: "Weapon Permit (Hunting Rifle etc.)", category: "Safety", org: "Ministry of Interior" },
		kk: { name: "Қаруға рұқсат (аң мылтығы және т.б.)", category: "Қауіпсіздік", org: "ІІМ" },
		keywords: ["qurol", "miltiq", "ov", "weapon", "gun", "rifle", "pistol", "hunting", "оружие", "ружьё", "охота", "qurol ruxsat", "gun permit", "firearm", "ov ruxsati"]
	},
	{
		id: 100,
		uz: { name: "Temir yo'l chipta va rezervasyon xizmati", category: "Transport", org: "O'zbekiston temir yo'llari" },
		ru: { name: "Железнодорожный билет и бронирование", category: "Транспорт", org: "Узбекистанские железные дороги" },
		en: { name: "Train Ticket and Reservation Service", category: "Transport", org: "Uzbekistan Railways" },
		kk: { name: "Теміржол билеті және брондау қызметі", category: "Көлік", org: "Өзбекстан теміржолдары" },
		keywords: ["temir yo'l", "poezd", "chipta", "train", "ticket", "rail", "reservasyon", "booking", "поезд", "билет", "бронь", "travel", "safar", "Afrosiyob", "express", "train ticket"]
	},
];