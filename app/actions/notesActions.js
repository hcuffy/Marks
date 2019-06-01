import {
	GET_ALL_NOTES,
	OPEN_STUDENT_NOTES_DROPDOWN,
	OPEN_NOTES_DROPDOWN,
	UPDATE_TEXTAREA
} from '../constants/actionTypes'
import { addNewNote, getAllNotes } from '../database/notesCollection'

export const addNote = event => async dispatch => {
	event.preventDefault()

	const formData = {
		title: event.target.title.value,
		note: event.target.note.value,
		studentId: event.target.student.value
	}
	console.log(event.target)

	return
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

	const note = {
		noteId: event.target.getAttribute('data-id')
	}

	dispatch({
		type: OPEN_NOTES_DROPDOWN,
		payload: note
	})
}

export const updateTextArea = event => dispatch => {
	const updatedNote = { textBox: event.target.value }

	dispatch({
		type: UPDATE_TEXTAREA,
		payload: updatedNote
	})
}
