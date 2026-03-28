import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORY_META = {
	'Oila': { icon: '👶', color: 'bg-pink-50 text-pink-700 border-pink-200' },
	'Семья': { icon: '👶', color: 'bg-pink-50 text-pink-700 border-pink-200' },
	'Family': { icon: '👶', color: 'bg-pink-50 text-pink-700 border-pink-200' },
	'Отбасы': { icon: '👶', color: 'bg-pink-50 text-pink-700 border-pink-200' },
	'Pensiya': { icon: '👴', color: 'bg-amber-50 text-amber-700 border-amber-200' },
	'Пенсия': { icon: '👴', color: 'bg-amber-50 text-amber-700 border-amber-200' },
	'Pension': { icon: '👴', color: 'bg-amber-50 text-amber-700 border-amber-200' },
	'Зейнетақы': { icon: '👴', color: 'bg-amber-50 text-amber-700 border-amber-200' },
	'Transport': { icon: '🚗', color: 'bg-sky-50 text-sky-700 border-sky-200' },
	'Транспорт': { icon: '🚗', color: 'bg-sky-50 text-sky-700 border-sky-200' },
	'Көлік': { icon: '🚗', color: 'bg-sky-50 text-sky-700 border-sky-200' },
	"Ta'lim": { icon: '🎓', color: 'bg-violet-50 text-violet-700 border-violet-200' },
	'Образование': { icon: '🎓', color: 'bg-violet-50 text-violet-700 border-violet-200' },
	'Education': { icon: '🎓', color: 'bg-violet-50 text-violet-700 border-violet-200' },
	'Білім': { icon: '🎓', color: 'bg-violet-50 text-violet-700 border-violet-200' },
	'Soliq': { icon: '📊', color: 'bg-orange-50 text-orange-700 border-orange-200' },
	'Налог': { icon: '📊', color: 'bg-orange-50 text-orange-700 border-orange-200' },
	'Tax': { icon: '📊', color: 'bg-orange-50 text-orange-700 border-orange-200' },
	'Салық': { icon: '📊', color: 'bg-orange-50 text-orange-700 border-orange-200' },
	"Ko'chmas": { icon: '🏠', color: 'bg-teal-50 text-teal-700 border-teal-200' },
	'Недвижим': { icon: '🏠', color: 'bg-teal-50 text-teal-700 border-teal-200' },
	'Real Estate': { icon: '🏠', color: 'bg-teal-50 text-teal-700 border-teal-200' },
	'Жылжымайт': { icon: '🏠', color: 'bg-teal-50 text-teal-700 border-teal-200' },
	'Mehnat': { icon: '💼', color: 'bg-slate-50 text-slate-700 border-slate-200' },
	'Труд': { icon: '💼', color: 'bg-slate-50 text-slate-700 border-slate-200' },
	'Labour': { icon: '💼', color: 'bg-slate-50 text-slate-700 border-slate-200' },
	"Sog'liq": { icon: '🏥', color: 'bg-green-50 text-green-700 border-green-200' },
	'Здравоохр': { icon: '🏥', color: 'bg-green-50 text-green-700 border-green-200' },
	'Healthcare': { icon: '🏥', color: 'bg-green-50 text-green-700 border-green-200' },
	'Денсаулық': { icon: '🏥', color: 'bg-green-50 text-green-700 border-green-200' },
	'Fuqarolik': { icon: '🪪', color: 'bg-blue-50 text-blue-700 border-blue-200' },
	'Гражданство': { icon: '🪪', color: 'bg-blue-50 text-blue-700 border-blue-200' },
	'Citizenship': { icon: '🪪', color: 'bg-blue-50 text-blue-700 border-blue-200' },
	'Kommunal': { icon: '🔌', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
	'Коммунал': { icon: '🔌', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
	'Utilities': { icon: '🔌', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
	'Ijtimoiy': { icon: '🤝', color: 'bg-rose-50 text-rose-700 border-rose-200' },
	'Социальная': { icon: '🤝', color: 'bg-rose-50 text-rose-700 border-rose-200' },
	'Social': { icon: '🤝', color: 'bg-rose-50 text-rose-700 border-rose-200' },
	'Subsidiya': { icon: '💰', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
	'Субсидия': { icon: '💰', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
	'Subsidy': { icon: '💰', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
	'Iqtisodiyot': { icon: '📈', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
	'Экономика': { icon: '📈', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
	'Economy': { icon: '📈', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
	'Huquq': { icon: '⚖️', color: 'bg-neutral-50 text-neutral-700 border-neutral-200' },
	'Право': { icon: '⚖️', color: 'bg-neutral-50 text-neutral-700 border-neutral-200' },
	'Law': { icon: '⚖️', color: 'bg-neutral-50 text-neutral-700 border-neutral-200' },
	'Қүқық': { icon: '⚖️', color: 'bg-neutral-50 text-neutral-700 border-neutral-200' },
	'Mudofaa': { icon: '🛡️', color: 'bg-slate-100 text-slate-700 border-slate-300' },
	'Оборона': { icon: '🛡️', color: 'bg-slate-100 text-slate-700 border-slate-300' },
	'Defence': { icon: '🛡️', color: 'bg-slate-100 text-slate-700 border-slate-300' },
	'Ekologiya': { icon: '🌿', color: 'bg-lime-50 text-lime-700 border-lime-200' },
	'Экология': { icon: '🌿', color: 'bg-lime-50 text-lime-700 border-lime-200' },
	'Ecology': { icon: '🌿', color: 'bg-lime-50 text-lime-700 border-lime-200' },
	'Qishloq': { icon: '🌾', color: 'bg-lime-50 text-lime-700 border-lime-200' },
	'Сельское': { icon: '🌾', color: 'bg-lime-50 text-lime-700 border-lime-200' },
	'Agriculture': { icon: '🌾', color: 'bg-lime-50 text-lime-700 border-lime-200' },
	'Raqamli': { icon: '💻', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
	'Цифров': { icon: '💻', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
	'Digital': { icon: '💻', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
	'Savdo': { icon: '🚢', color: 'bg-blue-50 text-blue-700 border-blue-200' },
	'Торговля': { icon: '🚢', color: 'bg-blue-50 text-blue-700 border-blue-200' },
	'Trade': { icon: '🚢', color: 'bg-blue-50 text-blue-700 border-blue-200' },
	'Moliya': { icon: '💳', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
	'Финансы': { icon: '💳', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
	'Finance': { icon: '💳', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
	'Din': { icon: '🕌', color: 'bg-amber-50 text-amber-700 border-amber-200' },
	'Религ': { icon: '🕌', color: 'bg-amber-50 text-amber-700 border-amber-200' },
	'Religious': { icon: '🕌', color: 'bg-amber-50 text-amber-700 border-amber-200' },
	'Aloqa': { icon: '📡', color: 'bg-sky-50 text-sky-700 border-sky-200' },
	'Связь': { icon: '📡', color: 'bg-sky-50 text-sky-700 border-sky-200' },
	'Communications': { icon: '📡', color: 'bg-sky-50 text-sky-700 border-sky-200' },
	'Xavfsizlik': { icon: '🔒', color: 'bg-red-50 text-red-700 border-red-200' },
	'Безопасность': { icon: '🔒', color: 'bg-red-50 text-red-700 border-red-200' },
	'Safety': { icon: '🔒', color: 'bg-red-50 text-red-700 border-red-200' },
	'Iste\'mol': { icon: '🛒', color: 'bg-orange-50 text-orange-700 border-orange-200' },
	'Защита': { icon: '🛒', color: 'bg-orange-50 text-orange-700 border-orange-200' },
	'Consumer': { icon: '🛒', color: 'bg-orange-50 text-orange-700 border-orange-200' },
	'Shikoyat': { icon: '📋', color: 'bg-red-50 text-red-700 border-red-200' },
	'Жалоб': { icon: '📋', color: 'bg-red-50 text-red-700 border-red-200' },
	'Complaints': { icon: '📋', color: 'bg-red-50 text-red-700 border-red-200' },
	'Tashqi': { icon: '🌍', color: 'bg-blue-50 text-blue-700 border-blue-200' },
	'Внешние': { icon: '🌍', color: 'bg-blue-50 text-blue-700 border-blue-200' },
	'Foreign': { icon: '🌍', color: 'bg-blue-50 text-blue-700 border-blue-200' },
	'Migratsiya': { icon: '✈️', color: 'bg-violet-50 text-violet-700 border-violet-200' },
	'Миграция': { icon: '✈️', color: 'bg-violet-50 text-violet-700 border-violet-200' },
	'Migration': { icon: '✈️', color: 'bg-violet-50 text-violet-700 border-violet-200' },
	'Madaniyat': { icon: '🎭', color: 'bg-purple-50 text-purple-700 border-purple-200' },
	'Культура': { icon: '🎭', color: 'bg-purple-50 text-purple-700 border-purple-200' },
	'Culture': { icon: '🎭', color: 'bg-purple-50 text-purple-700 border-purple-200' },
	'Yoshlar': { icon: '🎯', color: 'bg-pink-50 text-pink-700 border-pink-200' },
	'Молодёжь': { icon: '🎯', color: 'bg-pink-50 text-pink-700 border-pink-200' },
	'Youth': { icon: '🎯', color: 'bg-pink-50 text-pink-700 border-pink-200' },
	'Sport': { icon: '⚽', color: 'bg-green-50 text-green-700 border-green-200' },
	'Спорт': { icon: '⚽', color: 'bg-green-50 text-green-700 border-green-200' },
	'Sports': { icon: '⚽', color: 'bg-green-50 text-green-700 border-green-200' },
	'Mahalla': { icon: '🏘️', color: 'bg-teal-50 text-teal-700 border-teal-200' },
	'Махалля': { icon: '🏘️', color: 'bg-teal-50 text-teal-700 border-teal-200' },
	'Community': { icon: '🏘️', color: 'bg-teal-50 text-teal-700 border-teal-200' },
};

function getCategoryMeta(category) {
	if (!category) return { icon: '📄', color: 'bg-muted text-muted-foreground border-border' };
	for (const [key, meta] of Object.entries(CATEGORY_META)) {
		if (category.includes(key)) return meta;
	}
	return { icon: '📄', color: 'bg-muted text-muted-foreground border-border' };
}

function highlightText(text, query) {
	if (!query) return text;
	const words = query.split(/\s+/).filter(w => w.length > 2);
	if (!words.length) return text;
	const regex = new RegExp(`(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
	const parts = text.split(regex);
	return parts.map((part, i) =>
		regex.test(part) ? <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5 not-italic">{part}</mark> : part
	);
}

export default function ServiceCard({ service, query, onClick, index }) {
	const { t } = useLanguage();
	const meta = getCategoryMeta(service.category);
	const isHighRelevance = service.score > 70;

	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.28 }}
			onClick={onClick}
			className="group relative bg-white rounded-2xl border border-border/80 p-4 sm:p-5 cursor-pointer 
                 transition-all duration-200 hover:shadow-lg hover:shadow-primary/8 hover:-translate-y-0.5 
                 hover:border-primary/25 active:scale-[0.98] flex flex-col gap-3"
		>
			{/* Top row: icon + AI badge */}
			<div className="flex items-start justify-between gap-2">
				<div className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-semibold border ${meta.color}`}>
					<span>{meta.icon}</span>
					<span className="truncate max-w-[120px] sm:max-w-none">{service.category}</span>
				</div>
				{isHighRelevance && (
					<div className="flex items-center gap-1 bg-primary/10 rounded-full px-2 py-0.5 flex-shrink-0">
						<Sparkles className="w-2.5 h-2.5 text-primary" />
						<span className="text-[10px] font-bold text-primary">{service.matchPercent}%</span>
					</div>
				)}
			</div>

			{/* Service name */}
			<div className="flex-1">
				<h3 className="font-bold text-sm sm:text-[15px] text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
					{highlightText(service.name, query)}
				</h3>
				<p className="text-xs text-muted-foreground mt-1 font-medium">{service.org}</p>
			</div>

			{/* CTA arrow */}
			<div className="flex items-center justify-end">
				<div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors duration-200 font-medium">
					<span>{t.apply || 'Apply'}</span>
					<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
				</div>
			</div>
		</motion.div>
	);
}