import {
	OPEN_CLOSE_CLASS_LIST,
	OPEN_CLOSE_STUDENT_LIST,
	GET_ALL_ANSWERS,
	OPEN_CLOSE_QUESTION_LIST,
	UPDATE_QUESTION_SET
} from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	classDropdown: false,
	studentDropdown: false,
	questionDropdown: false,
	classroom: null,
	classroomId: null,
	singleStudent: null,
	answers: []
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
	case GET_ALL_ANSWERS: {
		return _.assign({}, state, action.payload)
	}
	case OPEN_CLOSE_QUESTION_LIST: {
		const questionDropdown = !state.questionDropdown

		return _.assign({}, state, { questionDropdown })
	}
	case UPDATE_QUESTION_SET: {
		const questionDropdown = false

		return _.assign({}, state, { questionDropdown }, action.payload)
	}
	default:
		return state
	}
}

export default applyCapabilityChanges
