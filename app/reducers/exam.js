import {
	GET_SELECTED_CLASS,
	UPDATE_DROPDOWN_CLASS_LIST,
	DISPLAY_SUBJECT_LIST,
	GET_SINGLE_EXAM,
	UPDATE_EXAMS_LIST
} from '../components/exam/constants'

const _ = require('lodash')

const initialLoadState = {
	subject: '',
	openClassDropdown: false,
	openSubList: false,
	classroomId: null,
	selectedSubject: null,
	examModal: false
}

const applyFilteredExam = (state = initialLoadState, action) => {
	switch (action.type) {
	case GET_SELECTED_CLASS: {
		const subject = action.payload

		return _.assign({}, state, { subject })
	}
	case UPDATE_DROPDOWN_CLASS_LIST: {
		const openClassDropdown = !state.openClassDropdown
		const openSubList = state.openClassDropdown

		return _.assign({}, state, { openClassDropdown, openSubList }, action.payload)
	}
	case GET_SINGLE_EXAM: {
		const examModal = !state.examModal
		const examId = action.payload

		return _.assign({}, state, { examModal, examId })
	}
	case DISPLAY_SUBJECT_LIST: {
		const openSubList = !state.openSubList

		return _.assign({}, state, { openSubList }, action.payload)
	}
	case UPDATE_EXAMS_LIST: {
		const exams = action.payload

		return _.assign({}, state, { exams })
	}
	default:
		return state
	}
}

export default applyFilteredExam
