import { UPDATE_CLASS_LIST, GET_SUBJECT_LIST, ADD_NEW_SUBJECT } from './actionTypes'
import { addSubjectData } from '../database/subjectCollection'
import { updateRoomData } from '../database/classroomCollection'

export const openClassList = event => {
	event.preventDefault()

	const subject = event.target.innerText
	return {
		type: UPDATE_CLASS_LIST,
		payload: subject
	}
}

export const showSubject = event => {
	const subject = event.target.innerText
	return {
		type: GET_SUBJECT_LIST,
		payload: subject
	}
}

export const addNewSubject = event => {
	event.preventDefault()

	const formData = {
		Name: event.target.Name.value,
		Abbrivation: event.target.Abbrivation.value,
		Room: event.target.Room.value
	}

	event.target.reset()
	addSubjectData(formData)
	return {
		type: ADD_NEW_SUBJECT,
		payload: {}
	}
}
