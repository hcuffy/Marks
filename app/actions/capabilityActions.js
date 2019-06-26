import {
	OPEN_CLOSE_CLASS_LIST,
	OPEN_CLOSE_STUDENT_LIST,
	GET_ALL_ANSWERS
} from '../constants/actionTypes'
import { getAllAnswers } from '../database/capabilityCollection'

export const openCapabilityClassList = event => dispatch => {
	if (event.target.getAttribute('data-check') !== 'classDropdown') {
		return
	}

	dispatch({
		type: OPEN_CLOSE_CLASS_LIST,
		payload: { classroom: event.target.innerText }
	})
}

export const openCapabilityStudentList = event => dispatch => {
	if (event.target.getAttribute('data-check') !== 'studentDropdown') {
		return
	}

	dispatch({
		type: OPEN_CLOSE_STUDENT_LIST,
		payload: { subject: event.target.innerText }
	})
}

export const getAnswers = () => async dispatch => {
	const answers = await getAllAnswers()
	dispatch({
		type: GET_ALL_ANSWERS,
		payload: { answers }
	})
}
