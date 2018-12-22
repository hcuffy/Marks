import { ADD_NEW_STUDENT } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	First_Name: '',
	Last_Name: '',
	Gender: '',
	Classroom: ''
}

const handleStudentData = (state = initialLoadState, action) => {
	switch (action.type) {
	case ADD_NEW_STUDENT: {
		return _.assign({}, state, {
			First_Name: '',
			Last_Name: '',
			Gender: '',
			Classroom: ''
		})
	}
	default:
		return state
	}
}

export default handleStudentData
