import { UPDATE_CLASS_LIST, GET_SUBJECT_LIST } from './actionTypes'

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
