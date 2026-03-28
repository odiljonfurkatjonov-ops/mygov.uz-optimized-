import { MASTER_SERVICES } from './services/index.js';

// ── Universal synonym / intent map ───────────────────────────────────────────
// Covers everyday language: "my son was born", "I'm sick", "lost my job", etc.
const INTENT_SYNONYMS = {
	baby: [
		'baby', 'bola', 'chaqaloq', 'yangi', 'рожд', 'birth', 'newborn', 'infant', 'kid', 'child',
		'туу', 'нәресте', "tug'il", 'tugil', 'son born', 'daughter born', 'had a baby',
		"o'g'il tug'ildi", "qiz tug'ildi", 'my son', 'my daughter', "o'g'il", 'qiz',
		'сын родился', 'дочь родилась', 'у меня ребёнок', 'родился', 'родилась',
	],
	child_reg: [
		'propiska', "ro'yxatdan", 'прописка', 'child registration', 'residency',
		'register child', 'registratsiya', 'register son', 'register daughter',
	],
	marriage: [
		'nikoh', 'uylan', 'turmush', "to'y", 'брак', 'свадьба', 'marry', 'wedding', 'wed', 'неке',
		'getting married', 'i got married', 'we got married', 'wife', 'husband', 'spouse',
	],
	divorce: [
		'ajralish', 'ajrim', 'divorce', 'развод', 'talaq', 'separated', 'разведён', 'ажырасу',
	],
	pension: [
		'pensiya', 'пенс', 'pension', 'retire', 'зейнет', 'qariy', 'nafaqa', 'qarilik',
		'old age', 'retired', 'reached retirement', 'ota pensiya', 'grandparent retire',
	],
	house: [
		'uy', 'дом', 'house', 'home', 'квартир', 'apartment', 'жил', 'property',
		'ipoteka', 'ипотека', 'mortgage', "ko'chmas", 'недвижим', 'bought house',
		'new home', 'move in', 'sotib oldim', 'uy oldim', 'ijara', 'rent', 'lease',
	],
	land: [
		'yer', 'land', 'plot', 'участок', 'земля', 'аренда', 'земельный', 'dехqon', 'dehqon',
		'farm land', 'yer ajratish', 'dala', 'bog', 'garden land', 'yer olish',
	],
	build: [
		'qurilish', 'build', 'строить', 'ruxsat qurish', 'build permit', 'construction',
		'uy qurish', 'building permit', 'qurishga ruxsat',
	],
	business: [
		'biznes', 'tadbirkor', 'ИП', 'IP', 'бизн', 'business', 'entrepreneur', 'company',
		'firm', 'ochish', 'start business', 'own business', 'self employed', 'freelance',
		"o'z ishim", 'work for myself', 'be my own boss', 'MChJ', 'LLC', 'ООО', 'tender',
		'davlat xarid', 'litsenziya', 'license', 'do\'kon ochish', 'bozor', 'market permit',
	],
	driver: [
		'haydov', 'права', 'водит', 'driver', 'license', 'driving', 'DL', 'машина',
		'car', 'vehicle', 'avto', 'get license', 'driving test', 'drive',
	],
	vehicle: [
		'mashina ro\'yxat', 'vehicle registration', 'car register', 'автомобиль регистрация',
		'tech passport', 'davlat raqami', 'number plate', 'texnik ko\'rik', 'TO', 'техосмотр', 'jarima', 'штраф', 'traffic fine',
	],
	tax: [
		'soliq', 'stir', 'инн', 'налог', 'tax', 'tin', 'fiscal', 'стир',
		'tax number', 'tax id', 'pay tax', 'owe tax', 'deklaratsiya', 'декларация',
		'mulk solig', 'property tax', 'transport solig', 'vehicle tax',
	],
	school: [
		'maktab', 'школ', 'school', 'enroll', 'sinf', 'class', "ta'lim", 'образован', 'учеб',
		'son school', 'daughter school', "o'g'il maktab", 'qiz maktab', 'kid school',
		'first grade', 'primary school', 'start school', 'attestat', 'diplom',
	],
	university: [
		'universitet', 'talaba', 'вуз', 'university', 'higher education', 'student', 'admission',
		'DTM', 'grant olish', 'o\'qishga kirish', 'grant', 'stipendiya', 'scholarship',
	],
	vocational: [
		'kasb', 'hunar', 'kurs', 'vocational', 'training', 'профессиональный', 'курсы',
		'техникум', 'college', 'kolledj', 'skill', 'kasbni o\'rganish', 'retraining',
	],
	kindergarten: [
		"bog'cha", 'детсад', 'садик', 'kindergarten', 'daycare', 'nursery', 'preschool',
		'son daycare', 'daughter daycare', "o'g'il bog'cha", "qiz bog'cha",
	],
	passport: [
		'pasport', 'паспорт', 'passport', 'id', 'удостов', 'hujjat', 'identity',
		'ID card', 'document', 'жеке куәлік', 'lost passport', 'new passport',
		'zagran', 'загранпаспорт', 'international passport', 'biometric',
	],
	citizenship: [
		'fuqarolik', 'citizenship', 'гражданство', 'naturalization', 'citizen',
		'viza', 'visa', 'foreigner', 'иностранец', 'chet ellik',
	],
	disability: [
		'nogiron', 'инвалид', 'disabled', 'disability', 'handicap', 'мүгедек',
		"can't work", 'injured', 'injury', 'special needs', 'chronic illness',
		'travma', 'mayib',
	],
	social: [
		'yordam', 'nafaqa', 'помощ', 'social', 'benefit', 'welfare', 'poor', "kambag'al",
		'малоимущ', 'no money', 'hard times', 'financial help', "pul yo'q", 'need help',
		'ko\'p bolali', 'многодетная', 'large family', 'yolg\'iz keksa', 'elderly alone',
	],
	utility: [
		'gaz', 'suv', 'elektr', 'газ', 'вода', 'электр', 'gas', 'water', 'electricity',
		'communal', 'коммун', 'light', 'heat', 'connect utilities', 'kommunal to\'lash',
		'utility payment', 'bill', 'hisob',
	],
	health: [
		'kasallik', 'kasal', 'davolash', 'shifoxona', 'poliklinika', 'shifokor',
		'tibbiy', "sog'liq", "sug'urta", 'больной', 'болезнь', 'лечение', 'врач',
		'медицина', 'hospital', 'sick', 'ill', 'doctor', 'health', 'medical', 'clinic',
		'health problem', 'health issue', 'not feeling well', 'got sick', 'feeling bad',
		'pain', 'hurt', 'treatment', 'medicine', 'dori', 'insurance', 'полис',
		'health card', 'OMS', "sog'liq muammo", 'tibbiy yordam', 'pregnancy', 'homilador',
		'maternity', 'mental health', 'psixolog', 'депрессия', 'stress',
		'my father sick', 'my mother sick', 'ota kasal', 'ona kasal', 'grandparent sick',
		'elderly health', 'parent health', 'family sick', 'bepul dori', 'free medicine',
	],
	work: [
		'mehnat', 'ish', 'работа', 'job', 'employment', 'труд', 'labor',
		'new job', 'yangi ish', 'first job', 'start working', 'ishga kirish',
		'work permit', 'job record', 'mehnat nizo', 'dispute', 'salary not paid',
	],
	unemployment: [
		'ishsiz', "ish yo'q", 'ishdan', 'безработ', 'уволен', 'unemployed', 'fired',
		'lost job', 'laid off', 'no job', 'no work', 'job loss', 'got fired',
	],
	abroad_work: [
		'xorij mehnat', 'abroad work', 'work abroad', 'chetda ishlash', 'трудовая миграция',
		'foreign employment', 'Russia', 'Korea', 'Qatar', 'migrant', 'migration',
	],
	death: [
		"o'lim", 'vafot', 'смерть', 'умер', 'death', 'deceased', 'died', 'passed away',
		"ota vafot", 'ona vafot', 'parent death', 'family death', 'inheritance', 'meros',
	],
	legal: [
		'sud', 'notarius', 'huquq', 'court', 'иск', 'нотариус', 'legal', 'law', 'advocate',
		'advokat', 'lawyer', 'complaint', 'shikoyat', 'meros', 'vasiyatnoma', 'will',
	],
	military: [
		'harbiy', 'armiya', 'военный', 'призыв', 'military', 'conscription', 'army',
		'soldier', 'askarga', 'armiyaga', 'chaqiriq', 'vojska', 'отсрочка', 'kechiktirish',
	],
	digital: [
		'ERI', 'EDS', 'elektron imzo', 'digital signature', 'ЭЦП', 'e-signature',
		'my.gov', 'portal', 'online', 'raqamli', 'цифровой', 'account', 'shaxsiy kabinet',
	],
	agriculture: [
		'fermer', 'qishloq', 'farm', 'farmer', 'dehqon', 'земля фермер', 'vet', 'veterinar',
		'chorva', 'livestock', 'hayvon', 'agricultural subsidy', 'qishloq subsidiya',
	],
	customs: [
		'bojxona', 'customs', 'import', 'eksport', 'export', 'tovar', 'товар', 'таможня',
		'parcel', 'package', 'clearance', 'bring goods', 'chet eldan tovar',
	],
	guardian: [
		'vasiylik', 'homiylik', 'opeka', 'guardian', 'trusteeship', 'orphan', 'yetim',
		'опека', 'усыновление', 'adoption', 'farzandlikka olish',
	],
	complaint: [
		'korrupsiya', 'pora', 'bribe', 'corruption', 'shikoyat', 'жалоба', 'омбудсман',
		'ombudsman', 'report', 'antikorrupsiya', 'consumer complaint', 'narx', 'quality',
	],
	banking: [
		'bank', 'kredit', 'loan', 'qarz', 'счёт', 'account', 'кредит', 'пол кредит',
		'borrow', 'pul olish', 'davlat boji', 'state fee', 'fee payment',
	],
	hajj: [
		'haj', 'umra', 'mecca', 'makka', 'hajj', 'pilgrimage', 'ziyorat', 'паломничество',
	],
	youth: [
		'yosh', 'yoshlar', 'youth', 'молодёжь', 'startup', 'grant yosh', 'young entrepreneur',
		'fellowship', 'internship', 'stajirovka', 'sport', 'stadion', 'gym', 'athlete',
	],
	migration: [
		"ko'chib", 'boshqa shahar', 'yangi manzil', 'move city', 'переехал', 'переезд',
		'migration', 'register new address', 'manzil o\'zgartirish', 'diaspora', 'konsulat', 'consulate',
	],
};

// ── Fuzzy helpers ─────────────────────────────────────────────────────────────
function tokenize(str) {
	return str.toLowerCase().trim().split(/[\s,;.!?+\-_'"]+/).filter(w => w.length > 1);
}

function editDistance(a, b) {
	if (Math.abs(a.length - b.length) > 3) return 99;
	const m = a.length, n = b.length;
	const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
	for (let j = 0; j <= n; j++) dp[0][j] = j;
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			dp[i][j] = a[i - 1] === b[j - 1]
				? dp[i - 1][j - 1]
				: 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
		}
	}
	return dp[m][n];
}

function fuzzyMatch(word, target) {
	if (target.includes(word)) return true;
	if (word.includes(target) && target.length > 3) return true;
	if (word.length >= 5 && editDistance(word, target) <= 1) return true;
	if (word.length >= 8 && editDistance(word, target) <= 2) return true;
	return false;
}

// ── Detect intents from all words + bigrams ───────────────────────────────────
function detectIntents(words, rawQuery) {
	const active = new Set();
	const q = rawQuery.toLowerCase();

	// Bigram/phrase matching on full query
	for (const [intent, patterns] of Object.entries(INTENT_SYNONYMS)) {
		for (const p of patterns) {
			if (p.includes(' ') && q.includes(p)) {
				active.add(intent);
			}
		}
	}

	// Single-word matching with fuzzy
	for (const [intent, patterns] of Object.entries(INTENT_SYNONYMS)) {
		for (const w of words) {
			if (patterns.some(p => !p.includes(' ') && (fuzzyMatch(w, p) || p.includes(w)))) {
				active.add(intent);
				break;
			}
		}
	}
	return active;
}

// ── Intent → service ids with scores ─────────────────────────────────────────
const INTENT_SERVICE_BOOST = {
	baby: { ids: [1, 7, 15, 10, 16, 24, 41], score: 75 },
	child_reg: { ids: [15, 1], score: 95 },
	marriage: { ids: [6, 11, 31], score: 92 },
	divorce: { ids: [26, 58, 61], score: 92 },
	pension: { ids: [3, 25, 50], score: 90 },
	house: { ids: [8, 4, 12, 36, 37, 38, 94], score: 78 },
	land: { ids: [36, 8, 64, 65], score: 85 },
	build: { ids: [37, 82], score: 88 },
	business: { ids: [5, 13, 17, 54, 55, 56, 57, 97], score: 82 },
	driver: { ids: [2, 34, 35], score: 92 },
	vehicle: { ids: [33, 34, 35, 2], score: 88 },
	tax: { ids: [9, 13, 55, 86, 87, 92], score: 82 },
	school: { ids: [10, 46], score: 88 },
	university: { ids: [44, 45, 95], score: 90 },
	vocational: { ids: [47, 95], score: 85 },
	kindergarten: { ids: [16], score: 92 },
	passport: { ids: [11, 29], score: 92 },
	citizenship: { ids: [30, 31, 32, 11, 88], score: 88 },
	disability: { ids: [14, 18, 20], score: 85 },
	social: { ids: [7, 20, 14, 48, 49], score: 72 },
	utility: { ids: [12, 39, 40], score: 88 },
	health: { ids: [18, 21, 22, 24, 25, 41, 42, 43], score: 88 },
	work: { ids: [17, 5, 23, 51, 52], score: 80 },
	unemployment: { ids: [23, 20], score: 90 },
	abroad_work: { ids: [53, 88], score: 88 },
	death: { ids: [19, 61, 92], score: 92 },
	legal: { ids: [58, 59, 60, 61, 92], score: 85 },
	military: { ids: [62, 63], score: 92 },
	digital: { ids: [73, 74, 75], score: 90 },
	agriculture: { ids: [64, 65, 66, 36], score: 85 },
	customs: { ids: [69, 70], score: 90 },
	guardian: { ids: [28, 7, 20], score: 88 },
	complaint: { ids: [90, 91, 80, 81], score: 88 },
	banking: { ids: [84, 85, 92], score: 82 },
	hajj: { ids: [77, 29], score: 95 },
	youth: { ids: [95, 44, 45, 47, 96], score: 82 },
	migration: { ids: [89, 88, 31], score: 85 },
};

// ── Main search ───────────────────────────────────────────────────────────────
export function crossLanguageSearch(query, targetLang) {
	if (!query || query.trim().length === 0) return [];

	const words = tokenize(query);
	const intents = detectIntents(words, query);

	const scored = MASTER_SERVICES.map(service => {
		let baseScore = 0;

		// Intent-based boost
		for (const [intent, boost] of Object.entries(INTENT_SERVICE_BOOST)) {
			if (intents.has(intent) && boost.ids.includes(service.id)) {
				baseScore = Math.max(baseScore, boost.score);
			}
		}

		// Keyword + name matching across all languages
		for (const lang of ['uz', 'ru', 'en', 'kk']) {
			const svcData = service[lang];
			if (!svcData) continue;
			const nameLower = svcData.name.toLowerCase();
			const catLower = svcData.category.toLowerCase();
			let langScore = 0;

			for (const word of words) {
				if (nameLower.includes(word)) langScore += 32;
				if (catLower.includes(word)) langScore += 20;
				for (const kw of service.keywords) {
					const kwLower = kw.toLowerCase();
					if (kwLower === word) langScore += 48;
					else if (kwLower.includes(word) || word.includes(kwLower)) langScore += 32;
					else if (word.length >= 4 && fuzzyMatch(word, kwLower)) langScore += 16;
				}
			}
			baseScore = Math.max(baseScore, langScore);
		}

		if (baseScore > 12) {
			const displayData = service[targetLang] || service.uz;
			return {
				id: service.id,
				name: displayData.name,
				category: displayData.category,
				org: displayData.org,
				score: baseScore,
				matchPercent: Math.min(99, Math.round(baseScore * 0.93)),
			};
		}
		return null;
	}).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 30);

	return scored;
}

// ── Journey steps ─────────────────────────────────────────────────────────────
export function getJourneySteps(query, lang) {
	const words = tokenize(query);
	const intents = detectIntents(words, query);

	if (intents.has('baby') || intents.has('child_reg')) {
		return ({
			uz: ["Tug'ilganlik guvohnomasi", "Bolani propiskaga qo'shish", "Bolalar nafaqasi", "Bepul tibbiy xizmat", "Bog'chaga yozish"],
			ru: ["Свидетельство о рождении", "Прописка ребёнка", "Детское пособие", "Бесплатная медпомощь", "Запись в детсад"],
			en: ["Birth Certificate", "Register Child Residence", "Child Allowance", "Free Medical Care", "Kindergarten Enrollment"],
			kk: ["Туу туралы куәлік", "Баланы тіркеу", "Балалар жәрдемақысы", "Тегін медициналық көмек", "Балабақшаға жазу"],
		}[lang]) || [];
	}
	if (intents.has('health')) {
		return ({
			uz: ["Tibbiy sug'urta olish", "Shifokorga yozilish", "Kasallik varaqasi rasmiylashtirish", "Dori-darmon imtiyozlari"],
			ru: ["Получить полис ОМС", "Записаться к врачу", "Оформить больничный лист", "Льготы на лекарства"],
			en: ["Get Health Insurance", "Book Doctor Appointment", "Get Sick Leave Certificate", "Medicine Benefits"],
			kk: ["ОМС полисін алу", "Дәрігерге жазылу", "Науқас парағын ресімдеу", "Дәрі-дәрмек жеңілдіктері"],
		}[lang]) || [];
	}
	if (intents.has('pension')) {
		return ({
			uz: ["Pensiya tayinlash arizasi", "Jamg'arma pensiya hisob-kitobi", "Tibbiy imtiyozlar", "Ijtimoiy nafaqa tekshirish"],
			ru: ["Подать заявку на пенсию", "Накопительная пенсия", "Медицинские льготы", "Проверить соцпособие"],
			en: ["Apply for Pension", "Fund Pension Calculation", "Healthcare Benefits", "Check Social Benefits"],
			kk: ["Зейнетақы өтінімі", "Жинақтаушы зейнетақы", "Медициналық жеңілдіктер", "Әлеуметтік жәрдемақы"],
		}[lang]) || [];
	}
	if (intents.has('house')) {
		return ({
			uz: ["Kadastr ma'lumotini tekshirish", "Ipoteka subsidiyasiga ariza", "Ko'chmas mulkni ro'yxatdan o'tkazish", "Kommunal xizmatlarga ulanish"],
			ru: ["Кадастровая справка", "Заявка на ипотечную субсидию", "Регистрация недвижимости", "Подключение коммунальных"],
			en: ["Cadastre Info", "Apply for Mortgage Subsidy", "Register Real Estate", "Connect Utilities"],
			kk: ["Кадастрлық анықтама", "Ипотека субсидиясы өтінімі", "Мүлікті тіркеу", "Коммуналдық қосылу"],
		}[lang]) || [];
	}
	if (intents.has('marriage')) {
		return ({
			uz: ["Nikohni qayd etish", "Pasport yangilash", "Propiskani o'zgartirish", "Bolalar nafaqasi"],
			ru: ["Зарегистрировать брак", "Обновить паспорт", "Изменить прописку", "Детское пособие"],
			en: ["Register Marriage", "Update Passport", "Update Residence", "Child Allowance"],
			kk: ["Некені тіркеу", "Паспортты жаңарту", "Тіркеуді өзгерту", "Балалар жәрдемақысы"],
		}[lang]) || [];
	}
	if (intents.has('business')) {
		return ({
			uz: ["Tadbirkorni ro'yxatdan o'tkazish", "STIR olish", "Mehnat shartnomasi", "Soliq hisoboti"],
			ru: ["Регистрация ИП", "Получить ИНН", "Трудовой договор", "Налоговая отчётность"],
			en: ["Register as Entrepreneur", "Get Tax ID", "Employment Contract", "Start Tax Reporting"],
			kk: ["ЖК тіркеу", "СТН алу", "Еңбек шарты", "Салық есептілігі"],
		}[lang]) || [];
	}
	if (intents.has('driver')) {
		return ({
			uz: ["Tibbiy ko'rikdan o'tish", "Haydovchilik guvohnomasi ariza", "Davlat to'lovini amalga oshirish", "Guvohnomani olish"],
			ru: ["Медосмотр", "Заявка на права", "Оплата госпошлины", "Получить удостоверение"],
			en: ["Medical Check", "Apply for Driver's License", "Pay State Fee", "Collect License"],
			kk: ["Медициналық тексеру", "Куәлікке өтінім", "Алымды төлеу", "Куәлікті алу"],
		}[lang]) || [];
	}
	if (intents.has('military')) {
		return ({
			uz: ["Harbiy ro'yxatga olish", "Tibbiy ko'rikdan o'tish", "Harbiy guvohnoma olish", "Kechiktirish arizasi"],
			ru: ["Воинский учёт", "Медосмотр", "Получить военный билет", "Заявка на отсрочку"],
			en: ["Military Registration", "Medical Examination", "Get Military ID", "Apply for Deferment"],
			kk: ["Әскери есепке алу", "Медициналық тексеру", "Әскери куәлік алу", "Кейінге қалдыру өтінімі"],
		}[lang]) || [];
	}
	if (intents.has('digital')) {
		return ({
			uz: ["My.gov.uz portalda ro'yxat", "ERI (elektron imzo) olish", "Onlayn xizmatlardan foydalanish"],
			ru: ["Регистрация на My.gov.uz", "Получение ЭЦП", "Использование онлайн-услуг"],
			en: ["Register on My.gov.uz", "Get Digital Signature", "Use Online Services"],
			kk: ["My.gov.uz порталына тіркелу", "ЭЦП алу", "Онлайн қызметтерді пайдалану"],
		}[lang]) || [];
	}
	if (intents.has('legal') || intents.has('death')) {
		return ({
			uz: ["O'lim guvohnomasi olish", "Notarius orqali meros rasmiylashtirish", "Bepul huquqiy maslahat"],
			ru: ["Получить свидетельство о смерти", "Нотариальное оформление наследства", "Бесплатная юридическая консультация"],
			en: ["Get Death Certificate", "Notarial Inheritance Processing", "Free Legal Advice"],
			kk: ["Қайтыс болу туралы куәлік алу", "Нотариалдық мұра ресімдеу", "Тегін заң кеңесі"],
		}[lang]) || [];
	}
	if (intents.has('agriculture')) {
		return ({
			uz: ["Fermer ro'yxatdan o'tkazish", "Yer uchastkasi olish", "Subsidiya arizasi", "Veterinariya sertifikati"],
			ru: ["Зарегистрировать ферму", "Получить земельный участок", "Заявка на субсидию", "Ветеринарный сертификат"],
			en: ["Register Farm", "Get Land Plot", "Apply for Subsidy", "Veterinary Certificate"],
			kk: ["Шаруашылықты тіркеу", "Жер учаскесін алу", "Субсидияға өтінім", "Ветеринариялық куәлік"],
		}[lang]) || [];
	}
	if (intents.has('university')) {
		return ({
			uz: ["DTM testiga ro'yxat", "Davlat granti arizasi", "Xorijda o'qish stipendiyasi", "Talabalar yotoqxonasi"],
			ru: ["Регистрация на ЕГЭ/тест", "Заявка на госгрант", "Стипендия за рубежом", "Студенческое общежитие"],
			en: ["Register for Entrance Exam", "Apply for State Grant", "Study Abroad Scholarship", "Student Dormitory"],
			kk: ["Емтиханға тіркелу", "Мемлекеттік грантқа өтінім", "Шетелде оқу стипендиясы", "Студенттер жатақханасы"],
		}[lang]) || [];
	}
	if (intents.has('unemployment') || intents.has('work')) {
		return ({
			uz: ["Bandlik markaziga murojaat", "Ishsizlik nafaqasi ariza", "Qayta tayyorlash kurslari", "Yangi ish topish"],
			ru: ["Обратиться в центр занятости", "Заявка на пособие по безработице", "Курсы переквалификации", "Поиск работы"],
			en: ["Contact Employment Center", "Apply for Unemployment Benefit", "Retraining Courses", "Job Search Support"],
			kk: ["Жұмыспен қамту орталығы", "Жұмыссыздық жәрдемақысы", "Қайта оқыту курстары", "Жұмыс іздеу"],
		}[lang]) || [];
	}
	return [];
}