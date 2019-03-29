import i18n from 'i18next'
import { reactI18nextModule } from 'react-i18next'
import LanguageDetector from 'i18next-electron-language-detector'
import translationEN from './locales/en/translation.json'
import translationDE from './locales/de/translation.json'

const resources = {
	en: {
		translation: translationEN
	},
	de: {
		translation: translationDE
	}
}

i18n
	.use(LanguageDetector)
	.use(reactI18nextModule)
	.init({
		resources,
		load: 'languageOnly',
		debug: true,
		fallbackLng: 'de',
		whitelist: ['en',
			'en-US',
			'de',
			'de-DE'],
		interpolation: {
			escapeValue: false
		},
		react: {
			wait: true
		}
	})

export default i18n
