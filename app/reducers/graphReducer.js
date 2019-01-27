import { OPEN_GRAPH_CLASS_LIST } from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	classroom: '',
	subjectName: '',
	classroomDropdown: false,
	openSubList: false
}

const graphData = (state = initialLoadState, action) => {
	switch (action.type) {
	case OPEN_GRAPH_CLASS_LIST: {
		const classroomDropdown = !state.classroomDropdown
		const openSubList = state.classroomDropdown
		const classroom = action.payload
		return _.assign({}, state, { classroomDropdown, openSubList, classroom })
	}
	default:
		return state
	}
}

export default graphData
