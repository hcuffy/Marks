import { CHANGE_CLASSROOM_TAB, ADD_CLASSROOM_DATA } from '../../constants/actionTypes'

const _ = require('lodash')

export const changeClassroomTab = event => dispatch => {
	const tabButtons = {
		classTab: '',
		examTab: ''
	}

	const tabUpdate = _.set(tabButtons, event.target, 'active')

	dispatch({
		type: CHANGE_CLASSROOM_TAB,
		payload: tabUpdate
	})
}

export const handleClassData = event => async dispatch => {
	const formData = {
		name: event.target.name,
		teacher: event.target.teacher,
		code: event.target.code,
		substitute: event.target.substitute
	}

	dispatch({
		type: ADD_CLASSROOM_DATA,
		payload: { inputData: [formData] }
	})
}
