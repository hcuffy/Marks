import {
	ADD_NEW_STUDENT,
	GET_ALL_STUDENTS,
	GET_SINGLE_STUDENT,
	DISPLAY_STUDENT_GRAPH
} from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	Firstname: '',
	Lastname: '',
	studentModal: false,
	studentDropdown: false
}

const applyStudentData = (state = initialLoadState, action) => {
	switch (action.type) {
	case ADD_NEW_STUDENT: {
		return _.assign({}, state, {
			Firstname: '',
			Lastname: ''
		})
	}
	case GET_ALL_STUDENTS: {
		return _.assign({}, state, action.payload)
	}

	case GET_SINGLE_STUDENT: {
		const studentModal = !state.studentModal
		const studentId = action.payload
		return _.assign({}, state, { studentModal, studentId })
	}

	case DISPLAY_STUDENT_GRAPH: {
		const studentDropdown = !state.studentDropdown
		const { studentGraphId, studentGraphName } = action.payload
		return _.assign({}, state, { studentDropdown, studentGraphId, studentGraphName })
	}
	default:
		return state
	}
}

export default applyStudentData
