import { UPDATE_CLASS_LIST, GET_SINGLE_SUBJECT } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	openModal: false,
	subject: 'Select Class',
	name: 'Name',
	abbrivation: 'Abbrivation',
	select_Class: 'Select Class'
}

const openDropdownList = (state = initialLoadState, action) => {
	switch (action.type) {
	case UPDATE_CLASS_LIST: {
		const openModal = !state.openModal
		const subject = action.payload
		return _.assign({}, state, {
			openModal,
			subject
		})
	}
	case GET_SINGLE_SUBJECT: {
		const subject = action.payload
		return _.assign({}, state, { subject })
	}

	default:
		return state
	}
}

export default openDropdownList
