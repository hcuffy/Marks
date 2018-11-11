import { UPDATE_SUBJECT_LIST } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	openModal: false
}

const openDropdownList = (state = initialLoadState, action) => {
	const openModal = !state.openModal
	switch (action.type) {
	case UPDATE_SUBJECT_LIST: {
		return _.assign({}, state, {
			openModal
		})
	}
	default:
		return state
	}
}

export default openDropdownList
