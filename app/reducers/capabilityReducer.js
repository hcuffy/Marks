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

		return _.assign({}, state, { classDropdown }, action.payload)
	}
	default:
		return state
	}
}

export default applyCapabilityChanges
