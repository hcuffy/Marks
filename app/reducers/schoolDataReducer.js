import { DISPLAY_SCHOOL_DATA, HANDLE_SCHOOL_DATA } from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	title: null,
	street: null,
	province: null,
	country: null,
	zip: null,
	year: null
}

export const handleSchoolReducer = (state = initialLoadState, action) => {
	switch (action.type) {
	case HANDLE_SCHOOL_DATA: {
		const { title, street, province, country, zip, year } = action.payload
		return _.assign({}, state, {
			title,
			street,
			province,
			country,
			zip,
			year
		})
	}
	default:
		return state
	}
}

const applySchoolData = (state = initialLoadState, action) => {
	switch (action.type) {
	case DISPLAY_SCHOOL_DATA: {
		const { title, street, province, country, zip, year } = action.payload
		return _.assign({}, state, {
			title,
			street,
			province,
			country,
			zip,
			year
		})
	}
	default:
		return state
	}
}

export default applySchoolData
