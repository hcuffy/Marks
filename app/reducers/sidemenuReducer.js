import { HANDLE_MENU_CHANGE } from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	home: 'black',
	school: '',
	classroom: '',
	students: '',
	exams: ''
}

const handleMenuStyle = (state = initialLoadState, action) => {
	switch (action.type) {
	case HANDLE_MENU_CHANGE: {
		const { styleUpdate } = action.payload
		return _.assign({}, state, styleUpdate)
	}
	default:
		return state
	}
}

export default handleMenuStyle
