import {
	OPEN_CLOSE_ROOM_MODAL,
	GET_CLASSROOM_DATA,
	UPDATE_CLASSROOM,
	OPEN_CLOSE_SUBJECT_MODAL,
	GET_SINGLE_SUBJECT,
	GET_SINGLE_EXAM,
	UPDATE_EXAMS_LIST,
	GET_SINGLE_STUDENT,
	GET_ALL_STUDENTS
} from '../constants/actionTypes'
import { deleteClassroom, updateRoomData } from '../database/classroomCollection'
import { deleteSubject, updateSubjectData } from '../database/subjectCollection'
import { deleteExam, updateExamData } from '../database/examCollection'
import { deleteStudent } from '../database/studentCollection'

export const roomModalDisplay = event => {
	event.preventDefault()
	const roomId = {
		id: event.target.id
	}

	return {
		type: OPEN_CLOSE_ROOM_MODAL,
		payload: roomId
	}
}

export const deleteRoom = event => async dispatch => {
	const roomData = {
		id: event.target.id,
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
		Name: event.target.Name.value,
		Teacher: event.target.Teacher.value,
		Code: event.target.Code.value,
		Subject_Teacher: event.target.Subject_Teacher.value,
		OldName: event.target.OldName.id,
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

export const subjectModalDisplay = event => {
	event.preventDefault()
	const subjectId = {
		id: event.target.id
	}

	return {
		type: OPEN_CLOSE_SUBJECT_MODAL,
		payload: subjectId
	}
}

export const updateSubject = event => async dispatch => {
	event.preventDefault()
	const subjectData = {
		Name: event.target.Name.value,
		Abbreviation: event.target.Abbreviation.value,
		ClassroomId: event.target.ClassroomId.id,
		SubjectId: event.target.SubjectId.id
	}

	const subjectDoc = await updateSubjectData(subjectData)

	dispatch({
		type: OPEN_CLOSE_SUBJECT_MODAL,
		payload: { id: subjectData.SubjectId }
	})

	if (subjectDoc.length > 0) {
		dispatch({
			type: GET_SINGLE_SUBJECT,
			payload: { subject: subjectDoc[0].Room }
		})
	}
}

export const deleteSingleSubject = event => async dispatch => {
	const subjectData = {
		id: event.target.id
	}

	const subjectDoc = await deleteSubject(subjectData)

	dispatch({
		type: OPEN_CLOSE_SUBJECT_MODAL,
		payload: { id: subjectData.SubjectId }
	})

	if (subjectDoc.length > 0) {
		dispatch({
			type: GET_SINGLE_SUBJECT,
			payload: { subject: subjectDoc[0].Room }
		})
	}
}

export const deleteSingleExam = event => async dispatch => {
	const examData = {
		examId: event.target.id,
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
		Title: event.target.Title.value,
		Date: event.target.Date.value,
		Weight: event.target.Weight.value,
		SubjectId: event.target.SubjectId.id,
		ExamId: event.target.ExamId.id
	}

	const exams = await updateExamData(examData)

	dispatch({
		type: GET_SINGLE_EXAM,
		payload: examData.ExamId
	})

	if (exams.length > 0) {
		dispatch({
			type: UPDATE_EXAMS_LIST,
			payload: exams
		})
	}
}

export const deleteSingleStudent = event => async dispatch => {
	const studentId = event.target.id

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
