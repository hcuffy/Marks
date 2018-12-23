import { ADD_NEW_STUDENT } from './actionTypes'
import { addNewStudentData } from '../database/studentCollection'

export const addNewStudent = event => {
	event.preventDefault()

	const formData = {
		FirstName: event.target.First_Name.value,
		LastName: event.target.Last_Name.value,
		Gender: event.target.Gender.value,
		Classroom: event.target.Classroom.value
	}
	addNewStudentData(formData)
	event.target.reset()

	return {
		type: ADD_NEW_STUDENT,
		payload: {}
	}
}
