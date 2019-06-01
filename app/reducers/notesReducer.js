import { OPEN_STUDENT_NOTES_DROPDOWN } from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	studentDropdown: false,
	notesDropdown: false,
	studentId: null,
	selectedStudent: null
}

const applyNotesData = (state = initialLoadState, action) => {
	switch (action.type) {
	case OPEN_STUDENT_NOTES_DROPDOWN: {
		const studentDropdown = !state.studentDropdown
		const { studentId, selectedStudent } = action.payload

		return _.assign({}, state, {
			studentDropdown,
			studentId,
			selectedStudent
		})
	}

	default:
		return state
	}
}

export default applyNotesData
