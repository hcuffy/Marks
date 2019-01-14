import { DISPLAY_EXAM_TABLE, OPEN_CLASS_LIST } from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	classroom: '',
	subjectName: '',
	classroomDropdown: false,
	subDrop: false
}

const gradeData = (state = initialLoadState, action) => {
	switch (action.type) {
	case DISPLAY_EXAM_TABLE: {
		const { subjectName, subjectId } = action.payload.subjectData
		const subDrop = !state.subDrop
		return _.assign({}, state, { subjectName, subjectId, subDrop })
	}
	case OPEN_CLASS_LIST: {
		const classroomDropdown = !state.classroomDropdown
		const subDrop = state.classroomDropdown
		const classroom = action.payload
		return _.assign({}, state, { classroomDropdown, subDrop, classroom })
	}
	default:
		return state
	}
}

export default gradeData
