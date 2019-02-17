import {
	OPEN_CLOSE_ROOM_MODAL,
	GET_CLASSROOM_DATA,
	UPDATE_CLASSROOM,
	OPEN_CLOSE_SUBJECT_MODAL,
	GET_SINGLE_SUBJECT,
	GET_SINGLE_EXAM,
	UPDATE_EXAMS_LIST,
	GET_SINGLE_STUDENT,
	GET_ALL_STUDENTS,
	GET_SUBJECT_LIST
} from '../constants/actionTypes'
import { deleteClassroom, updateRoomData } from '../database/classroomCollection'
import {
	deleteSubject,
	updateSubjectData,
	getAllSubjects
} from '../database/subjectCollection'
import { deleteExam, updateExamData } from '../database/examCollection'
import { deleteStudent, updateStudentData } from '../database/studentCollection'

export const roomModalDisplay = event => dispatch => {
	event.preventDefault()
	const roomId = {
		id: event.target.getAttribute('data-id')
	}

	dispatch({
		type: OPEN_CLOSE_ROOM_MODAL,
		payload: roomId
	})
}

export const deleteRoom = event => async dispatch => {
	const roomData = {
		id: event.target.getAttribute('data-id'),
		showModal: true
	}

	const docs = await deleteClassroom(roomData)

	if (docs) {
		dispatch({
			type: GET_CLASSROOM_DATA,
			payload: { classData: docs }
		})
	}

	dispatch({
		type: UPDATE_CLASSROOM,
		payload: roomData
	})
}

export const updateRoom = event => async dispatch => {
	event.preventDefault()
	const roomData = {
		name: event.target.name.value,
		teacher: event.target.teacher.value,
		code: event.target.code.value,
		substitute: event.target.substitute.value,
		oldName: event.target.oldName.getAttribute('data-id'),
		id: '',
		showModal: true
	}

	const docs = await updateRoomData(roomData)
	if (docs) {
		roomData.showModal = false
		dispatch({
			type: GET_CLASSROOM_DATA,
			payload: { classData: docs }
		})
	}

	dispatch({
		type: UPDATE_CLASSROOM,
		payload: roomData
	})
}

export const subjectModalDisplay = event => dispatch => {
	event.preventDefault()
	const subjectId = {
		id: event.target.getAttribute('data-id')
	}

	dispatch({
		type: OPEN_CLOSE_SUBJECT_MODAL,
		payload: subjectId
	})
}

export const updateSubject = event => async dispatch => {
	event.preventDefault()
	const subjectData = {
		name: event.target.name.value,
		abbreviation: event.target.abbreviation.value,
		classroomId: event.target.classroomId.getAttribute('data-id'),
		subjectId: event.target.subjectId.getAttribute('data-id')
	}

	const subjectDoc = await updateSubjectData(subjectData)
	const data = await getAllSubjects()

	dispatch({
		type: OPEN_CLOSE_SUBJECT_MODAL,
		payload: { id: subjectData.subjectId }
	})

	if (subjectDoc.length > 0) {
		dispatch({
			type: GET_SINGLE_SUBJECT,
			payload: { subject: subjectDoc[0].room }
		})
	}
	dispatch({
		type: GET_SUBJECT_LIST,
		payload: { data }
	})
}

export const deleteSingleSubject = event => async dispatch => {
	const subjectData = {
		id: event.target.getAttribute('data-id')
	}

	const subjectDoc = await deleteSubject(subjectData)

	dispatch({
		type: OPEN_CLOSE_SUBJECT_MODAL,
		payload: { id: subjectData.subjectId }
	})

	if (subjectDoc.length > 0) {
		dispatch({
			type: GET_SINGLE_SUBJECT,
			payload: { subject: subjectDoc[0].room }
		})
	}
}

export const deleteSingleExam = event => async dispatch => {
	const examData = {
		examId: event.target.getAttribute('data-id'),
		subjectId: event.target.name
	}

	const exams = await deleteExam(examData)

	dispatch({
		type: GET_SINGLE_EXAM,
		payload: examData.examId
	})

	if (exams.length > 0) {
		dispatch({
			type: UPDATE_EXAMS_LIST,
			payload: exams
		})
	}
}

export const updateExam = event => async dispatch => {
	event.preventDefault()
	const examData = {
		title: event.target.title.value,
		date: event.target.date.value,
		weight: event.target.weight.value,
		subjectId: event.target.subjectId.getAttribute('data-id'),
		examId: event.target.examId.getAttribute('data-id')
	}

	const exams = await updateExamData(examData)

	dispatch({
		type: GET_SINGLE_EXAM,
		payload: examData.examId
	})

	if (exams.length > 0) {
		dispatch({
			type: UPDATE_EXAMS_LIST,
			payload: exams
		})
	}
}

export const deleteSingleStudent = event => async dispatch => {
	const studentId = event.target.getAttribute('data-id')
	const students = await deleteStudent(studentId)

	dispatch({
		type: GET_SINGLE_STUDENT,
		payload: studentId
	})
	if (students.length > 0) {
		dispatch({
			type: GET_ALL_STUDENTS,
			payload: { students }
		})
	}
}

export const updateStudent = event => async dispatch => {
	event.preventDefault()
	const studentData = {
		firstname: event.target.firstname.value,
		lastname: event.target.lastname.value,
		gender: event.target.gender.value,
		classroom: event.target.classroom.value,
		id: event.target.studentId.getAttribute('data-id')
	}

	const students = await updateStudentData(studentData)

	dispatch({
		type: GET_SINGLE_STUDENT,
		payload: studentData.getAttribute('data-id')
	})

	if (students.length > 0) {
		dispatch({
			type: GET_ALL_STUDENTS,
			payload: { students }
		})
	}
}
