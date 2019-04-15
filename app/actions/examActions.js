import {
	GET_SELECTED_CLASS,
	ADD_NEW_EXAM,
	UPDATE_DROPDOWN_CLASS_LIST,
	DISPLAY_SUBJECT_LIST,
	GET_SINGLE_EXAM,
	UPDATE_EXAMS_LIST
} from '../constants/actionTypes'
import {
	addExamData,
	getExamData,
	deleteExam,
	updateExamData
} from '../database/examCollection'

export const addNewExam = event => dispatch => {
	event.preventDefault()

	const subjectIndex = event.target.subject.selectedIndex
	const examData = {
		title: event.target.title.value,
		subjectId: event.target.subject.options[subjectIndex].getAttribute('data-id'),
		date: event.target.date.value,
		weight: event.target.weight.value
	}
	addExamData(examData)
	event.target.reset()
	dispatch({
		type: ADD_NEW_EXAM,
		payload: {}
	})
}

export const getSelectedSubject = event => dispatch => {
	const subject = event.target.value
	dispatch({
		type: GET_SELECTED_CLASS,
		payload: subject
	})
}

export const openClassDropdownList = event => dispatch => {
	const classroom = event.target.innerText
	dispatch({
		type: UPDATE_DROPDOWN_CLASS_LIST,
		payload: classroom
	})
}

export const displayExamData = event => async dispatch => {
	const subjectId = event.target.getAttribute('data-id')
	const selectedSubject = event.target.innerText

	const exams = await getExamData()
	if (exams.length !== 0) {
		dispatch({
			type: DISPLAY_SUBJECT_LIST,
			payload: { exams, subjectId, selectedSubject }
		})
	}
}

export const showSingleExam = event => dispatch => {
	const examId = event.target.getAttribute('data-id')
	dispatch({
		type: GET_SINGLE_EXAM,
		payload: examId
	})
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
