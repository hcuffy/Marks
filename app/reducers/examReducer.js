import { GET_SELECTED_CLASS } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	subject: ''
}

const filterExam = (state = initialLoadState, action) => {
	switch (action.type) {
	case GET_SELECTED_CLASS: {
		const subject = action.payload
		return _.assign({}, state, { subject })
	}

	default:
		return state
	}
}

export default filterExam
