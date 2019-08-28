import {
	OPEN_GRAPH_CLASS_LIST,
	GET_ALL_GRADES,
	DISPLAY_SUBJECT_GRADES,
	GET_ALL_EXAMS,
	DISPLAY_EXAM_GRADES
} from './constants'

const _ = require('lodash')

const initialLoadState = {
	classroom: null,
	subjectName: null,
	examName: null,
	subjectId: null,
	examId: null,
	classroomDropdown: false,
	openSubList: false,
	openExamList: false,
	chartToDisplay: null,
	chartTitle: null
}

const applyGraphData = (state = initialLoadState, action) => {
	switch (action.type) {
	case OPEN_GRAPH_CLASS_LIST: {
		const classroomDropdown = !state.classroomDropdown

		return _.assign({}, state, { classroomDropdown }, action.payload)
	}
	case DISPLAY_SUBJECT_GRADES: {
		const openSubList = !state.openSubList

		return _.assign({}, state, { openSubList }, action.payload)
	}
	case DISPLAY_EXAM_GRADES: {
		const openExamList = !state.openExamList

		return _.assign({}, state, { openExamList }, action.payload)
	}
	case GET_ALL_EXAMS: {
		return _.assign({}, state, action.payload)
	}

	case GET_ALL_GRADES: {
		return _.assign({}, state, action.payload)
	}
	default:
		return state
	}
}

export default applyGraphData
