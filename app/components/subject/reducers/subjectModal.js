import { OPEN_CLOSE_SUBJECT_MODAL, UPDATE_SUBJECT } from '../constants'

const _ = require('lodash')

const initialLoadState = {
	id: '',
	showSubjectModal: false
}

export const applySubjectModal = (state = initialLoadState, action) => {
	const showSubjectModal = !state.showSubjectModal
	switch (action.type) {
	case OPEN_CLOSE_SUBJECT_MODAL: {
		return _.assign({}, state, { showSubjectModal }, action.payload)
	}
	case UPDATE_SUBJECT: {
		return _.assign({}, state, { showSubjectModal }, action.payload)
	}
	default:
		return state
	}
}
