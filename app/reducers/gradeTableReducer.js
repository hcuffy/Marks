import {
	DISPLAY_EXAM_TABLE,
	OPEN_CLASS_LIST,
	UPDATE_EXAM_TABLE
} from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	classroomId: null,
	subjectName: null,
	classroomDropdown: false,
	subDrop: false
}

const applyGradeData = (state = initialLoadState, action) => {
	switch (action.type) {
	case DISPLAY_EXAM_TABLE: {
		const subDrop = !state.subDrop

		return _.assign({}, state, { subDrop }, action.payload)
	}
	case OPEN_CLASS_LIST: {
		const classroomDropdown = !state.classroomDropdown
		const subDrop = !classroomDropdown

		return _.assign({}, state, { classroomDropdown, subDrop }, action.payload)
	}
	case UPDATE_EXAM_TABLE: {
		return _.assign({}, state, action.payload)
	}
	default:
		return state
	}
}

export default applyGradeData
