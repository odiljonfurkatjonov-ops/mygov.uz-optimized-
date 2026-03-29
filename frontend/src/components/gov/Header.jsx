import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import { X, Menu, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const LANGS = [
	{ code: 'uz', label: 'UZ' },
	{ code: 'ru', label: 'RU' },
	{ code: 'en', label: 'EN' },
	{ code: 'kk', label: 'KK' },
];

export default function Header({ query = '', setQuery, onSearch, onClear }) {
	const { lang, setLang } = useLanguage();
	const { navigateToLogin } = useAuth();
	const [drawerOpen, setDrawerOpen] = useState(false);


	return (
		<>
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] rounded-full bg-white px-4 py-2 text-xs font-semibold text-[var(--color-primary)] shadow-card"
			>
				Skip to main content
			</a>
			<header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md shadow-[var(--shadow-nav)]">
				<div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6">
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]">
								<span className="text-lg font-bold">M</span>
							</div>
							<div className="font-display text-[1.1rem] font-bold text-[var(--color-primary-dark)]">
								my.gov.uz
							</div>
						</div>


						<div className="hidden items-center gap-3 lg:flex">
							<div role="radiogroup" className="flex items-center gap-1 rounded-full bg-[var(--color-surface-alt)] p-1">
								{LANGS.map((item) => (
									<button
										key={item.code}
										type="button"
										role="radio"
										aria-checked={lang === item.code}
										onClick={() => setLang(item.code)}
										className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
											lang === item.code
												? 'bg-white text-[var(--color-primary-dark)] shadow-card'
												: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
										}`}
									>
										{item.label}
									</button>
								))}
							</div>
							<button
								onClick={() => navigateToLogin()}
								className="rounded-[var(--radius-sm)] border border-[var(--color-primary)] px-4 py-2 text-xs font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-white"
							>
								Sign In
							</button>
						</div>

						<button
							onClick={() => setDrawerOpen(true)}
							className="lg:hidden rounded-full border border-[var(--color-border)] p-2 text-[var(--color-text-primary)]"
							aria-label="Open menu"
						>
							<Menu className="h-5 w-5" />
						</button>
					</div>

				</div>
			</header>

			<AnimatePresence>
				{drawerOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 z-50 bg-black/30"
							onClick={() => setDrawerOpen(false)}
						/>
						<motion.aside
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ duration: 0.25 }}
							className="fixed right-0 top-0 z-50 h-full w-72 bg-white p-6 shadow-hover"
							role="dialog"
							aria-label="Navigation drawer"
						>
							<div className="flex items-center justify-between">
								<div className="font-display text-lg font-bold text-[var(--color-primary-dark)]">Menu</div>
								<button
									onClick={() => setDrawerOpen(false)}
									className="rounded-full p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
									aria-label="Close menu"
								>
									<X className="h-4 w-4" />
								</button>
							</div>

							<div className="mt-6 space-y-4">
								<div className="space-y-2">
									<p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Language</p>
									<div role="radiogroup" className="flex flex-wrap gap-2">
										{LANGS.map((item) => (
											<button
												key={item.code}
												type="button"
												role="radio"
												aria-checked={lang === item.code}
												onClick={() => setLang(item.code)}
												className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
													lang === item.code
														? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]'
														: 'border-[var(--color-border)] text-[var(--color-text-secondary)]'
												}`}
											>
												{item.label}
											</button>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Account</p>
									<button
										onClick={() => navigateToLogin()}
										className="flex w-full items-center justify-between rounded-[var(--radius-sm)] border border-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)]"
									>
										Sign In
										<ChevronRight className="h-4 w-4" />
									</button>
								</div>
							</div>
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
