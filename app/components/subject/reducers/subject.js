import {
	UPDATE_CLASS_LIST,
	GET_SINGLE_SUBJECT,
	GET_SUBJECT_LIST,
	ADD_NEW_SUBJECT,
	SUBJECT_FORM_VALIDATION
} from '../constants'

const _ = require('lodash')

const initialLoadState = {
	openModal: false,
	subject: null,
	name: '',
	abbreviation: '',
	isInvalid: false
}

export const applyClassList = (state = initialLoadState, action) => {
	switch (action.type) {
		case UPDATE_CLASS_LIST: {
			const openModal = !state.openModal

			return _.assign({}, state, { openModal }, action.payload)
		}
		case GET_SINGLE_SUBJECT: {
			return _.assign({}, state, action.payload)
		}
		case SUBJECT_FORM_VALIDATION: {
			return _.assign({}, state, action.payload)
		}

		default:
			return state
	}
}

export const applySubjectData = (state = {}, action) => {
	switch (action.type) {
		case GET_SUBJECT_LIST: {
			return _.assign({}, state, action.payload)
		}
		case ADD_NEW_SUBJECT: {
			return _.assign({}, state, action.payload)
		}

		default:
			return state
	}
}
