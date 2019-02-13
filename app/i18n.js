import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import { reactI18nextModule } from 'react-i18next'

i18n
	.use(Backend)
	.use(reactI18nextModule)
	.init({
		backend: {
			loadPath: 'locales/{{lng}}/{{ns}}.json'
		},
		fallbackLng: 'en',
		debug: true,

		interpolation: {
			escapeValue: false
		},

		react: {
			wait: true
		}
	})

export default i18n
