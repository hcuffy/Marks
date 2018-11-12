import { UPDATE_CLASS_LIST, GET_SUBJECT_LIST } from './actionTypes'

export const openClassList = event => {
	event.preventDefault()

	return {
		type: UPDATE_CLASS_LIST,
		payload: {}
	}
}

export const showSubject = event => {
	const subject = { subject: event.target.innerText }
	return {
		type: GET_SUBJECT_LIST,
		payload: subject
	}
}
