import {
	DISPLAY_EXAM_TABLE,
	OPEN_CLASS_LIST,
	UPDATE_EXAM_TABLE
} from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	classroom: null,
	subjectName: null,
	classroomDropdown: false,
	subDrop: false
}

const applyGradeData = (state = initialLoadState, action) => {
	switch (action.type) {
	case DISPLAY_EXAM_TABLE: {
		const { subjectName, subjectId } = action.payload.subjectData
		const { exams, grades } = action.payload
		const subDrop = !state.subDrop

		return _.assign({}, state, { subjectName, subjectId, subDrop, exams, grades })
	}
	case OPEN_CLASS_LIST: {
		const classroomDropdown = !state.classroomDropdown
		const subDrop = state.classroomDropdown
		const classroom = action.payload

		return _.assign({}, state, { classroomDropdown, subDrop, classroom })
	}
	case UPDATE_EXAM_TABLE: {
		const { exams, grades } = action.payload

		return _.assign({}, state, { exams, grades })
	}
	default:
		return state
	}
}

export default applyGradeData
