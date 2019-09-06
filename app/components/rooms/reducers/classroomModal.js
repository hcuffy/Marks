import { OPEN_CLOSE_ROOM_MODAL, UPDATE_CLASSROOM } from '../constants'

const _ = require('lodash')

const initialLoadState = {
	id: '',
	showModal: false
}

export const applyClassModal = (state = initialLoadState, action) => {
	const showModal = !state.showModal

	switch (action.type) {
	case OPEN_CLOSE_ROOM_MODAL: {
		return _.assign({}, state, { showModal }, action.payload)
	}
	case UPDATE_CLASSROOM: {
		return _.assign({}, state, { showModal }, action.payload)
	}
	default:
		return state
	}
}
