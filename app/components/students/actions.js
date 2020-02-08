import {
	ADD_NEW_STUDENT,
	GET_ALL_STUDENTS,
	GET_SINGLE_STUDENT,
	DISPLAY_STUDENT_GRAPH,
	DISPLAY_STUDENT_SUBJECT_GRAPH,
	STUDENT_FORM_VALIDATION,
	STUDENT_MODAL_VALIDATION
} from './constants'
import {
	addNewStudentData,
	getAllStudents,
	deleteStudent,
	updateStudentData
} from '../../collections/student'
import { inputValidation } from '../helpers/formValidation'

export const getOption = (event, propToGet) => {
	const index = event.target[propToGet].selectedIndex

	return event.target[propToGet].options[index].getAttribute('data-id')
}

export const addNewStudent = event => async dispatch => {
	event.preventDefault()

	const formData = {
		firstname: event.target.firstname.value,
		lastname: event.target.lastname.value,
		gender: getOption(event, 'gender'),
		classroom: getOption(event, 'classroom')
	}

	const inputsToValidate = _.pick(formData, ['firstname', 'lastname'])

	if (inputValidation(inputsToValidate)) {
		dispatch({
			type: STUDENT_FORM_VALIDATION,
			payload: { ...inputsToValidate, isInvalid: true }
		})
	} else {
		addNewStudentData(formData)
		event.target.reset()
		const students = await getAllStudents()

		dispatch({
			type: ADD_NEW_STUDENT,
			payload: { firstname: '', lastname: '', isInvalid: false }
		})

		dispatch({
			type: GET_ALL_STUDENTS,
			payload: { students, isInvalid: false }
		})
	}
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
		payload: { studentId, isModalInvalid: false }
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
	event.preventDefault()

	const studentId = event.target.studentId.getAttribute('data-id')

	const studentData = {
		firstname: event.target.firstname.value,
		lastname: event.target.lastname.value,
		gender: getOption(event, 'gender'),
		classroom: getOption(event, 'classroom'),
		id: studentId
	}
	const inputsToValidate = _.pick(studentData, ['firstname', 'lastname'])

	if (inputValidation(inputsToValidate)) {
		dispatch({
			type: STUDENT_FORM_VALIDATION,
			payload: { ...inputsToValidate, isModalInvalid: true }
		})
	} else {
		const students = await updateStudentData(studentData)

		dispatch({
			type: GET_SINGLE_STUDENT,
			payload: { studentId, isModalInvalid: false }
		})

		dispatch({
			type: GET_ALL_STUDENTS,
			payload: { students, isModalInvalid: false }
		})
	}
}

export const deleteSingleStudent = event => async dispatch => {
	const studentId = event.target.getAttribute('data-id')
	const students = await deleteStudent(studentId)

	dispatch({
		type: GET_SINGLE_STUDENT,
		payload: { studentId }
	})

	dispatch({
		type: GET_ALL_STUDENTS,
		payload: { students }
	})
}
