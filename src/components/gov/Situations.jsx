import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { SITUATIONS } from '@/lib/translations';
import { Lightbulb } from 'lucide-react';

export default function Situations({ activeSituation, onSelect }) {
	const { lang, t } = useLanguage();

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8">
			<div className="flex items-center gap-2 mb-3 sm:mb-4">
				<Lightbulb className="w-3.5 h-3.5 text-muted-foreground" />
				<span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-muted-foreground">
					{t.sitLabel}
				</span>
			</div>
			{/* Horizontal scroll on mobile */}
			<div className="flex gap-2 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1 sm:flex-wrap">
				{SITUATIONS.map((sit) => (
					<button
						key={sit.id}
						onClick={() => onSelect(sit)}
						className={`flex-shrink-0 flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold border 
                        transition-all duration-200 hover:shadow-md active:scale-95 whitespace-nowrap
                        ${activeSituation === sit.id
								? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/25'
								: 'bg-white border-border text-foreground hover:border-primary/40 hover:bg-accent/30'
							}`}
					>
						<span className="text-lg leading-none">{sit.emoji}</span>
						<span className="text-xs sm:text-sm">{sit[lang]}</span>
					</button>
				))}
			</div>
		</div>
	);
}