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
			className="max-w-md mx-auto px-4 mt-16 mb-8 text-center"
		>
			<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
				<SearchX className="w-7 h-7 text-muted-foreground" />
			</div>
			<h3 className="text-lg font-bold text-foreground mb-2">{t.noResults}</h3>
			<p className="text-sm text-muted-foreground">{t.tryDifferent}</p>
			<p className="text-xs text-muted-foreground/70 mt-1">{t.emptyHint}</p>
		</motion.div>
	);
}