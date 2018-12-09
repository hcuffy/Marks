import {
	GET_SELECTED_CLASS,
	ADD_NEW_EXAM,
	UPDATE_DROPDOWN_CLASS_LIST,
	UPDATE_DROPDOWN_SUBJECT_LIST
} from './actionTypes'
import { addExamData } from '../database/examCollection'

export const addNewExam = event => {
	event.preventDefault()
	const selectedSubjectIndex = event.target.Subject.selectedIndex
	const examData = {
		Title: event.target.Title.value,
		SubjectId: event.target.Subject.options[selectedSubjectIndex].id,
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
	const subject = event.target.innerText

	return {
		type: UPDATE_DROPDOWN_CLASS_LIST,
		payload: subject
	}
}

export const openSubjectDropList = event => {
	const subject = event.target.innerText

	return {
		type: UPDATE_DROPDOWN_SUBJECT_LIST,
		payload: subject
	}
}
