import { DISPLAY_ROOM_MODAL, REMOVE_CLASSROOM } from './actionTypes'

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

export const removeRoom = event => {
	const roomData = {
		id: event.target.id,
		showModal: false
	}

	return {
		type: REMOVE_CLASSROOM,
		payload: roomData
	}
}
