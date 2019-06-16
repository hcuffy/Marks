import {
	ADD_NEW_STUDENT,
	GET_ALL_STUDENTS,
	GET_SINGLE_STUDENT,
	DISPLAY_STUDENT_GRAPH,
	DISPLAY_STUDENT_SUBJECT_GRAPH
} from '../../constants/actionTypes'
import {
	addNewStudentData,
	getAllStudents,
	deleteStudent,
	updateStudentData
} from '../../../test/mockCollections/students'

export const addNewStudent = event => async dispatch => {
	const genderIndex = event.target.gender.selectedIndex
	const formData = {
		firstname: event.target.firstname.value,
		lastname: event.target.lastname.value,
		gender: event.target.gender.options[genderIndex].getAttribute('data-id'),
		classroom: event.target.classroom.value
	}

	addNewStudentData(formData)

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

export const openStudentGraph = event => dispatch => {
	if (event.target.getAttribute('data-check') !== 'studentDropdown') {
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

export const openStudentSubjectGraph = event => dispatch => {
	if (event.target.getAttribute('data-check') !== 'subjectDropdown') {
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

export const updateStudent = event => async dispatch => {
	const genderIndex = event.target.gender.selectedIndex
	const studentId = event.target.studentId.getAttribute('data-id')

	const studentData = {
		firstname: event.target.firstname.value,
		lastname: event.target.lastname.value,
		gender: event.target.gender.options[genderIndex].getAttribute('data-id'),
		classroom: event.target.classroom.value,
		id: studentId
	}

	const students = await updateStudentData(studentData)

	dispatch({
		type: GET_SINGLE_STUDENT,
		payload: studentId
	})

	dispatch({
		type: GET_ALL_STUDENTS,
		payload: { students }
	})
}

export const deleteSingleStudent = event => async dispatch => {
	const studentId = event.target.getAttribute('data-id')
	const students = await deleteStudent(studentId)

	dispatch({
		type: GET_SINGLE_STUDENT,
		payload: studentId
	})

	dispatch({
		type: GET_ALL_STUDENTS,
		payload: { students }
	})
}
