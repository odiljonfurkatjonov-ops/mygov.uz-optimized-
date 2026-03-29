import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { SITUATIONS } from '@/lib/translations';

const LABELS = {
	uz: { title: 'Eng ko‘p ishlatiladigan xizmatlar', browse: 'Barchasini ko‘rish', category: 'Mashhur' },
	ru: { title: 'Самые популярные услуги', browse: 'Смотреть все', category: 'Популярное' },
	en: { title: 'Most Used Services', browse: 'Browse all', category: 'Popular' },
	kk: { title: 'Kop qollaniladigan qızmetler', browse: 'Bárin kóriw', category: 'Mashhur' },
};

const ACCENTS = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4'];

export default function Situations({ activeSituation, onSelect }) {
	const { lang } = useLanguage();
	const text = LABELS[lang] || LABELS.en;

	return (
		<section className="mx-auto mt-[var(--space-5)] max-w-7xl px-4 sm:px-6">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="font-display text-[1.75rem] font-semibold text-[var(--color-text-primary)]">
					{text.title}
				</h2>
				<button className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">
					{text.browse} →
				</button>
			</div>
			<div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
				{SITUATIONS.map((sit, idx) => {
					const accent = ACCENTS[idx % ACCENTS.length];
					return (
						<button
							key={sit.id}
							onClick={() => onSelect(sit)}
							className={`relative h-[200px] w-[160px] flex-shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-white text-left shadow-card transition hover:-translate-y-1 hover:shadow-hover ${
								activeSituation === sit.id ? 'ring-2 ring-[var(--color-primary)]' : ''
							}`}
						>
							<div className="flex h-[52%] items-center justify-center" style={{ backgroundColor: `${accent}26` }}>
								<span className="text-4xl" style={{ color: accent }}>
									{sit.emoji}
								</span>
							</div>
							<div className="flex h-[48%] flex-col justify-between px-3 py-3">
								<div className="text-sm font-semibold text-[var(--color-text-primary)] leading-snug">
									{sit[lang]}
								</div>
								<div className="text-[0.7rem] font-medium text-[var(--color-text-secondary)]">
									{text.category}
								</div>
							</div>
						</button>
					);
				})}
			</div>
		</section>
	);
}
