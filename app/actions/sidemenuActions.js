import { HANDLE_MENU_CHANGE } from '../constants/actionTypes'

const _ = require('lodash')

const clickedButton = (menuButtons, event) =>
	_.set(menuButtons, event.target.getAttribute('data-id'), '#1dbb90')

export const updateButtonStyle = event => dispatch => {
	const menuButtons = {
		home: '',
		classroom: '',
		students: '',
		exams: '',
		graphs: '',
		notes: '',
		settings: ''
	}

	const styleUpdate = clickedButton(menuButtons, event)

	dispatch({
		type: HANDLE_MENU_CHANGE,
		payload: { styleUpdate }
	})
}
