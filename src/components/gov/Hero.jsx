import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Sparkles, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
	{ icon: '🏛️', value: '800+', labelKey: 'statServices' },
	{ icon: '⚡', value: '24/7', labelKey: 'statAccess' },
	{ icon: '🌐', value: '4', labelKey: 'statLangs' },
];

export default function Hero() {
	const { t } = useLanguage();

	return (
		<div className="relative overflow-hidden">
			{/* Subtle gradient bg */}
			<div className="absolute inset-0 bg-gradient-to-b from-accent/40 via-background to-background pointer-events-none" />

			<motion.div
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative text-center pt-10 sm:pt-14 pb-8 sm:pb-10 px-4"
			>
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.1 }}
					className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-1.5 mb-6 shadow-sm"
				>
					<Sparkles className="w-3.5 h-3.5 text-primary" />
					<span className="text-xs font-semibold text-foreground">{t.badge}</span>
				</motion.div>

				{/* Headline */}
				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-[1.12]">
					<span className="text-foreground">{t.heroTitle} </span>
					<span className="bg-gradient-to-r from-primary via-[hsl(217,55%,40%)] to-[hsl(217,55%,33%)] bg-clip-text text-transparent">
						{t.heroSpan}
					</span>
				</h1>

				{/* Subtext */}
				<p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-8">
					{t.heroSub}
				</p>

				{/* Stats row */}
				<div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
					{STATS.map(({ icon, value, labelKey }) => (
						<div key={labelKey} className="flex items-center gap-2">
							<span className="text-xl">{icon}</span>
							<div className="text-left">
								<div className="text-sm font-extrabold text-foreground leading-none">{value}</div>
								<div className="text-[10px] text-muted-foreground mt-0.5">{t[labelKey] || ''}</div>
							</div>
						</div>
					))}
				</div>
			</motion.div>
		</div>
	);
}