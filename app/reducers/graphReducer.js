import {
	OPEN_GRAPH_CLASS_LIST,
	GET_ALL_GRADES,
	DISPLAY_SUBJECT_GRADES,
	GET_ALL_EXAMS
} from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	classroom: '',
	subjectName: '',
	subjectId: null,
	classroomDropdown: false,
	openSubList: false,
	chartTitle: null
}

const applyGraphData = (state = initialLoadState, action) => {
	switch (action.type) {
	case OPEN_GRAPH_CLASS_LIST: {
		const classroomDropdown = !state.classroomDropdown
		const { classroom, chartTitle } = action.payload
		return _.assign({}, state, {
			classroomDropdown,
			classroom,
			chartTitle
		})
	}
	case DISPLAY_SUBJECT_GRADES: {
		const openSubList = !state.openSubList
		const { subjectId, chartTitle } = action.payload
		return _.assign({}, state, {
			openSubList,
			subjectId,
			chartTitle
		})
	}
	case GET_ALL_EXAMS: {
		const { exams } = action.payload
		return _.assign({}, state, { exams })
	}

	case GET_ALL_GRADES: {
		return _.assign({}, state, action.payload)
	}
	default:
		return state
	}
}

export default applyGraphData
