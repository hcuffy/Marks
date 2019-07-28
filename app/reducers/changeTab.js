import { CHANGE_CLASSROOM_TAB } from '../components/rooms/constants'

const _ = require('lodash')

const initialLoadState = {
	classTab: 'active',
	examTab: ''
}

const applyTabChange = (state = initialLoadState, action) => {
	switch (action.type) {
	case CHANGE_CLASSROOM_TAB: {
		return _.assign({}, state, action.payload)
	}
	default:
		return state
	}
}

export default applyTabChange
