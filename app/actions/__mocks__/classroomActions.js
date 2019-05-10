import { CHANGE_CLASSROOM_TAB, ADD_CLASSROOM_DATA } from '../../constants/actionTypes'
import { addClassroomData, getClassroomData } from './mockCollections/classroomCollection'

const _ = require('lodash')

export const changeClassroomTab = event => dispatch => {
	const tabButtons = {
		classTab: '',
		examTab: ''
	}

	const tabUpdate = _.set(tabButtons, event.target.getAttribute('data-name'), 'active')

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

	addClassroomData(formData)
	const data = await getClassroomData()

	dispatch({
		type: ADD_CLASSROOM_DATA,
		payload: { inputData: data }
	})
}
