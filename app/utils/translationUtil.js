import i18next from 'i18next'

const _ = require('lodash')

export const t = translate => i18next.t(translate)

export const resolveLabel = (current, translated) =>
	_.isNull(current) ? translated : current

const englishMenuLabels = {
	hide: 'Hide Marks',
	about: 'About Marks',
	others: 'Hide Others',
	quit: 'Quit',
	view: 'View',
	toggle: 'Toggle Full Screen',
	window: 'Window',
	mini: 'Minimize',
	front: 'Bring All to Front',
	help: 'Help',
	credits: 'Credits',
	report: 'Report an issue',
	propose: 'Propose a feature',
	buy: 'Buy me a coffee'
}
const germanMenuLabels = {
	hide: 'Ausblenden: Marks',
	about: 'Über Marks',
	others: 'Andere ausblenden',
	quit: 'Marks beenden',
	view: 'Ansicht',
	toggle: 'Vollbildmodus',
	window: 'Fenster',
	mini: 'Minimieren',
	front: 'Alles in den Vordergrund',
	help: 'Hilfe',
	credits: 'Zuschreibung',
	report: 'Problem melden',
	propose: 'Vorschlag machen',
	buy: 'Geld spenden'
}
export const customMenuTranslation = (locale, label) => {
	const firstTwo = locale.slice(0, 2)
	switch (firstTwo) {
	case 'en': {
		return englishMenuLabels[label]
	}
	case 'de': {
		return germanMenuLabels[label]
	}
	default: {
		return englishMenuLabels[label]
	}
	}
}
