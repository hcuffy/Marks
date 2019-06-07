import {
	GET_ALL_NOTES,
	OPEN_STUDENT_NOTES_DROPDOWN,
	OPEN_NOTES_DROPDOWN,
	UPDATE_TEXTAREA,
	CLEAR_NOTE_FIELDS
} from '../constants/actionTypes'
import { addNewNote, getAllNotes, deleteNote } from '../database/notesCollection'

export const addNote = event => async dispatch => {
	event.preventDefault()

	const formData = {
		title: event.target.title.value,
		note: event.target.note.value,
		studentId: event.target.student.value
	}

	addNewNote(formData)
	event.target.reset()
	const notes = await getAllNotes()

	dispatch({
		type: GET_ALL_NOTES,
		payload: { notes }
	})
}

export const getNotes = () => async dispatch => {
	const notes = await getAllNotes()
	if (notes.length !== 0) {
		dispatch({
			type: GET_ALL_NOTES,
			payload: { notes }
		})
	}
}

export const openStudentDropdown = event => dispatch => {
	if (event.target.getAttribute('data-check') !== 'studentDropdown') {
		return
	}

	const student = {
		studentId: event.target.getAttribute('data-id'),
		selectedStudent: event.target.innerText
	}

	dispatch({
		type: OPEN_STUDENT_NOTES_DROPDOWN,
		payload: student
	})
}

export const openNotesDropdown = event => dispatch => {
	if (event.target.getAttribute('data-check') !== 'notesDropdown') {
		return
	}

	dispatch({
		type: OPEN_NOTES_DROPDOWN,
		payload: {
			noteId: event.target.getAttribute('data-id')
		}
	})
}

export const updateTextArea = event => dispatch => {
	dispatch({
		type: UPDATE_TEXTAREA,
		payload: { textBox: event.target.value }
	})
}

export const deleteSingleNote = event => async dispatch => {
	const noteId = event.target.getAttribute('data-id')
	const notes = await deleteNote(noteId)

	dispatch({
		type: UPDATE_TEXTAREA,
		payload: { textBox: '' }
	})

	dispatch({
		type: GET_ALL_NOTES,
		payload: { notes }
	})
}

export const clearNoteField = () => async dispatch => {
	dispatch({
		type: CLEAR_NOTE_FIELDS,
		payload: { noteId: null, selectedNote: null, textBox: null }
	})
}
