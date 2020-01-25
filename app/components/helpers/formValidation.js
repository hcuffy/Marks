const _ = require('lodash')

export const inputValidation = formValues => {
	return _.values(formValues).some(value => value === '')
}
