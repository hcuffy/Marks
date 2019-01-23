import {
	GET_SELECTED_CLASS,
	ADD_NEW_EXAM,
	UPDATE_DROPDOWN_CLASS_LIST,
	DISPLAY_SUBJECT_LIST,
	GET_SINGLE_EXAM
} from '../constants/actionTypes'
import { addExamData, getExamData } from '../database/examCollection'

export const addNewExam = event => {
	event.preventDefault()
	const selectedSubjectIndex = event.target.Subject.selectedIndex
	const examData = {
		Title: event.target.Title.value,
		// eslint-disable-next-line max-len
		SubjectId: event.target.Subject.options[selectedSubjectIndex].getAttribute('data-id'),
		Date: event.target.Date.value,
		Weight: event.target.Weight.value
	}
	addExamData(examData)
	return {
		type: ADD_NEW_EXAM,
		payload: {}
	}
}

export const getSelectedSubject = event => {
	const subject = event.target.value
	return {
		type: GET_SELECTED_CLASS,
		payload: subject
	}
}

export const openClassDropdownList = event => {
	const classroom = event.target.innerText
	return {
		type: UPDATE_DROPDOWN_CLASS_LIST,
		payload: classroom
	}
}

export const displayExamData = event => async dispatch => {
	const subjectId = event.target.getAttribute('data-id')
	const exams = await getExamData()
	if (exams.length !== 0) {
		dispatch({
			type: DISPLAY_SUBJECT_LIST,
			payload: { exams, subjectId }
		})
	}
}

export const showSingleExam = event => {
	const examId = event.target.getAttribute('data-id')
	return {
		type: GET_SINGLE_EXAM,
		payload: examId
	}
}
