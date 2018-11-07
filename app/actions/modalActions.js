import { DISPLAY_ROOM_MODAL, REMOVE_CLASSROOM } from './actionTypes'
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

	const numOfRemovedRoom = await getRemoveClassroom(roomData)

	if (numOfRemovedRoom) {
		roomData.showModal = false
	}

	dispatch({
		type: REMOVE_CLASSROOM,
		payload: roomData
	})
}
