import { OPEN_CLOSE_CLASS_LIST, OPEN_CLOSE_SUBJECT_LIST } from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	classDropdown: false,
	subjectDropown: false,
	classroom: null,
	subject: null
}

const applyCapabilityChanges = (state = initialLoadState, action) => {
	switch (action.type) {
	case OPEN_CLOSE_CLASS_LIST: {
		const classDropdown = !state.classDropdown
		const subjectDropown = false

		return _.assign({}, state, { classDropdown, subjectDropown }, action.payload)
	}
	case OPEN_CLOSE_SUBJECT_LIST: {
		const subjectDropown = !state.subjectDropown
		const classDropdown = false

		return _.assign({}, state, { subjectDropown, classDropdown }, action.payload)
	}
	default:
		return state
	}
}

export default applyCapabilityChanges
