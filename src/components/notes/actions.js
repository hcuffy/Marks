import _ from 'lodash';

import {actions} from './constants';
import {addNewNote, getAllNotes, deleteNote, updateNoteData} from '../../collections';
import {getAttribute, getFormValues, inputValidation} from '../helpers';

export function addNote(event) {
    return async dispatch => {
        event.preventDefault();

        const formData = getFormValues(['title', 'note'], event);

        if (inputValidation(formData)) {
            dispatch({
                type:    actions.NOTES_FORM_VALIDATION,
                payload: {...formData, isInvalid: true}
            });
        } else {
            _.set(formData, 'studentId', event.target?.student?.value);
            await addNewNote(formData);

            event.target.reset();

            const notes = await getAllNotes();

            dispatch({
                type:    actions.GET_ALL_NOTES,
                payload: {notes, isInvalid: false}
            });
        }
    };
}

export function getNotes() {
    return async dispatch => {
        const notes = await getAllNotes();

        if (_.size(notes)) {
            dispatch({
                type:    actions.GET_ALL_NOTES,
                payload: {notes}
            });
        }
    };
}

export function handleStudentDropdown(event) {
    return dispatch => {
        if (event['data-check'] !== 'studentDropdown') {
            return;
        }

        const student = {studentId: event.id, selectedName: event.name, classroomId: event.classroomId, isInvalid: false};

        dispatch({
            type:    actions.OPEN_STUDENT_NOTES_DROPDOWN,
            payload: student
        });
    };
}

export function handleNotesDropdown(event) {
    return dispatch => {
        if (event['data-check'] !== 'notesDropdown') {
            return;
        }

        dispatch({
            type:    actions.OPEN_NOTES_DROPDOWN,
            payload: {
                noteId:    event.id,
                textArea:  event.note,
                textField: event.title,
                isInvalid: false
            }
        });
    };
}

export function updateTextArea(event) {
    return dispatch => {
        dispatch({
            type:    actions.UPDATE_TEXTAREA,
            payload: {textBox: event.target.value}
        });
    };
}

export function updateTitleField(event) {
    return dispatch => {
        dispatch({
            type:    actions.UPDATE_TITLE,
            payload: {textField: event.target.value}
        });
    };
}

export function deleteSingleNote(event) {
    return async dispatch => {
        const noteId = getAttribute('data-id', event);
        const notes = await deleteNote(noteId);

        dispatch({
            type:    actions.CLEAR_NOTE_FIELDS,
            payload: {noteId: null, textArea: null, textField: null}
        });

        dispatch({
            type:    actions.GET_ALL_NOTES,
            payload: {notes}
        });
    };
}

export function clearNoteField() {
    return dispatch => {
        dispatch({
            type:    actions.CLEAR_NOTE_FIELDS,
            payload: {
                noteId:    null,
                textArea:  null,
                textField: null,
                isInvalid: false
            }
        });
    };
}
export function updateNote(event) {
    return async dispatch => {
        event.preventDefault();

        const noteData = {
            title: event?.target?.closest('form')?.title?.value,
            note:  event?.target?.closest('form')?.note?.value
        };

        if (inputValidation(noteData)) {
            dispatch({
                type:    actions.NOTES_FORM_VALIDATION,
                payload: {...noteData, isInvalid: true}
            });
        } else {
            _.set(noteData, 'noteId', getAttribute('data-id', event));
            const notes = await updateNoteData(noteData);

            dispatch({
                type:    actions.UPDATE_NOTE,
                payload: {notes, isInvalid: false}
            });
        }
    };
}
