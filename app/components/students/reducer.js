import {
	ADD_NEW_STUDENT,
	GET_ALL_STUDENTS,
	GET_SINGLE_STUDENT,
	DISPLAY_STUDENT_GRAPH,
	DISPLAY_STUDENT_SUBJECT_GRAPH
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
	subjectGraphName: null
}

const applyStudentData = (state = initialLoadState, action) => {
	switch (action.type) {
		case ADD_NEW_STUDENT: {
			return _.assign({}, state, {
				firstname: '',
				lastname: ''
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

			return _.assign({}, state, { studentDropdown }, action.payload)
		}

		case DISPLAY_STUDENT_SUBJECT_GRAPH: {
			const subjectDropdown = !state.subjectDropdown

			return _.assign({}, state, { subjectDropdown }, action.payload)
		}
		default:
			return state
	}
}

export default applyStudentData
