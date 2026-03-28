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
		<div className="max-w-2xl mx-auto px-4">
			{/* Search input */}
			<div className={`bg-white rounded-2xl border flex items-center gap-2 shadow-md transition-all duration-200
                      focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary
                      ${listening ? 'border-red-400 ring-2 ring-red-200' : 'border-border'}`}>
				<Search className="w-4.5 h-4.5 text-muted-foreground flex-shrink-0 ml-4" />
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={t.placeholder}
					className="flex-1 py-3.5 sm:py-4 bg-transparent outline-none text-sm sm:text-base font-medium placeholder:text-muted-foreground/50 min-w-0"
				/>
				<div className="flex items-center gap-1 pr-1.5">
					{query && (
						<button
							onClick={onClear}
							className="p-2 hover:bg-muted rounded-xl transition-colors"
							aria-label="Clear"
						>
							<X className="w-4 h-4 text-muted-foreground" />
						</button>
					)}
					<button
						onClick={handleMic}
						className={`p-2 rounded-xl transition-colors ${listening ? 'bg-red-100 text-red-500' : 'hover:bg-muted text-muted-foreground'}`}
						aria-label="Voice search"
					>
						{listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
					</button>
					<button
						onClick={onSearch}
						className="bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground 
                       px-4 sm:px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm"
					>
						<span className="hidden sm:inline">{t.searchBtn}</span>
						<Search className="w-4 h-4 sm:hidden" />
					</button>
				</div>
			</div>

			{/* Quick hints */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.25 }}
				className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4"
			>
				{hints.map((hint) => (
					<button
						key={hint}
						onClick={() => { setQuery(hint); setTimeout(() => onSearch(), 40); }}
						className="bg-white border border-border rounded-xl px-3 py-1.5 text-[11px] sm:text-xs 
                       font-medium text-muted-foreground hover:bg-muted hover:border-primary/30 
                       hover:text-foreground transition-all active:scale-95"
					>
						{hint}
					</button>
				))}
			</motion.div>
		</div>
	);
}