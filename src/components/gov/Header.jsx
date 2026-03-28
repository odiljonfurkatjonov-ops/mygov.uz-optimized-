import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { ChevronDown, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LANGS = [
	{ code: 'uz', label: 'UZ' },
	{ code: 'ru', label: 'RU' },
	{ code: 'en', label: 'EN' },
	{ code: 'kk', label: 'ҚР' },
];

export default function Header() {
	const { lang, setLang, t } = useLanguage();
	const [showProfile, setShowProfile] = useState(false);

	return (
		<>
			<header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6">
					<div className="flex items-center justify-between h-16 sm:h-[70px]">
						{/* Logo */}
						<div className="text-xl sm:text-2xl font-extrabold tracking-tight">
							<span className="bg-gradient-to-br from-[hsl(216,56%,22%)] to-[hsl(217,55%,33%)] bg-clip-text text-transparent">my</span>
							<span className="text-primary">.gov.uz</span>
						</div>

						{/* Language Switcher */}
						<div className="hidden sm:flex items-center gap-1 bg-muted p-1 rounded-full">
							{LANGS.map(l => (
								<button
									key={l.code}
									onClick={() => setLang(l.code)}
									className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${lang === l.code
											? 'bg-white text-primary shadow-sm'
											: 'text-muted-foreground hover:text-foreground'
										}`}
								>
									{l.label}
								</button>
							))}
						</div>

						{/* Profile + Mobile Lang */}
						<div className="flex items-center gap-2">
							{/* Mobile lang */}
							<div className="sm:hidden flex items-center gap-0.5 bg-muted p-0.5 rounded-full">
								{LANGS.map(l => (
									<button
										key={l.code}
										onClick={() => setLang(l.code)}
										className={`px-2 py-1 rounded-full text-[10px] font-semibold transition-all ${lang === l.code
												? 'bg-white text-primary shadow-sm'
												: 'text-muted-foreground'
											}`}
									>
										{l.label}
									</button>
								))}
							</div>

							<button
								onClick={() => setShowProfile(!showProfile)}
								className="flex items-center gap-2 bg-muted/60 hover:bg-muted px-2 sm:px-3 py-1.5 rounded-full border border-border transition-colors"
							>
								<div className="w-8 h-8 bg-gradient-to-br from-primary to-[hsl(217,55%,33%)] rounded-full flex items-center justify-center text-white text-xs font-bold">
									AT
								</div>
								<span className="text-sm font-medium hidden sm:block">{t.profileName}</span>
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Profile Panel */}
			<AnimatePresence>
				{showProfile && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className="max-w-7xl mx-auto px-4 sm:px-6"
					>
						<div className="mt-3 bg-white rounded-3xl border border-border p-5 sm:p-6 shadow-lg shadow-black/5">
							<div className="flex items-start justify-between">
								<div>
									<div className="flex items-center gap-3 mb-2">
										<div className="w-10 h-10 bg-gradient-to-br from-primary to-[hsl(217,55%,33%)] rounded-full flex items-center justify-center text-white font-bold">
											AT
										</div>
										<div>
											<p className="font-bold text-foreground">{t.profileFull}</p>
											<p className="text-xs text-muted-foreground">{t.profileId}</p>
										</div>
									</div>
									<div className="flex flex-wrap gap-2 mt-3">
										{['✅ One ID', '🏠 Toshkent', '📱 +998901234567'].map(badge => (
											<span key={badge} className="bg-muted rounded-full px-3 py-1 text-xs font-medium text-muted-foreground">
												{badge}
											</span>
										))}
									</div>
								</div>
								<button onClick={() => setShowProfile(false)} className="p-1.5 hover:bg-muted rounded-full transition-colors">
									<X className="w-4 h-4 text-muted-foreground" />
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}