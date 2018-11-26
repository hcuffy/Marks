import {
	OPEN_CLOSE_ROOM_MODAL,
	GET_CLASSROOM_DATA,
	UPDATE_CLASSROOM,
	OPEN_CLOSE_SUBJECT_MODAL,
	GET_SINGLE_SUBJECT
} from './actionTypes'
import { getRemoveClassroom, updateRoomData } from '../database/classroomCollection'
import { deleteSubject, updateSubjectData } from '../database/subjectCollection'

export const roomModalDisplay = event => {
	event.preventDefault()
	const roomId = {
		id: event.target.id
	}

	return {
		type: OPEN_CLOSE_ROOM_MODAL,
		payload: roomId
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

export const subjectModalDisplay = event => {
	event.preventDefault()
	const subjectId = {
		id: event.target.id
	}

	return {
		type: OPEN_CLOSE_SUBJECT_MODAL,
		payload: subjectId
	}
}

export const updateSubject = event => async dispatch => {
	event.preventDefault()
	const subjectData = {
		Name: event.target.Name.value,
		Abbreviation: event.target.Abbreviation.value,
		ClassroomId: event.target.ClassroomId.id,
		SubjectId: event.target.SubjectId.id
	}

	const subjectDoc = await updateSubjectData(subjectData)

	dispatch({
		type: OPEN_CLOSE_SUBJECT_MODAL,
		payload: { id: subjectData.SubjectId }
	})

	if (subjectDoc.length > 0) {
		dispatch({
			type: GET_SINGLE_SUBJECT,
			payload: { subject: subjectDoc[0].Room }
		})
	}
}

export const removeSubject = event => async dispatch => {
	const subjectData = {
		id: event.target.id
	}

	const subjectDoc = await deleteSubject(subjectData)

	dispatch({
		type: OPEN_CLOSE_SUBJECT_MODAL,
		payload: { id: subjectData.SubjectId }
	})

	if (subjectDoc.length > 0) {
		dispatch({
			type: GET_SINGLE_SUBJECT,
			payload: { subject: subjectDoc[0].Room }
		})
	}
}
