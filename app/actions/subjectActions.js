import {
	UPDATE_CLASS_LIST,
	GET_SINGLE_SUBJECT,
	ADD_NEW_SUBJECT,
	GET_SUBJECT_LIST
} from './actionTypes'
import { addSubjectData, getAllSubjects } from '../database/subjectCollection'

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
		type: GET_SINGLE_SUBJECT,
		payload: subject
	}
}

export const addNewSubject = event => {
	event.preventDefault()

	const formData = {
		Name: event.target.Name.value,
		Abbreviation: event.target.Abbreviation.value,
		Room: event.target.Room.value
	}

	event.target.reset()
	addSubjectData(formData)
	return {
		type: ADD_NEW_SUBJECT,
		payload: {}
	}
}

export const getSubjectData = () => async dispatch => {
	const data = await getAllSubjects()
	if (data.length !== 0) {
		dispatch({
			type: GET_SUBJECT_LIST,
			payload: { data }
		})
	}
}
