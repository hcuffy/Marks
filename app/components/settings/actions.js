import {
	UPDATE_GRADING_DATA,
	GET_SYSTEM_TYPE,
	HANDLE_SCHOOL_DATA,
	DISPLAY_SCHOOL_DATA
} from './constants'
import {
	saveGradeSystem,
	getSystemType,
	updateGradeType,
	addAddress,
	getAddressData
} from '../../database/settings'

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

export const saveSchoolAddress = event => dispatch => {
	event.preventDefault()

	const formData = {
		title: event.target.title.value,
		street: event.target.street.value,
		province: event.target.province.value,
		country: event.target.country.value,
		zip: event.target.zip.value,
		year: event.target.year.value
	}

	addAddress(formData)

	dispatch({
		type: HANDLE_SCHOOL_DATA,
		payload: formData
	})
}

export const displayAddress = () => async dispatch => {
	const data = await getAddressData()
	if (data.length !== 0) {
		dispatch({
			type: DISPLAY_SCHOOL_DATA,
			payload: data[0]
		})
	}
}
