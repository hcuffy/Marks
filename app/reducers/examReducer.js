import {
	GET_SELECTED_CLASS,
	UPDATE_DROPDOWN_CLASS_LIST,
	UPDATE_DROPDOWN_SUBJECT_LIST
} from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	subject: '',
	openClassDropdown: false,
	openSubjectDropdown: false,
	classDropdownSubject: 'Subject'
}

const filterExam = (state = initialLoadState, action) => {
	switch (action.type) {
	case GET_SELECTED_CLASS: {
		const subject = action.payload
		return _.assign({}, state, { subject })
	}
	case UPDATE_DROPDOWN_CLASS_LIST: {
		const openClassDropdown = !state.openClassDropdown
		const openSubjectDropdown = state.openClassDropdown
		const classDropdownSubject = action.payload
		return _.assign({}, state, {
			openClassDropdown,
			classDropdownSubject,
			openSubjectDropdown
		})
	}
	case UPDATE_DROPDOWN_SUBJECT_LIST: {
		const openClassDropdown = false
		const openSubjectDropdown = true
		const classDropdownSubject = action.payload
		return _.assign({}, state, {
			openClassDropdown,
			openSubjectDropdown,
			classDropdownSubject
		})
	}

	default:
		return state
	}
}

export default filterExam
