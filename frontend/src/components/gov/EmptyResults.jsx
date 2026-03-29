import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { SearchX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmptyResults() {
	const { t } = useLanguage();
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="mx-auto mt-[var(--space-6)] max-w-md px-4 text-center"
		>
			<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-surface-alt)]">
				<SearchX className="h-7 w-7 text-[var(--color-text-secondary)]" />
			</div>
			<h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{t.noResults}</h3>
			<p className="mt-2 text-sm text-[var(--color-text-secondary)]">{t.tryDifferent}</p>
			<p className="mt-1 text-xs text-[var(--color-text-secondary)]">{t.emptyHint}</p>
		</motion.div>
	);
}
