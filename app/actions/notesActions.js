import { GET_ALL_NOTES } from '../constants/actionTypes'
import { addNewNote, getAllNotes } from '../database/notesCollection'

export const addNote = event => async dispatch => {
	event.preventDefault()

	const formData = {
		title: event.target.title.value,
		note: event.target.note.value
	}

	addNewNote(formData)
	event.target.reset()
	const notes = await getAllNotes()

	dispatch({
		type: GET_ALL_NOTES,
		payload: { notes }
	})
}
