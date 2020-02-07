import {
	ADD_NEW_STUDENT,
	GET_ALL_STUDENTS,
	GET_SINGLE_STUDENT,
	DISPLAY_STUDENT_GRAPH,
	DISPLAY_STUDENT_SUBJECT_GRAPH,
	STUDENT_FORM_VALIDATION
} from './constants'

const _ = require('lodash')

const initialLoadState = {
	firstname: '',
	lastname: '',
	studentModal: false,
	studentDropdown: false,
	subjectDropdown: false,
	studentGraphId: null,
	chartToDisplay: null,
	studentGraphName: null,
	subjectGraphName: null,
	isInvalid: false
}

const applyStudentData = (state = initialLoadState, action) => {
	switch (action.type) {
		case ADD_NEW_STUDENT: {
			return _.assign({}, state, action.payload)
		}
		case GET_ALL_STUDENTS: {
			return _.assign({}, state, action.payload)
		}

		case GET_SINGLE_STUDENT: {
			const studentModal = !state.studentModal

			return _.assign({}, state, { studentModal }, action.payload)
		}

		case DISPLAY_STUDENT_GRAPH: {
			const studentDropdown = !state.studentDropdown

			return _.assign({}, state, { studentDropdown }, action.payload)
		}

		case DISPLAY_STUDENT_SUBJECT_GRAPH: {
			const subjectDropdown = !state.subjectDropdown

			return _.assign({}, state, { subjectDropdown }, action.payload)
		}

		case STUDENT_FORM_VALIDATION: {
			return _.assign({}, state, action.payload)
		}

		default:
			return state
	}
}

export default applyStudentData
