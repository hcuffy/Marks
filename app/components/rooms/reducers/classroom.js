import { ADD_CLASSROOM_DATA, GET_CLASSROOM_DATA } from '../constants'

const _ = require('lodash')

const initialLoadState = {
	name: '',
	teacher: '',
	code: '',
	substitute: '',
	classData: [{ name: '', subjects: [] }],
	check: false
}

export const applyClassData = (state = initialLoadState, action) => {
	switch (action.type) {
	case ADD_CLASSROOM_DATA: {
		return _.assign({}, state, {
			name: '',
			teacher: '',
			code: '',
			substitute: '',
			check: true
		})
	}
	case GET_CLASSROOM_DATA: {
		return _.assign({}, state, action.payload)
	}
	default:
		return state
	}
}
