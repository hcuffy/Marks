import { DISPLAY_SCHOOL_DATA, HANDLE_SCHOOL_DATA } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	Title: null,
	Street: null,
	Province: null,
	Country: null,
	Zip: null,
	Year: null
}

export const handleSchoolReducer = (state = initialLoadState, action) => {
	switch (action.type) {
	case HANDLE_SCHOOL_DATA: {
		const { Title, Street, Province, Country, Zip, Year } = action.payload
		return _.assign({}, state, {
			Title,
			Street,
			Province,
			Country,
			Zip,
			Year
		})
	}
	default:
		return state
	}
}

const displaySchoolData = (state = initialLoadState, action) => {
	switch (action.type) {
	case DISPLAY_SCHOOL_DATA: {
		const { Title, Street, Province, Country, Zip, Year } = action.payload
		return _.assign({}, state, {
			Title,
			Street,
			Province,
			Country,
			Zip,
			Year
		})
	}
	default:
		return state
	}
}

export default displaySchoolData
