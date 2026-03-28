import React, { createContext, useContext, useState } from 'react';
import { UI_TEXTS } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
	const [lang, setLang] = useState('uz');
	const t = UI_TEXTS[lang];

	return (
		<LanguageContext.Provider value={{ lang, setLang, t }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	return useContext(LanguageContext);
}