import { UPDATE_CLASS_LIST, GET_SUBJECT_LIST } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	openModal: false,
	subject: 'Select Class',
	Name: 'Name',
	Abbrivation: 'Abbrivation',
	Select_Class: 'Select Class'
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
	case GET_SUBJECT_LIST: {
		const subject = action.payload
		return _.assign({}, state, { subject })
	}

	default:
		return state
	}
}

export default openDropdownList
