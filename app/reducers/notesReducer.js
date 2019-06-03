import {
	GET_ALL_NOTES,
	OPEN_STUDENT_NOTES_DROPDOWN,
	OPEN_NOTES_DROPDOWN,
	UPDATE_TEXTAREA
} from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	studentDropdown: false,
	notesDropdown: false,
	studentId: null,
	noteId: null,
	selectedStudent: null,
	selectedNote: null,
	textBox: null
}

const applyNotesData = (state = initialLoadState, action) => {
	switch (action.type) {
	case GET_ALL_NOTES: {
		return _.assign({}, state, action.payload)
	}
	case OPEN_STUDENT_NOTES_DROPDOWN: {
		const studentDropdown = !state.studentDropdown
		const notesDropdown = false

		const { studentId, selectedStudent } = action.payload

		return _.assign({}, state, {
			studentDropdown,
			notesDropdown,
			studentId,
			selectedStudent
		})
	}
	case OPEN_NOTES_DROPDOWN: {
		const notesDropdown = !state.notesDropdown
		const textBox = null
		const studentDropdown = false

		return _.assign(
			{},
			state,
			{
				notesDropdown,
				textBox,
				studentDropdown
			},
			action.payload
		)
	}
	case UPDATE_TEXTAREA: {
		return _.assign({}, state, action.payload)
	}
	default:
		return state
	}
}

export default applyNotesData
