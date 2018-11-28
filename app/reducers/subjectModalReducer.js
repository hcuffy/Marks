import { OPEN_CLOSE_SUBJECT_MODAL, UPDATE_SUBJECT } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	id: '',
	showSubjectModal: false
}

const handleSubjectModal = (state = initialLoadState, action) => {
	const showSubjectModal = !state.showSubjectModal
	switch (action.type) {
	case OPEN_CLOSE_SUBJECT_MODAL: {
		const { id } = action.payload
		return _.assign({}, state, {
			id,
			showSubjectModal
		})
	}
	case UPDATE_SUBJECT: {
		const { id } = action.payload
		return _.assign({}, state, {
			id,
			showSubjectModal
		})
	}
	default:
		return state
	}
}

export default handleSubjectModal
