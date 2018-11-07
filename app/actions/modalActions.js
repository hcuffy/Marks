import {
	DISPLAY_ROOM_MODAL,
	REMOVE_CLASSROOM,
	GET_CLASSROOM_DATA,
	UPDATE_CLASSROOM
} from './actionTypes'
import { getRemoveClassroom } from '../database/classroomCollection'

export const handleRoomData = event => {
	event.preventDefault()
	const classData = {
		id: event.target.id,
		showModal: true
	}

	return {
		type: DISPLAY_ROOM_MODAL,
		payload: classData
	}
}

export const removeRoom = event => async dispatch => {
	const roomData = {
		id: event.target.id,
		showModal: true
	}

	const docs = await getRemoveClassroom(roomData)

	if (docs) {
		roomData.showModal = false
		dispatch({
			type: GET_CLASSROOM_DATA,
			payload: { classData: docs }
		})
	}

	dispatch({
		type: REMOVE_CLASSROOM,
		payload: roomData
	})
}

export const updateRoom = event => async dispatch => {
	const roomData = {
		id: event.target.id,
		showModal: true
	}

	console.log(roomData)
	// const docs = await getRemoveClassroom(roomData)

	// if (docs) {
	// 	roomData.showModal = false
	// 	dispatch({
	// 		type: GET_CLASSROOM_DATA,
	// 		payload: { classData: docs }
	// 	})
	// }

	dispatch({
		type: UPDATE_CLASSROOM,
		payload: roomData
	})
}
