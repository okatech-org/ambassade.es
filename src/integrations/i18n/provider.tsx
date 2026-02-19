import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const SUPPORTED_LANGUAGES = new Set(["fr", "en"]);

function normalizeLanguage(language: string | null | undefined): "fr" | "en" {
	const shortCode = language?.toLowerCase().split("-")[0] ?? "fr";
	return SUPPORTED_LANGUAGES.has(shortCode) ? (shortCode as "fr" | "en") : "fr";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const handleLanguageChange = (language: string) => {
			const normalized = normalizeLanguage(language);
			document.documentElement.lang = normalized;
			window.localStorage.setItem("i18nextLng", normalized);
		};

		handleLanguageChange(i18n.language);
		i18n.on("languageChanged", handleLanguageChange);
		return () => {
			i18n.off("languageChanged", handleLanguageChange);
		};
	}, []);

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export default I18nProvider;
