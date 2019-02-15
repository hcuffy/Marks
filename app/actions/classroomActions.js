import {
	CHANGE_CLASSROOM_TAB,
	ADD_CLASSROOM_DATA,
	GET_CLASSROOM_DATA
} from '../constants/actionTypes'
import { addClassroomData, getClassroomData } from '../database/classroomCollection'

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
	event.preventDefault()

	const formData = {
		Name: event.target.Name.value,
		Teacher: event.target.Teacher.value,
		Code: event.target.Code.value,
		Subject_Teacher: event.target.Subject_Teacher.value
	}
	event.target.reset()
	addClassroomData(formData)
	const data = await getClassroomData()

	dispatch({
		type: ADD_CLASSROOM_DATA,
		payload: { inputData: data }
	})
}

export const displayClassData = () => async dispatch => {
	const data = await getClassroomData()
	if (data.length !== 0) {
		dispatch({
			type: GET_CLASSROOM_DATA,
			payload: { classData: data }
		})
	}
}
