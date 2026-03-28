import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Route } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Journey({ steps, onStepClick }) {
	const { t } = useLanguage();
	if (!steps || steps.length === 0) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="max-w-7xl mx-auto px-4 sm:px-6 mt-5 sm:mt-6"
		>
			<div className="bg-gradient-to-br from-emerald-50 to-green-50/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-emerald-100">
				<div className="flex items-center gap-2 mb-4">
					<div className="w-7 h-7 bg-emerald-100 rounded-xl flex items-center justify-center">
						<Route className="w-3.5 h-3.5 text-emerald-600" />
					</div>
					<span className="font-bold text-emerald-900 text-sm">{t.journeyTitle}</span>
				</div>
				{/* Horizontal scroll on mobile, wrap on desktop */}
				<div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1 sm:flex-wrap">
					{steps.map((step, i) => (
						<button
							key={i}
							onClick={() => onStepClick(step)}
							className="flex-shrink-0 bg-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 
                         border border-emerald-200 hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5 
                         transition-all group text-left min-w-[130px] sm:min-w-0 active:scale-95"
						>
							<div className="text-[10px] font-bold text-emerald-500 mb-1">
								{String(i + 1).padStart(2, '0')}
							</div>
							<div className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-emerald-700 transition-colors leading-snug">
								{step}
							</div>
						</button>
					))}
				</div>
			</div>
		</motion.div>
	);
}