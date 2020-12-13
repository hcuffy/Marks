import {noteHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    studentDropdown: false,
    notesDropdown:   false,
    studentId:       null,
    noteId:          null,
    notes:           [],
    selectedStudent: null,
    selectedNote:    null,
    textBox:         null,
    textField:       null,
    isInvalid:       false
};

export const applyNotesData = (state = initialLoadState, action) => {
    return reducerActionHandler(state, action, noteHandlers);
};
