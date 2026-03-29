import React, { useRef, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Search, X, Mic, MicOff } from 'lucide-react';
import { HINTS } from '@/lib/translations';
import { motion } from 'framer-motion';

export default function SearchBar({ query, setQuery, onSearch, onClear }) {
	const { lang, t } = useLanguage();
	const [listening, setListening] = useState(false);
	const recRef = useRef(null);

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') onSearch();
	};

	const handleMic = () => {
		if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
		if (listening) {
			recRef.current?.stop();
			setListening(false);
			return;
		}
		const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
		const rec = new Rec();
		recRef.current = rec;
		rec.lang = lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : lang === 'kk' ? 'kk-KZ' : 'en-US';
		rec.interimResults = false;
		rec.onstart = () => setListening(true);
		rec.onend = () => setListening(false);
		rec.onresult = (e) => {
			const transcript = e.results[0][0].transcript;
			setQuery(transcript);
			setTimeout(() => onSearch(), 80);
		};
		rec.start();
	};

	const hints = HINTS[lang] || HINTS.uz;

	return (
		<div className="w-full">
			<label htmlFor="hero-search" className="sr-only">
				Search services
			</label>
			<div className="relative">
				<div
					className={`flex items-center gap-2 rounded-[var(--radius-lg)] border bg-white px-4 py-3 shadow-card transition-all focus-within:shadow-[0_0_0_3px_rgba(29,78,216,0.15)] focus-within:border-[var(--color-border-focus)] ${
						listening ? 'border-red-300' : 'border-[var(--color-border)]'
					}`}
				>
					<Search className="h-5 w-5 text-[var(--color-text-secondary)]" />
					<input
						id="hero-search"
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder={t.placeholder}
						className="flex-1 bg-transparent text-sm font-medium text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)] sm:text-base"
					/>
					{query && (
						<button
							onClick={onClear}
							className="rounded-full p-1 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
							aria-label="Clear"
						>
							<X className="h-4 w-4" />
						</button>
					)}
					<button
						onClick={handleMic}
						className={`rounded-full p-1 ${
							listening
								? 'bg-red-100 text-red-500'
								: 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]'
						}`}
						aria-label="Voice search"
					>
						{listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
					</button>
					<button
						onClick={onSearch}
						className="ml-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
					>
						{t.searchBtn}
					</button>
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className="mt-4 flex flex-wrap gap-2"
			>
				{hints.map((hint) => (
					<button
						key={hint}
						onClick={() => {
							setQuery(hint);
							setTimeout(() => onSearch(), 40);
						}}
						className="rounded-full bg-[var(--color-primary-light)] px-3 py-1.5 text-xs font-semibold text-[var(--color-primary-dark)] transition hover:bg-[var(--color-primary)] hover:text-white"
					>
						{hint}
					</button>
				))}
			</motion.div>
		</div>
	);
}
