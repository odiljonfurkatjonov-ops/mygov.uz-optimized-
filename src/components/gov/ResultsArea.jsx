import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Bot, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from './ServiceCard';

export default function ResultsArea({ results, query, onServiceClick }) {
	const { t } = useLanguage();
	const [activeCategory, setActiveCategory] = useState(null);
	const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

	// Reset filter when results change
	useMemo(() => setActiveCategory(null), [results]);

	const categories = useMemo(() => [...new Set(results.map(s => s.category))], [results]);
	const filtered = activeCategory ? results.filter(s => s.category === activeCategory) : results;

	if (results.length === 0) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pb-20"
		>
			{/* Header bar */}
			<div className="flex flex-wrap items-center justify-between gap-3 mb-5">
				<div className="flex items-center gap-3">
					<div className="flex items-baseline gap-1.5">
						<span className="text-2xl sm:text-3xl font-extrabold text-foreground tabular-nums">{filtered.length}</span>
						<span className="text-sm text-muted-foreground">{t.resultLabel}</span>
					</div>
					<div className="hidden sm:flex items-center gap-1.5 text-[11px] text-primary font-semibold bg-accent rounded-full px-3 py-1">
						<Bot className="w-3 h-3" />
						<span>AI Smart Search</span>
					</div>
				</div>
				{/* View toggle */}
				<div className="flex items-center gap-1 bg-muted p-1 rounded-xl">
					<button
						onClick={() => setViewMode('grid')}
						className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
					>
						<LayoutGrid className="w-4 h-4" />
					</button>
					<button
						onClick={() => setViewMode('list')}
						className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
					>
						<List className="w-4 h-4" />
					</button>
				</div>
			</div>

			{/* Category Filter — horizontal scroll on mobile */}
			<div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
				<button
					onClick={() => setActiveCategory(null)}
					className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all whitespace-nowrap ${!activeCategory
							? 'bg-foreground text-background border-foreground'
							: 'bg-white border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
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
							className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all whitespace-nowrap ${activeCategory === cat
									? 'bg-foreground text-background border-foreground'
									: 'bg-white border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
								}`}
						>
							{cat} · {count}
						</button>
					);
				})}
			</div>

			{/* Results grid / list */}
			<AnimatePresence mode="wait">
				<motion.div
					key={`${activeCategory}-${viewMode}`}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.15 }}
					className={
						viewMode === 'grid'
							? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'
							: 'flex flex-col gap-2'
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
		</motion.div>
	);
}