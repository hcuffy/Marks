import { OPEN_CLOSE_CLASS_LIST } from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	classDropdown: false,
	subjectDropown: false,
	classroom: null
}

const applyCapabilityChanges = (state = initialLoadState, action) => {
	switch (action.type) {
	case OPEN_CLOSE_CLASS_LIST: {
		const classDropdown = !state.classDropdown
		const subjectDropown = false

		return _.assign({}, state, { classDropdown, subjectDropown }, action.payload)
	}
	default:
		return state
	}
}

export default applyCapabilityChanges
