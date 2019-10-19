import {
	OPEN_CLOSE_CLASS_LIST,
	OPEN_CLOSE_STUDENT_LIST,
	GET_ALL_QUESTIONS,
	OPEN_CLOSE_QUESTION_LIST,
	UPDATE_QUESTION_SET,
	UPDATE_ANSWERS
} from './constants'
import { getAllQuestions, updateQuestionData } from '../../collections/capability'
import { updateSingleAnswer, getAllAnswers } from '../../collections/capabilityAnswers'

const isNull = require('lodash/isNull')
const includes = require('lodash/includes')

export const openCapabilityClassList = event => dispatch => {
	if (event.target.getAttribute('data-check') !== 'classDropdown') {
		return
	}

	dispatch({
		type: OPEN_CLOSE_CLASS_LIST,
		payload: {
			classroom: event.target.innerText,
			classroomId: event.target.getAttribute('data-id')
		}
	})
}

export const openCapabilityStudentList = event => async dispatch => {
	event.persist()
	if (event.target.getAttribute('data-check') !== 'studentDropdown') {
		return
	}

	const questions = await getAllQuestions()

	dispatch({
		type: OPEN_CLOSE_STUDENT_LIST,
		payload: {
			studentName: event.target.innerText,
			studentId: event.target.getAttribute('data-id'),
			questions
		}
	})
}

export const getQuestions = () => async dispatch => {
	const questions = await getAllQuestions()
	dispatch({
		type: GET_ALL_QUESTIONS,
		payload: { questions }
	})
}

export const openQuestionList = event => dispatch => {
	if (
		event.target.getAttribute('data-check') !== 'openButton' ||
		isNull(event.target.getAttribute('data-id'))
	) {
		return
	}

	dispatch({
		type: OPEN_CLOSE_QUESTION_LIST,
		payload: {}
	})
}

export const updateQuestionSet = event => async dispatch => {
	if (event.target.getAttribute('data-check') !== 'questionDropdown') {
		return
	}

	const questionSetData = {
		classroomId: event.target.getAttribute('data-id'),
		questionSet: event.target.name
	}

	const questions = await updateQuestionData(questionSetData)

	dispatch({
		type: UPDATE_QUESTION_SET,
		payload: { questions }
	})
}

export const handleCapabilityAnswers = event => async dispatch => {
	const formData = {
		classroomId: event.target.getAttribute('classroom-id'),
		questionId: event.target.getAttribute('data-id'),
		studentId: event.target.getAttribute('student-id'),
		optionTag: event.target.getAttribute('option-tag')
	}

	if (includes(formData, null)) {
		return
	}
	const answers = await updateSingleAnswer(formData)

	dispatch({
		type: UPDATE_ANSWERS,
		payload: { answers }
	})
}

export const getAnswers = () => async dispatch => {
	const answers = await getAllAnswers()
	dispatch({
		type: UPDATE_ANSWERS,
		payload: { answers }
	})
}
