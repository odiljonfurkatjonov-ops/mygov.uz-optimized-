import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Bot, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from './ServiceCard';

export default function ResultsArea({ results, query, onServiceClick }) {
	const { t } = useLanguage();
	const [activeCategory, setActiveCategory] = useState(null);
	const [viewMode, setViewMode] = useState('grid');

	useMemo(() => setActiveCategory(null), [results]);

	const categories = useMemo(() => [...new Set(results.map(s => s.category))], [results]);
	const filtered = activeCategory ? results.filter(s => s.category === activeCategory) : results;

	if (results.length === 0) return null;

	return (
		<motion.section
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			className="mx-auto mt-[var(--space-5)] max-w-7xl px-4 pb-[var(--space-6)] sm:px-6"
		>
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					<div>
						<div className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
							{filtered.length}
						</div>
						<div className="text-sm text-[var(--color-text-secondary)]">{t.resultLabel}</div>
					</div>
					<div className="hidden items-center gap-2 rounded-full bg-[var(--color-primary-light)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)] sm:flex">
						<Bot className="h-3.5 w-3.5" />
						<span>AI Smart Search</span>
					</div>
				</div>
				<div className="flex items-center gap-1 rounded-full bg-[var(--color-surface-alt)] p-1">
					<button
						onClick={() => setViewMode('grid')}
						className={`rounded-full p-2 transition ${viewMode === 'grid'
							? 'bg-white text-[var(--color-text-primary)] shadow-card'
							: 'text-[var(--color-text-secondary)]'
						}`}
					>
						<LayoutGrid className="h-4 w-4" />
					</button>
					<button
						onClick={() => setViewMode('list')}
						className={`rounded-full p-2 transition ${viewMode === 'list'
							? 'bg-white text-[var(--color-text-primary)] shadow-card'
							: 'text-[var(--color-text-secondary)]'
						}`}
					>
						<List className="h-4 w-4" />
					</button>
				</div>
			</div>

			<div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
				<button
					onClick={() => setActiveCategory(null)}
					className={`flex-shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
						!activeCategory
							? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
							: 'border-[var(--color-border)] text-[var(--color-text-secondary)]'
					}`}
				>
					{t.all} · {results.length}
				</button>
				{categories.map(cat => {
					const count = results.filter(s => s.category === cat).length;
					return (
						<button
							key={cat}
							onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
							className={`flex-shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
								activeCategory === cat
									? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
									: 'border-[var(--color-border)] text-[var(--color-text-secondary)]'
							}`}
						>
							{cat} · {count}
						</button>
					);
				})}
			</div>

			<AnimatePresence mode="wait">
				<motion.div
					key={`${activeCategory}-${viewMode}`}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.15 }}
					className={
						viewMode === 'grid'
							? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
							: 'flex flex-col gap-3'
					}
				>
					{filtered.map((service, i) => (
						<ServiceCard
							key={service.id}
							service={service}
							query={query}
							index={i}
							onClick={() => onServiceClick(service)}
						/>
					))}
				</motion.div>
			</AnimatePresence>
		</motion.section>
	);
}
