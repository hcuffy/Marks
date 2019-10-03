import {
	DISPLAY_SCHOOL_DATA,
	HANDLE_SCHOOL_DATA,
	UPDATE_GRADING_DATA,
	GET_SYSTEM_TYPE
} from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	title: null,
	street: null,
	province: null,
	country: null,
	zip: null,
	city: null,
	year: null
}

const gradingLoadState = { note: true, points: false, percent: false }

export const handleSchoolReducer = (state = initialLoadState, action) => {
	console.log(action.payload)
	switch (action.type) {
	case HANDLE_SCHOOL_DATA: {
		const { title, street, province, country, zip, city, year } = action.payload

		return _.assign({}, state, {
			title,
			street,
			province,
			country,
			zip,
			city,
			year
		})
	}
	default:
		return state
	}
}

export const applyGradeSystem = (state = gradingLoadState, action) => {
	switch (action.type) {
	case UPDATE_GRADING_DATA: {
		const { note, points, percent } = action.payload
		return _.assign({}, state, { note, points, percent })
	}
	case GET_SYSTEM_TYPE: {
		const { note, points, percent } = action.payload
		return _.assign({}, state, { note, points, percent })
	}
	default:
		return state
	}
}

const applyAddressData = (state = initialLoadState, action) => {
	console.log(action.payload)
	switch (action.type) {
	case DISPLAY_SCHOOL_DATA: {
		const { title, street, province, country, zip, city, year } = action.payload
		return _.assign({}, state, {
			title,
			street,
			province,
			country,
			zip,
			city,
			year
		})
	}

	default:
		return state
	}
}

export default applyAddressData
