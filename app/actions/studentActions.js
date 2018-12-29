import {
	ADD_NEW_STUDENT,
	GET_ALL_STUDENTS,
	GET_SINGLE_STUDENT
} from '../constants/actionTypes'
import { addNewStudentData, getAllStudents } from '../database/studentCollection'

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

export const getStudents = () => async dispatch => {
	const data = await getAllStudents()
	if (data.length !== 0) {
		dispatch({
			type: GET_ALL_STUDENTS,
			payload: { data }
		})
	}
}

export const showStudentModal = event => {
	const studentId = event.target.id
	return {
		type: GET_SINGLE_STUDENT,
		payload: studentId
	}
}
