import {
	UPDATE_CLASS_LIST,
	GET_SINGLE_SUBJECT,
	GET_SUBJECT_LIST
} from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	openModal: false,
	subject: null,
	name: 'Name',
	abbreviation: 'Abbreviation'
}

const applyClassList = (state = initialLoadState, action) => {
	switch (action.type) {
	case UPDATE_CLASS_LIST: {
		const openModal = !state.openModal
		const subject = action.payload
		return _.assign({}, state, {
			openModal,
			subject
		})
	}
	case GET_SINGLE_SUBJECT: {
		const subject = action.payload
		return _.assign({}, state, { subject })
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

	default:
		return state
	}
}

export default applyClassList
