import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { crossLanguageSearch, getJourneySteps } from '@/lib/search';

import Header from '@/components/gov/Header';
import Hero from '@/components/gov/Hero';
import SearchBar from '@/components/gov/SearchBar';
import Situations from '@/components/gov/Situations';
import Journey from '@/components/gov/Journey';
import ResultsArea from '@/components/gov/ResultsArea';
import ServiceModal from '@/components/gov/ServiceModal';
import EmptyResults from '@/components/gov/EmptyResults';

export default function Home() {
	const { lang, t } = useLanguage();
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [journeySteps, setJourneySteps] = useState([]);
	const [activeSituation, setActiveSituation] = useState(null);
	const [selectedService, setSelectedService] = useState(null);
	const [hasSearched, setHasSearched] = useState(false);
	const langRef = useRef(lang);

	useEffect(() => { langRef.current = lang; }, [lang]);

	// Re-run search on language switch
	useEffect(() => {
		if (query.trim() && hasSearched) {
			setResults(crossLanguageSearch(query, lang));
			setJourneySteps(getJourneySteps(query, lang));
		}
	}, [lang]);

	const runSearch = (q) => {
		const trimmed = q.trim();
		if (!trimmed) {
			setResults([]);
			setJourneySteps([]);
			setHasSearched(false);
			return;
		}
		setResults(crossLanguageSearch(trimmed, langRef.current));
		setJourneySteps(getJourneySteps(trimmed, langRef.current));
		setHasSearched(true);
	};

	const handleSearch = () => runSearch(query);

	const handleClear = () => {
		setQuery('');
		setResults([]);
		setJourneySteps([]);
		setActiveSituation(null);
		setHasSearched(false);
	};

	const handleSituationSelect = (sit) => {
		setActiveSituation(sit.id);
		setQuery(sit.query);
		runSearch(sit.query);
	};

	const handleJourneyStep = (step) => {
		setQuery(step);
		runSearch(step);
	};

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<Hero />
			<SearchBar
				query={query}
				setQuery={setQuery}
				onSearch={handleSearch}
				onClear={handleClear}
			/>
			<Situations activeSituation={activeSituation} onSelect={handleSituationSelect} />
			<Journey steps={journeySteps} onStepClick={handleJourneyStep} />

			{hasSearched && results.length === 0 && <EmptyResults />}

			<ResultsArea
				results={results}
				query={query}
				onServiceClick={setSelectedService}
			/>

			<ServiceModal
				service={selectedService}
				open={!!selectedService}
				onClose={() => setSelectedService(null)}
			/>
		</div>
	);
}