import i18next from 'i18next'

const _ = require('lodash')

export const t = translate => i18next.t(translate)

export const resolveLabel = (current, translated) =>
	_.isNull(current) ? translated : current
