import {
	OPEN_CLOSE_CLASS_LIST,
	OPEN_CLOSE_STUDENT_LIST,
	GET_ALL_ANSWERS,
	OPEN_CLOSE_QUESTION_LIST,
	UPDATE_QUESTION_SET
} from '../constants/actionTypes'
import { getAllAnswers, updateAnswerData } from '../database/capabilityCollection'

const isNull = require('lodash/isNull')

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

export const openCapabilityStudentList = event => dispatch => {
	if (event.target.getAttribute('data-check') !== 'studentDropdown') {
		return
	}

	dispatch({
		type: OPEN_CLOSE_STUDENT_LIST,
		payload: { singleStudent: event.target.innerText }
	})
}

export const getAnswers = () => async dispatch => {
	const answers = await getAllAnswers()
	dispatch({
		type: GET_ALL_ANSWERS,
		payload: { answers }
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

	const answers = await updateAnswerData(questionSetData)

	dispatch({
		type: UPDATE_QUESTION_SET,
		payload: { answers }
	})
}
