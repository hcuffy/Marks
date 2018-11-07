// @flow
import { DISPLAY_ROOM_MODAL, REMOVE_CLASSROOM } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	id: '',
	showModal: false
}

const handleClassModal = (state = initialLoadState, action) => {
	switch (action.type) {
	case DISPLAY_ROOM_MODAL: {
		const { id, showModal } = action.payload
		return _.assign({}, state, {
			id,
			showModal
		})
	}
	case REMOVE_CLASSROOM: {
		const { id, showModal } = action.payload
		return _.assign({}, state, {
			id,
			showModal
		})
	}
	default:
		return state
	}
}

export default handleClassModal
