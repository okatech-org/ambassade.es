import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import fr from './locales/fr.json'
import en from './locales/en.json'

const isServer = typeof window === 'undefined'

// Only use browser-based language detector on client
if (!isServer) {
  i18n.use(LanguageDetector)
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    // Force French on server to match client default and avoid hydration mismatch
    lng: isServer ? 'fr' : undefined,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false, 
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n
