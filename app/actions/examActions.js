// import { ADD_NEW_EXAM } from './actionTypes'

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
