import { OPEN_CLOSE_CLASS_LIST, OPEN_CLOSE_SUBJECT_LIST } from '../constants/actionTypes'

export const openCapabilityClassList = event => dispatch => {
	if (event.target.getAttribute('data-check') !== 'classDropdown') {
		return
	}

	dispatch({
		type: OPEN_CLOSE_CLASS_LIST,
		payload: { classroom: event.target.innerText }
	})
}

export const openCapabilitySubjectList = event => dispatch => {
	if (event.target.getAttribute('data-check') !== 'subjectDropdown') {
		return
	}

	dispatch({
		type: OPEN_CLOSE_SUBJECT_LIST,
		payload: { subject: event.target.innerText }
	})
}
