import { ADD_CLASSROOM_DATA, GET_CLASSROOM_DATA } from '../components/rooms/constants'

const _ = require('lodash')

const initialLoadState = {
	name: '',
	teacher: '',
	code: '',
	substitute: '',
	classData: [{ name: '', subjects: [] }],
	check: false
}

const applyClassData = (state = initialLoadState, action) => {
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

export default applyClassData
