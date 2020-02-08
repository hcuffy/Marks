import {
	GET_SELECTED_CLASS,
	ADD_NEW_EXAM,
	UPDATE_DROPDOWN_CLASS_LIST,
	DISPLAY_SUBJECT_LIST,
	GET_SINGLE_EXAM,
	UPDATE_EXAMS_LIST,
	EXAM_FORM_VALIDATION,
	EXAM_MODAL_VALIDATION
} from './constants'
import {
	addExamData,
	getAllExams,
	deleteExam,
	updateExamData
} from '../../collections/exam'
import { getOption } from '../students/actions'
import { inputValidation } from '../helpers/formValidation'

export const addNewExam = event => dispatch => {
	event.preventDefault()

	const examData = {
		title: event.target.title.value,
		subjectId: getOption(event, 'subject'),
		date: event.target.date.value,
		weight: event.target.weight.value
	}

	if (inputValidation(_.pick(examData, ['title']))) {
		dispatch({
			type: EXAM_FORM_VALIDATION,
			payload: { isInvalid: true }
		})
	} else {
		addExamData(examData)

		event.target.reset()

		dispatch({
			type: ADD_NEW_EXAM,
			payload: { isInvalid: false }
		})
	}
}

export const getSelectedSubject = event => dispatch => {
	const subject = event.target.value

	dispatch({
		type: GET_SELECTED_CLASS,
		payload: subject
	})
}

export const openClassDropdownList = event => dispatch => {
	if (event.target.getAttribute('data-check') !== 'classDropdown') {
		return
	}

	const classroomId = event.target.getAttribute('data-id')

	dispatch({
		type: UPDATE_DROPDOWN_CLASS_LIST,
		payload: { classroomId }
	})
}

export const displayExamData = event => async dispatch => {
	if (event.target.getAttribute('data-check') !== 'subjectDropdown') {
		return
	}

	const subjectId = event.target.getAttribute('data-id')
	const selectedSubject = event.target.innerText

	const exams = await getAllExams()
	if (exams.length !== 0) {
		dispatch({
			type: DISPLAY_SUBJECT_LIST,
			payload: { exams, subjectId, selectedSubject, openClassDropdown: false }
		})
	}
}

export const showSingleExam = event => dispatch => {
	const examId = event.target.getAttribute('data-id')

	dispatch({
		type: GET_SINGLE_EXAM,
		payload: { examId, isModalInvalid: true }
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
	const inputsToValidate = _.pick(examData, ['title', 'weight'])

	if (inputValidation(inputsToValidate)) {
		dispatch({
			type: EXAM_MODAL_VALIDATION,
			payload: { ...inputsToValidate, isModalInvalid: true }
		})
	} else {
		const exams = await updateExamData(examData)

		dispatch({
			type: GET_SINGLE_EXAM,
			payload: { examId: examData.examId, isModalInvalid: false }
		})

		if (exams.length > 0) {
			dispatch({
				type: UPDATE_EXAMS_LIST,
				payload: { exams, isModalInvalid: false }
			})
		}
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
		payload: { examId: examData.examId }
	})

	if (exams.length > 0) {
		dispatch({
			type: UPDATE_EXAMS_LIST,
			payload: { exams }
		})
	}
}
