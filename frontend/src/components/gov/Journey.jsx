import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Route } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Journey({ steps, onStepClick }) {
	const { t } = useLanguage();
	if (!steps || steps.length === 0) return null;

	return (
		<motion.section
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="mx-auto mt-[var(--space-4)] max-w-7xl px-4 sm:px-6"
		>
			<div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-[var(--space-3)] shadow-card">
				<div className="flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-primary-light)]">
						<Route className="h-4 w-4 text-[var(--color-primary)]" />
					</div>
					<div>
						<p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">{t.journeyTitle}</p>
						<p className="text-sm text-[var(--color-text-secondary)]">Suggested sequence of services</p>
					</div>
				</div>
				<div className="mt-4 flex gap-3 overflow-x-auto pb-2 no-scrollbar sm:flex-wrap">
					{steps.map((step, i) => (
						<button
							key={i}
							onClick={() => onStepClick(step)}
							className="flex min-w-[160px] flex-shrink-0 flex-col gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-hover"
						>
							<span className="text-[10px] font-semibold text-[var(--color-text-secondary)]">STEP {i + 1}</span>
							<span className="text-sm font-semibold text-[var(--color-text-primary)] leading-snug">{step}</span>
						</button>
					))}
				</div>
			</div>
		</motion.section>
	);
}
