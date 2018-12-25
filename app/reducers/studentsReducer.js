import { ADD_NEW_STUDENT, GET_ALL_STUDENTS } from '../constants/actionTypes'

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
	case GET_ALL_STUDENTS: {
		return _.assign({}, state, action.payload)
	}
	default:
		return state
	}
}

export default handleStudentData
