import { OPEN_GRAPH_CLASS_LIST, GET_ALL_GRADES } from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	classroom: '',
	subjectName: '',
	classroomDropdown: false,
	openSubList: false
}

const applyGraphData = (state = initialLoadState, action) => {
	switch (action.type) {
	case OPEN_GRAPH_CLASS_LIST: {
		const classroomDropdown = !state.classroomDropdown
		const openSubList = state.classroomDropdown
		const classroom = action.payload
		return _.assign({}, state, { classroomDropdown, openSubList, classroom })
	}
	case GET_ALL_GRADES: {
		return _.assign({}, state, action.payload)
	}
	default:
		return state
	}
}

export default applyGraphData
