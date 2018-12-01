import { GET_SELECTED_CLASS } from './actionTypes'

export const addNewExam = event => {
	event.preventDefault()
	const examData = {
		Title: event.target.Title.value,
		Room: event.target.Room.value,
		Subject: event.target.Subject.id,
		Date: event.target.Date.value,
		Weight: event.target.Weight.value
	}

	console.log(examData)
}

export const getSelectedSubject = event => {
	const subject = event.target.value
	return {
		type: GET_SELECTED_CLASS,
		payload: subject
	}
}
