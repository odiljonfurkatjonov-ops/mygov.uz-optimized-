import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORY_ACCENTS = [
	{ keys: ['health', 'sog', 'здрав', 'tibb', 'денса'], color: 'var(--cat-health)', soft: 'rgba(16,185,129,0.15)' },
	{ keys: ['education', 'ta\'lim', 'образ', 'bilim'], color: 'var(--cat-education)', soft: 'rgba(139,92,246,0.15)' },
	{ keys: ['tax', 'soliq', 'налог', 'moliya', 'finance'], color: 'var(--cat-tax)', soft: 'rgba(245,158,11,0.15)' },
	{ keys: ['transport', 'транспорт', 'ko\'lik', 'авто'], color: 'var(--cat-transport)', soft: 'rgba(59,130,246,0.15)' },
	{ keys: ['housing', 'real estate', 'ko\'chmas', 'cadastre', 'kadastr', 'жиль'], color: 'var(--cat-housing)', soft: 'rgba(239,68,68,0.15)' },
	{ keys: ['labour', 'employment', 'mehnat', 'труд', 'band'], color: 'var(--cat-employment)', soft: 'rgba(6,182,212,0.15)' },
	{ keys: ['social', 'ijtimo', 'социал', 'пособ'], color: 'var(--cat-social)', soft: 'rgba(236,72,153,0.15)' },
	{ keys: ['justice', 'law', 'huquq', 'прав', 'adliya'], color: 'var(--cat-justice)', soft: 'rgba(99,102,241,0.15)' },
	{ keys: ['environment', 'eco', 'эколог', 'tabiat'], color: 'var(--cat-environment)', soft: 'rgba(34,197,94,0.15)' },
];

function getAccent(category) {
	const text = (category || '').toLowerCase();
	for (const item of CATEGORY_ACCENTS) {
		if (item.keys.some((key) => text.includes(key))) {
			return item;
		}
	}
	return { color: 'var(--cat-default)', soft: 'rgba(100,116,139,0.15)' };
}

function highlightText(text, query) {
	if (!query) return text;
	const words = query.split(/\s+/).filter((w) => w.length > 2);
	if (!words.length) return text;
	const regex = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
	const parts = text.split(regex);
	return parts.map((part, i) =>
		regex.test(part) ? (
			<mark key={i} className="rounded bg-[var(--color-primary-light)] px-0.5 text-[var(--color-primary-dark)]">
				{part}
			</mark>
		) : (
			part
		)
	);
}

export default function ServiceCard({ service, query, onClick, index }) {
	const { t } = useLanguage();
	const accent = getAccent(service.category);
	const isHighRelevance = service.score > 70;

	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: Math.min(index * 0.03, 0.35), duration: 0.25 }}
			onClick={onClick}
			className="group flex cursor-pointer flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-hover"
		>
			<div className="flex items-center justify-between">
				<div className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ backgroundColor: accent.soft, color: accent.color }}>
					<span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent.color }} />
					<span>{service.category}</span>
				</div>
				{isHighRelevance && (
					<div className="rounded-full bg-[var(--color-primary-light)] px-2 py-0.5 text-[10px] font-bold text-[var(--color-primary-dark)]">
						{service.matchPercent}% {t.match}
					</div>
				)}
			</div>

			<div className="flex-1">
				<h3 className="text-sm font-semibold leading-snug text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]">
					{highlightText(service.name, query)}
				</h3>
				<p className="mt-1 text-xs text-[var(--color-text-secondary)]">{service.org}</p>
			</div>

			<div className="flex items-center justify-between text-xs font-semibold text-[var(--color-primary)]">
				<span>{t.apply || 'Apply'}</span>
				<ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
			</div>
		</motion.div>
	);
}
