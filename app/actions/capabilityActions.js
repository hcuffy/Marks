import { OPEN_CLOSE_CLASS_LIST } from '../constants/actionTypes'

export const openCapabilityClassList = event => dispatch => {
	if (event.target.getAttribute('data-check') !== 'classDropdown') {
		return
	}
	const data = {
		classroom: event.target.innerText
	}

	dispatch({
		type: OPEN_CLOSE_CLASS_LIST,
		payload: data
	})
}
