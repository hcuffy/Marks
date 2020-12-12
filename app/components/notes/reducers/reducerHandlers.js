import _ from 'lodash';
import {actions} from '../constants';
import {defaultStateUpdater} from '../../../reducers/reducerUtils.js';

const studentDropdownUpdater = (state, action) => {
    const studentDropdown = !state.studentDropdown;

    return _.assign({}, state, {studentDropdown}, action.payload);
};

const notesDropdownUpdater = (state, action) => {
    const notesDropdown = !state.notesDropdown;

    return _.assign({}, state, {notesDropdown}, action.payload);
};

export const noteHandlers = {
    [actions.GET_ALL_NOTES]:               defaultStateUpdater,
    [actions.OPEN_STUDENT_NOTES_DROPDOWN]: studentDropdownUpdater,
    [actions.OPEN_NOTES_DROPDOWN]:         notesDropdownUpdater,
    [actions.UPDATE_TEXTAREA]:             defaultStateUpdater,
    [actions.UPDATE_TITLE]:                defaultStateUpdater,
    [actions.CLEAR_NOTE_FIELDS]:           defaultStateUpdater,
    [actions.UPDATE_NOTE]:                 defaultStateUpdater,
    [actions.NOTES_FORM_VALIDATION]:       defaultStateUpdater
};
