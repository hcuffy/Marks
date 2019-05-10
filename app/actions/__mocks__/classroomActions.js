import {
	CHANGE_CLASSROOM_TAB,
	ADD_CLASSROOM_DATA,
	GET_CLASSROOM_DATA,
	UPDATE_CLASSROOM,
	OPEN_CLOSE_ROOM_MODAL
} from '../../constants/actionTypes'

import {
	addClassroomData,
	getClassroomData,
	deleteClassroom,
	updateRoomData
} from './mockCollections/classroomCollection'

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

export const displayClassData = () => async dispatch => {
	const data = await getClassroomData()

	if (data.length !== 0) {
		dispatch({
			type: GET_CLASSROOM_DATA,
			payload: { classData: data }
		})
	}
}

// TODO: continue from here

export const updateRoom = event => async dispatch => {
	const roomData = {
		name: event.target.name.value,
		teacher: event.target.teacher.value,
		code: event.target.code.value,
		substitute: event.target.substitute.value,
		oldName: event.target.oldName.getAttribute('data-id'),
		id: '',
		showModal: true
	}

	const docs = await updateRoomData(roomData)
	if (docs) {
		roomData.showModal = false
		dispatch({
			type: GET_CLASSROOM_DATA,
			payload: { classData: docs }
		})
	}

	dispatch({
		type: UPDATE_CLASSROOM,
		payload: roomData
	})
}

export const deleteRoom = event => async dispatch => {
	const roomData = {
		id: event.target.getAttribute('data-id'),
		showModal: true
	}

	const docs = await deleteClassroom(roomData)

	if (docs) {
		dispatch({
			type: GET_CLASSROOM_DATA,
			payload: { classData: docs }
		})
	}

	dispatch({
		type: UPDATE_CLASSROOM,
		payload: roomData
	})
}

export const roomModalDisplay = event => dispatch => {
	const roomId = {
		id: event.target.getAttribute('data-id')
	}

	dispatch({
		type: OPEN_CLOSE_ROOM_MODAL,
		payload: roomId
	})
}
