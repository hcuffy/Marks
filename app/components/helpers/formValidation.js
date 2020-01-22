const _ = require('lodash')

export const inputValidation = formValue => {
	return _.some(formValue, _.isEmpty)
}
