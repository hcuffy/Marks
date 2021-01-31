import {noteHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    studentId:       null,
    noteId:          null,
    notes:           [],
    selectedStudent: null,
    textArea:        null,
    isInvalid:       false
};

export function applyNotesData(state = initialLoadState, action) {
    return reducerActionHandler(state, action, noteHandlers);
}
