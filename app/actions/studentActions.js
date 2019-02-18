import {
	ADD_NEW_STUDENT,
	GET_ALL_STUDENTS,
	GET_SINGLE_STUDENT,
	DISPLAY_STUDENT_GRAPH,
	DISPLAY_STUDENT_SUBJECT_GRAPH
} from '../constants/actionTypes'
import { addNewStudentData, getAllStudents } from '../database/studentCollection'

export const addNewStudent = event => async dispatch => {
	const formData = {
		firstname: event.target.firstname.value,
		lastname: event.target.lastname.value,
		gender: event.target.gender.value,
		classroom: event.target.classroom.value
	}
	addNewStudentData(formData)
	event.target.reset()
	const students = await getAllStudents()
	dispatch({
		type: ADD_NEW_STUDENT,
		payload: {}
	})
	dispatch({
		type: GET_ALL_STUDENTS,
		payload: { students }
	})
}

export const getStudents = () => async dispatch => {
	const students = await getAllStudents()
	if (students.length !== 0) {
		dispatch({
			type: GET_ALL_STUDENTS,
			payload: { students }
		})
	}
}

export const showStudentModal = event => dispatch => {
	const studentId = event.target.getAttribute('data-id')
	dispatch({
		type: GET_SINGLE_STUDENT,
		payload: studentId
	})
}

export const openStudenGraph = event => dispatch => {
	if (event.target.type !== 'button') {
		return
	}
	const student = {
		studentGraphId: event.target.getAttribute('data-id'),
		studentGraphName: event.target.innerText,
		chartToDisplay: 'student'
	}

	dispatch({
		type: DISPLAY_STUDENT_GRAPH,
		payload: student
	})
}

export const openStudenSubjectGraph = event => dispatch => {
	if (event.target.type !== 'button') {
		return
	}
	const subject = {
		subjectGraphId: event.target.getAttribute('data-id'),
		subjectGraphName: event.target.innerText,
		chartToDisplay: 'subject'
	}

	dispatch({
		type: DISPLAY_STUDENT_SUBJECT_GRAPH,
		payload: subject
	})
}
