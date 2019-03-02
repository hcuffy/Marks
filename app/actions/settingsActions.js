import { UPDATE_GRADING_DATA, GET_SYSTEM_TYPE } from '../constants/actionTypes'
import {
	saveGradeSystem,
	getSystemType,
	updateGradeType
} from '../database/settingsCollection'

const _ = require('lodash')

export const updateGradingSystem = event => async dispatch => {
	const systemType = {
		note: false,
		points: false,
		percent: false
	}
	const newSystemType = _.set(systemType, event.target.value, true)
	const settings = await updateGradeType(newSystemType)

	dispatch({
		type: UPDATE_GRADING_DATA,
		payload: { ...settings[0] }
	})
}

export const getGradingSystem = () => async dispatch => {
	const defaultSystemType = [
		{
			note: true,
			points: false,
			percent: false
		}
	]
	const systemType = await getSystemType()

	if (systemType.length === 0) {
		saveGradeSystem(defaultSystemType)
		_.assign(systemType, defaultSystemType)
	}

	dispatch({
		type: GET_SYSTEM_TYPE,
		payload: { ...systemType[0] }
	})
}
