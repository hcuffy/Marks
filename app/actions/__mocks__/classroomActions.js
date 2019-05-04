import { CHANGE_CLASSROOM_TAB } from '../../constants/actionTypes'

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
