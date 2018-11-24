import {
	DISPLAY_ROOM_MODAL,
	GET_CLASSROOM_DATA,
	UPDATE_CLASSROOM,
	DISPLAY_SUBJECT_MODAL
} from './actionTypes'
import { getRemoveClassroom, updateRoomData } from '../database/classroomCollection'

export const handleRoomData = event => {
	event.preventDefault()
	const classData = {
		id: event.target.id
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

export const updateRoom = event => async dispatch => {
	event.preventDefault()
	const roomData = {
		Name: event.target.Name.value,
		Teacher: event.target.Teacher.value,
		Code: event.target.Code.value,
		Subject_Teacher: event.target.Subject_Teacher.value,
		OldName: event.target.OldName.id,
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

export const updateSubject = event => {
	event.preventDefault()
	const selecteSubjectData = {
		id: event.target.id
	}
	return {
		type: DISPLAY_SUBJECT_MODAL,
		payload: selecteSubjectData
	}
}
