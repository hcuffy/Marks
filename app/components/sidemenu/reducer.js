import { HANDLE_MENU_CHANGE } from './constants'

const _ = require('lodash')

const initialLoadState = {
	home: '#1dbb90',
	classroom: '',
	students: '',
	exams: '',
	graphs: '',
	notes: '',
	capability: '',
	settings: ''
}

const applyMenuStyling = (state = initialLoadState, action) => {
	switch (action.type) {
		case HANDLE_MENU_CHANGE: {
			return _.assign({}, state, action.payload)
		}
		default:
			return state
	}
}

export default applyMenuStyling
