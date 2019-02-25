import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-electron-language-detector'
import { reactI18nextModule } from 'react-i18next'

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(reactI18nextModule)
	.init({
		preload: ['en', 'de'],
		load: 'languageOnly',
		backend: {
			loadPath: 'locales/{{lng}}/{{ns}}.json'
		},
		fallbackLng: 'en',
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
