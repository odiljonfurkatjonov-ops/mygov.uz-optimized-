import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import { searchServices } from '@/lib/pythonSearch';
import { MASTER_SERVICES } from '@/data/index.js';

import Header from '@/components/gov/Header';
import Hero from '@/components/gov/Hero';
import SearchBar from '@/components/gov/SearchBar';
import Situations from '@/components/gov/Situations';
import Journey from '@/components/gov/Journey';
import ResultsArea from '@/components/gov/ResultsArea';
import ServiceModal from '@/components/gov/ServiceModal';
import EmptyResults from '@/components/gov/EmptyResults';
import ChatBot from '@/components/chat_bot';

const CATEGORY_META = [
	{ keys: ['health', 'sog', 'здрав', 'tibb', 'денса'], color: 'var(--cat-health)', soft: 'rgba(16,185,129,0.12)', icon: '🩺' },
	{ keys: ['education', "ta'lim", 'образ', 'bilim'], color: 'var(--cat-education)', soft: 'rgba(139,92,246,0.12)', icon: '🎓' },
	{ keys: ['tax', 'soliq', 'налог', 'moliya', 'finance'], color: 'var(--cat-tax)', soft: 'rgba(245,158,11,0.12)', icon: '💼' },
	{ keys: ['transport', 'транспорт', "ko'lik", 'авто'], color: 'var(--cat-transport)', soft: 'rgba(59,130,246,0.12)', icon: '🚗' },
	{ keys: ['housing', 'real estate', "ko'chmas", 'cadastre', 'kadastr', 'жиль'], color: 'var(--cat-housing)', soft: 'rgba(239,68,68,0.12)', icon: '🏠' },
	{ keys: ['labour', 'employment', 'mehnat', 'труд', 'band'], color: 'var(--cat-employment)', soft: 'rgba(6,182,212,0.12)', icon: '🧑‍💼' },
	{ keys: ['social', 'ijtimo', 'социал', 'пособ'], color: 'var(--cat-social)', soft: 'rgba(236,72,153,0.12)', icon: '🤝' },
	{ keys: ['justice', 'law', 'huquq', 'прав', 'adliya'], color: 'var(--cat-justice)', soft: 'rgba(99,102,241,0.12)', icon: '⚖️' },
	{ keys: ['environment', 'eco', 'эколог', 'tabiat'], color: 'var(--cat-environment)', soft: 'rgba(34,197,94,0.12)', icon: '🌿' },
];

const FOOTER_LINKS = {
	information: ['Privacy', 'Terms', 'FAQ', 'Statistics', 'Mission'],
	users: ['Individuals', 'Legal entities', 'Foreign citizens', 'Guides'],
};

function getLocalizedField(service, lang, field) {
	return service?.[lang]?.[field]
		|| service?.en?.[field]
		|| service?.uz?.[field]
		|| '';
}

function getCategoryMeta(category) {
	const text = (category || '').toLowerCase();
	for (const item of CATEGORY_META) {
		if (item.keys.some((key) => text.includes(key))) return item;
	}
	return { color: 'var(--cat-default)', soft: 'rgba(100,116,139,0.12)', icon: '📄' };
}

export default function Home() {
	const { lang } = useLanguage();
	const { user } = useAuth();
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [journeySteps, setJourneySteps] = useState([]);
	const [activeSituation, setActiveSituation] = useState(null);
	const [selectedService, setSelectedService] = useState(null);
	const [hasSearched, setHasSearched] = useState(false);
	const langRef = useRef(lang);
	const requestRef = useRef(0);

	useEffect(() => { langRef.current = lang; }, [lang]);

	useEffect(() => {
		if (query.trim() && hasSearched) {
			void runSearch(query, lang);
		}
	}, [lang]);

	const runSearch = async (q, forcedLang = langRef.current) => {
		const trimmed = q.trim();
		const requestId = ++requestRef.current;
		if (!trimmed) {
			setResults([]);
			setJourneySteps([]);
			setHasSearched(false);
			return;
		}

		const payload = await searchServices(trimmed, forcedLang);
		if (requestRef.current !== requestId) {
			return;
		}

		setResults(payload.results);
		setJourneySteps(payload.journeySteps);
		setHasSearched(true);
	};

	const handleSearch = async () => {
		await runSearch(query);
	};

	const handleClear = () => {
		requestRef.current += 1;
		setQuery('');
		setResults([]);
		setJourneySteps([]);
		setActiveSituation(null);
		setHasSearched(false);
	};

	const handleSituationSelect = (sit) => {
		setActiveSituation(sit.id);
		setQuery(sit.query);
		void runSearch(sit.query);
	};

	const handleJourneyStep = (step) => {
		setQuery(step);
		void runSearch(step);
	};

	const categoryCards = useMemo(() => {
		const map = new Map();
		for (const service of MASTER_SERVICES) {
			const category = getLocalizedField(service, lang, 'category');
			if (!category) continue;
			const name = getLocalizedField(service, lang, 'name');
			const entry = map.get(category) || { name: category, count: 0, samples: [] };
			entry.count += 1;
			if (entry.samples.length < 2 && name) {
				entry.samples.push(name);
			}
			map.set(category, entry);
		}
		return Array.from(map.values())
			.sort((a, b) => b.count - a.count)
			.slice(0, 12);
	}, [lang]);

	const userName = user?.name || user?.full_name || user?.email || 'Citizen';
	const userInitial = userName?.trim()?.[0]?.toUpperCase() || 'U';

	return (
		<div className="min-h-screen bg-[var(--color-bg)]">
			<ChatBot />
			<Header
				query={query}
				setQuery={setQuery}
				onSearch={handleSearch}
				onClear={handleClear}
			/>
			<main id="main">
				<Hero>
					<SearchBar
						query={query}
						setQuery={setQuery}
						onSearch={handleSearch}
						onClear={handleClear}
					/>
				</Hero>

				{user && (
					<section className="border-b border-[#BFDBFE] bg-[var(--color-primary-light)]">
						<div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-semibold">
									{userInitial}
								</div>
								<div>
									<p className="text-sm font-semibold text-[var(--color-primary-dark)]">Welcome back, {userName}</p>
									<p className="text-xs text-[var(--color-text-secondary)]">Your services in one place</p>
								</div>
							</div>
							<div className="flex flex-wrap gap-2">
								<button className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-primary)] shadow-card">
									2 Pending Applications
								</button>
								<button className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-primary)] shadow-card">
									1 Unread Notice
								</button>
							</div>
						</div>
					</section>
				)}

				<Situations activeSituation={activeSituation} onSelect={handleSituationSelect} />
				<Journey steps={journeySteps} onStepClick={handleJourneyStep} />

				{hasSearched && results.length === 0 && <EmptyResults />}

				<ResultsArea results={results} query={query} onServiceClick={setSelectedService} />

				<section className="mx-auto mt-[var(--space-6)] max-w-7xl px-4 sm:px-6">
					<div className="mb-4">
						<h2 className="font-display text-[1.75rem] font-semibold text-[var(--color-text-primary)]">All Services</h2>
						<p className="text-sm text-[var(--color-text-secondary)]">Browse by category</p>
					</div>
					<div className="grid gap-[var(--space-3)] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{categoryCards.map((category) => {
							const meta = getCategoryMeta(category.name);
							return (
								<article
									key={category.name}
									className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-[var(--space-3)] shadow-card transition hover:-translate-y-0.5 hover:bg-[#FAFBFF] hover:shadow-hover"
									style={{ borderLeftColor: meta.color, borderLeftWidth: '3px' }}
								>
									<div className="flex items-center gap-3">
										<div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)]" style={{ backgroundColor: meta.soft, color: meta.color }}>
											<span className="text-lg">{meta.icon}</span>
										</div>
										<div className="text-sm font-semibold text-[var(--color-text-primary)]">{category.name}</div>
									</div>
									<div className="mt-4 space-y-2">
										{category.samples.map((sample) => (
											<p key={sample} className="truncate text-[0.8125rem] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
												{sample}
											</p>
										))}
									</div>
									<button className="mt-4 text-xs font-semibold text-[var(--color-primary)]">
										View all {category.count} services →
									</button>
								</article>
							);
						})}
					</div>
				</section>

				<section className="mx-auto mt-[var(--space-6)] max-w-7xl px-4 sm:px-6">
					<div className="grid gap-6 rounded-[var(--radius-lg)] bg-[var(--color-primary-dark)] p-[var(--space-5)] text-white md:grid-cols-2">
						<div className="space-y-3">
							<div className="text-2xl">📄</div>
							<h3 className="text-lg font-semibold">Your Digital Documents</h3>
							<p className="text-sm text-white/80">Store and access verified documents anytime, anywhere.</p>
							<button className="rounded-[var(--radius-sm)] bg-white px-4 py-2 text-xs font-semibold text-[var(--color-primary-dark)]">
								Open Documents
							</button>
						</div>
						<div className="space-y-3">
							<div className="text-2xl">🔔</div>
							<h3 className="text-lg font-semibold">Smart Notifications</h3>
							<p className="text-sm text-white/80">Get alerts for deadlines, approvals, and status updates.</p>
							<button className="rounded-[var(--radius-sm)] border border-white px-4 py-2 text-xs font-semibold text-white">
								Manage Alerts
							</button>
						</div>
					</div>
				</section>
			</main>

			<footer className="mt-[var(--space-6)]">
				<div className="bg-[var(--color-primary-dark)] text-white">
					<div className="mx-auto grid max-w-7xl gap-8 px-4 py-[var(--space-6)] sm:px-6 md:grid-cols-4">
						<div className="space-y-3">
							<div className="font-display text-lg font-semibold">my.gov.uz</div>
							<p className="text-sm text-white/70">Trusted digital services for every citizen.</p>
							<div className="flex gap-3 text-lg">
								<span aria-label="Telegram">✈️</span>
								<span aria-label="Facebook">📘</span>
								<span aria-label="YouTube">▶️</span>
							</div>
						</div>
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.08em]">Information</p>
							<ul className="mt-3 space-y-2 text-sm text-white/70">
								{FOOTER_LINKS.information.map((item) => (
									<li key={item} className="transition hover:text-white">{item}</li>
								))}
							</ul>
						</div>
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.08em]">For Users</p>
							<ul className="mt-3 space-y-2 text-sm text-white/70">
								{FOOTER_LINKS.users.map((item) => (
									<li key={item} className="transition hover:text-white">{item}</li>
								))}
							</ul>
						</div>
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.08em]">Contact</p>
							<ul className="mt-3 space-y-2 text-sm text-white/70">
								<li><a href="tel:+998712345678">+998 (71) 234-56-78</a></li>
								<li><a href="tel:+998712345679">+998 (71) 234-56-79</a></li>
								<li className="transition hover:text-white">Feedback</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-[#1E40AF]">
						<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 sm:px-6 md:flex-row">
							<div className="flex items-center gap-3 text-xs text-white/70">
								<span>Partners:</span>
								<span className="rounded-full bg-white/10 px-2 py-1">GovTech</span>
								<span className="rounded-full bg-white/10 px-2 py-1">OneID</span>
							</div>
							<div className="flex items-center gap-2 text-xs text-white/70">
								<span>Content helpful?</span>
								<button className="rounded-full bg-white/10 px-2 py-1">👍</button>
								<button className="rounded-full bg-white/10 px-2 py-1">👎</button>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-[#111827] py-3">
					<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-xs text-white/70 sm:flex-row sm:px-6">
						<p>© {new Date().getFullYear()} my.gov.uz. All rights reserved.</p>
						<div className="flex items-center gap-2">
							<span>Powered by</span>
							<span className="rounded-full bg-white/10 px-2 py-1">GovTech</span>
						</div>
					</div>
				</div>
			</footer>

			<ServiceModal
				service={selectedService}
				open={!!selectedService}
				onClose={() => setSelectedService(null)}
			/>
		</div>
	);
}
