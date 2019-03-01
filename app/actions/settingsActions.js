import { HANDLE_GRADING_DATA } from '../constants/actionTypes'

const _ = require('lodash')

export const updateGradingSystem = event => dispatch => {
	const systemType = {
		note: false,
		points: false,
		percent: false
	}

	dispatch({
		type: HANDLE_GRADING_DATA,
		payload: { ..._.set(systemType, event.target.value, true) }
	})
}
