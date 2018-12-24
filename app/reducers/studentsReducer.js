import { ADD_NEW_STUDENT } from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	First_Name: '',
	Last_Name: ''
}

const handleStudentData = (state = initialLoadState, action) => {
	switch (action.type) {
	case ADD_NEW_STUDENT: {
		return _.assign({}, state, {
			First_Name: '',
			Last_Name: ''
		})
	}
	default:
		return state
	}
}

export default handleStudentData
