import _ from 'lodash';

import {actions} from '../constants';
import {defaultStateUpdater} from '../../../reducers/reducerUtils.js';

function studentDialogUpdater(state, action) {
    const showDialog = !state.showDialog;

    return _.assign({}, state, {showDialog}, action.payload);
}

function studentDropdownUpdater(state, action) {
    const studentDropdown = !state.studentDropdown;

    return _.assign({}, state, {studentDropdown}, action.payload);
}

function subjectDropdownUpdater(state, action) {
    const subjectDropdown = !state.subjectDropdown;

    return _.assign({}, state, {subjectDropdown}, action.payload);
}

export const studentHandlers = {
    [actions.ADD_NEW_STUDENT]:               defaultStateUpdater,
    [actions.GET_ALL_STUDENTS]:              defaultStateUpdater,
    [actions.GET_SINGLE_STUDENT]:            studentDialogUpdater,
    [actions.DISPLAY_STUDENT_GRAPH]:         studentDropdownUpdater,
    [actions.DISPLAY_STUDENT_SUBJECT_GRAPH]: subjectDropdownUpdater,
    [actions.STUDENT_FORM_VALIDATION]:       defaultStateUpdater
};
