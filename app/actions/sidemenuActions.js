import { HANDLE_MENU_CHANGE } from '../constants/actionTypes'

const _ = require('lodash')

export const updateButtonStyle = event => dispatch => {
	const menuButtons = {
		home: '',
		classroom: '',
		students: '',
		exams: '',
		graphs: '',
		settings: ''
	}

	const styleUpdate = _.set(menuButtons, event.target.getAttribute('data-id'), 'black')

	dispatch({
		type: HANDLE_MENU_CHANGE,
		payload: { styleUpdate }
	})
}
