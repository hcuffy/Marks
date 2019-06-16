import { OPEN_CLOSE_CLASS_LIST, OPEN_CLOSE_STUDENT_LIST } from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	classDropdown: false,
	studentDropdown: false,
	classroom: null,
	subject: null
}

const applyCapabilityChanges = (state = initialLoadState, action) => {
	switch (action.type) {
	case OPEN_CLOSE_CLASS_LIST: {
		const classDropdown = !state.classDropdown
		const studentDropdown = false

		return _.assign({}, state, { classDropdown, studentDropdown }, action.payload)
	}
	case OPEN_CLOSE_STUDENT_LIST: {
		const studentDropdown = !state.studentDropdown
		const classDropdown = false

		return _.assign({}, state, { studentDropdown, classDropdown }, action.payload)
	}
	default:
		return state
	}
}

export default applyCapabilityChanges
