import { HANDLE_MENU_CHANGE } from '../constants/actionTypes'

const _ = require('lodash')

export const updateButtonStyle = event => {
	const menuButtons = {
		home: '',
		school: '',
		classroom: '',
		students: '',
		exams: ''
	}

	const styleUpdate = _.set(menuButtons, event.target.getAttribute('data-id'), 'black')

	return {
		type: HANDLE_MENU_CHANGE,
		payload: { styleUpdate }
	}
}
