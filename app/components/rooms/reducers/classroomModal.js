import {
	OPEN_CLOSE_ROOM_MODAL,
	UPDATE_CLASSROOM,
	CLASSROOM_MODAL_VALIDATION
} from '../constants'

import { classroomModalHandlers } from './reducerHandlers'
import { reducerActionHandler } from '../../../reducers/reducerUtils.js'

const _ = require('lodash')

const initialLoadState = {
	id: '',
	showModal: false,
	isInvalid: false
}

export const applyClassModal = (state = initialLoadState, action) => {
	return reducerActionHandler(state, action, classroomModalHandlers)

	/*
	const showModal = !state.showModal
	switch (action.type) {
		case OPEN_CLOSE_ROOM_MODAL: {
			return _.assign({}, state, { showModal }, action.payload)
		}
		case UPDATE_CLASSROOM: {
			return _.assign({}, state, { showModal }, action.payload)
		}
		case CLASSROOM_MODAL_VALIDATION: {
			return _.assign({}, state, action.payload)
		}
		default:
			return state
	}*/
}
