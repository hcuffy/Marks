import {
	UPDATE_CLASS_LIST,
	GET_SINGLE_SUBJECT,
	ADD_NEW_SUBJECT,
	GET_SUBJECT_LIST
} from '../constants/actionTypes'
import { addSubjectData, getAllSubjects } from '../database/subjectCollection'

export const openClassList = event => dispatch => {
	if (event.target.type !== 'button') {
		return
	}

	const subject = event.target.innerText
	dispatch({
		type: UPDATE_CLASS_LIST,
		payload: subject
	})
}

export const addNewSubject = event => dispatch => {
	event.preventDefault()

	const formData = {
		name: event.target.name.value,
		abbreviation: event.target.abbreviation.value,
		room: event.target.room.value
	}

	event.target.reset()
	addSubjectData(formData)
	dispatch({
		type: ADD_NEW_SUBJECT,
		payload: {}
	})
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

export const showSubject = event => dispatch => {
	const subject = event.target.innerText
	getSubjectData()
	dispatch({
		type: GET_SINGLE_SUBJECT,
		payload: subject
	})
}
