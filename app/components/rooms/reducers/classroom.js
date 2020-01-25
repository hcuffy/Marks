import {
	ADD_CLASSROOM_DATA,
	GET_CLASSROOM_DATA,
	CLASSROOM_FORM_VALIDATION
} from '../constants'

const _ = require('lodash')

const initialLoadState = {
	name: '',
	teacher: '',
	substitute: '',
	classData: [{ name: '', subjects: [] }],
	check: false,
	isInvalid: false
}

export const applyClassData = (state = initialLoadState, action) => {
	switch (action.type) {
		case ADD_CLASSROOM_DATA: {
			return _.assign({}, state, action.payload)
		}
		case GET_CLASSROOM_DATA: {
			return _.assign({}, state, action.payload)
		}
		case CLASSROOM_FORM_VALIDATION: {
			return _.assign({}, state, action.payload)
		}
		default:
			return state
	}
}
