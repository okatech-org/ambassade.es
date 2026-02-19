import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

i18n.use(initReactI18next).init({
	resources: {
		fr: { translation: fr },
		en: { translation: en },
	},
	// Keep first SSR and first client render aligned to prevent hydration mismatch.
	lng: "fr",
	fallbackLng: "fr",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
