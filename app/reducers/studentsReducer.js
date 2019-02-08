import {
	ADD_NEW_STUDENT,
	GET_ALL_STUDENTS,
	GET_SINGLE_STUDENT
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
	default:
		return state
	}
}

export default applyStudentData
