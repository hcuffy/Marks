import {
	GET_ALL_NOTES,
	OPEN_STUDENT_NOTES_DROPDOWN,
	OPEN_NOTES_DROPDOWN,
	UPDATE_TEXTAREA,
	UPDATE_TITLE,
	CLEAR_NOTE_FIELDS,
	UPDATE_NOTE
} from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	studentDropdown: false,
	notesDropdown: false,
	studentId: null,
	noteId: null,
	selectedStudent: null,
	selectedNote: null,
	textBox: null,
	textField: null
}

const applyNotesData = (state = initialLoadState, action) => {
	switch (action.type) {
	case GET_ALL_NOTES: {
		return _.assign({}, state, action.payload)
	}
	case OPEN_STUDENT_NOTES_DROPDOWN: {
		const studentDropdown = !state.studentDropdown

		return _.assign({}, state, { studentDropdown }, action.payload)
	}
	case OPEN_NOTES_DROPDOWN: {
		const notesDropdown = !state.notesDropdown

		return _.assign({}, state, { notesDropdown }, action.payload)
	}
	case UPDATE_TEXTAREA: {
		return _.assign({}, state, action.payload)
	}
	case UPDATE_TITLE: {
		return _.assign({}, state, action.payload)
	}
	case CLEAR_NOTE_FIELDS: {
		return _.assign({}, state, action.payload)
	}
	case UPDATE_NOTE: {
		return _.assign({}, state, action.payload)
	}
	default:
		return state
	}
}

export default applyNotesData
