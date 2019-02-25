import { CHANGE_CLASSROOM_TAB } from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	classTab: 'active',
	examTab: ''
}

const applyTabChange = (state = initialLoadState, action) => {
	switch (action.type) {
	case CHANGE_CLASSROOM_TAB: {
		const { classTab, examTab } = action.payload

		return _.assign({}, state, {
			classTab,
			examTab
		})
	}
	default:
		return state
	}
}

export default applyTabChange
