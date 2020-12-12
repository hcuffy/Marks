import _ from 'lodash';
import {actions} from './constants';
import {
    addNewNote,
    getAllNotes,
    deleteNote,
    updateNoteData
} from '../../collections/notes';
import {inputValidation} from '../helpers/formValidation';

export const addNote = event => async dispatch => {
    event.preventDefault();

    const formData = {
        title:     event.target.title.value,
        note:      event.target.note.value,
        studentId: event.target.student.value
    };
    event.target.student.value;

    const inputsToValidate = _.omit(formData, ['studentId']);

    if (inputValidation(inputsToValidate)) {
        dispatch({
            type:    actions.NOTES_FORM_VALIDATION,
            payload: {...inputsToValidate, isInvalid: true}
        });
    } else {
        addNewNote(formData);

        event.target.reset();

        const notes = await getAllNotes();

        dispatch({
            type:    actions.GET_ALL_NOTES,
            payload: {notes, isInvalid: false}
        });
    }
};

export const getNotes = () => async dispatch => {
    const notes = await getAllNotes();

    if (notes.length !== 0) {
        dispatch({
            type:    actions.GET_ALL_NOTES,
            payload: {notes}
        });
    }
};

export const openStudentDropdown = event => dispatch => {
    if (event.target.getAttribute('data-check') !== 'studentDropdown') {
        return;
    }

    const student = {
        studentId:       event.target.getAttribute('data-id'),
        selectedStudent: event.target.innerText,
        notesDropdown:   false,
        isInvalid:       false
    };

    dispatch({
        type:    actions.OPEN_STUDENT_NOTES_DROPDOWN,
        payload: student
    });
};

export const openNotesDropdown = event => dispatch => {
    if (event.target.getAttribute('data-check') !== 'notesDropdown') {
        return;
    }

    dispatch({
        type:    actions.OPEN_NOTES_DROPDOWN,
        payload: {
            noteId:          event.target.getAttribute('data-id'),
            textBox:         null,
            textField:       null,
            studentDropdown: false,
            isInvalid:       false
        }
    });
};

export const updateTextArea = event => dispatch => {
    dispatch({
        type:    actions.UPDATE_TEXTAREA,
        payload: {textBox: event.target.value}
    });
};

export const updateTitleField = event => dispatch => {
    dispatch({
        type:    actions.UPDATE_TITLE,
        payload: {textField: event.target.value}
    });
};

export const deleteSingleNote = event => async dispatch => {
    const noteId = event.target.getAttribute('data-id');
    const notes = await deleteNote(noteId);

    dispatch({
        type:    actions.CLEAR_NOTE_FIELDS,
        payload: {noteId: null, selectedNote: null, textBox: null}
    });

    dispatch({
        type:    actions.GET_ALL_NOTES,
        payload: {notes}
    });
};

export const clearNoteField = () => dispatch => {
    dispatch({
        type:    actions.CLEAR_NOTE_FIELDS,
        payload: {
            noteId:       null,
            selectedNote: null,
            textBox:      null,
            isInvalid:    false
        }
    });
};

export const updateNote = event => async dispatch => {
    event.preventDefault();

    const noteData = {
        noteId: event.target.getAttribute('data-id'),
        title:  event.target.closest('form').title.value,
        note:   event.target.closest('form').note.value
    };

    const inputsToValidate = _.omit(noteData, ['noteId']);

    if (inputValidation(inputsToValidate)) {
        dispatch({
            type:    actions.NOTES_FORM_VALIDATION,
            payload: {...inputsToValidate, isInvalid: true}
        });
    } else {
        const notes = await updateNoteData(noteData);

        dispatch({
            type:    actions.UPDATE_NOTE,
            payload: {notes, isInvalid: false}
        });
    }
};
