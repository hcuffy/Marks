import { ADD_CLASSROOM_DATA, GET_CLASSROOM_DATA } from '../constants'

const _ = require('lodash')

const initialLoadState = {
	name: '',
	teacher: '',
	substitute: '',
	classData: [{ name: '', subjects: [] }],
	check: false,
	isInvalid: false
}

export const applyClassData = (state = initialLoadState, action) => {
	switch (action.type) {
		case ADD_CLASSROOM_DATA: {
			return _.assign({}, state, {
				name: '',
				teacher: '',
				substitute: '',
				check: true,
				isInvalid: false
			})
		}
		case GET_CLASSROOM_DATA: {
			return _.assign(
				{},
				state,
				{ check: false, isInvalid: false },
				action.payload
			)
		}
		default:
			return state
	}
}
