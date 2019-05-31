import { OPEN_STUDENT_NOTES_DROPDOWN } from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	studentDropdown: false,
	notesDropdown: false
}

const applyNotesData = (state = initialLoadState, action) => {
	switch (action.type) {
	case OPEN_STUDENT_NOTES_DROPDOWN: {
		const studentDropdown = !state.studentDropdown

		return _.assign({}, state, {
			studentNotesDropdown
		})
	}

	default:
		return state
	}
}

export default applyNotesData
