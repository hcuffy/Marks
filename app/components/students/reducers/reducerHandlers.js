import _ from 'lodash';
import {actions} from '../constants';
import {defaultStateUpdater} from '../../../reducers/reducerUtils.js';

const studentModalUpdater = (state, action) => {
    const studentModal = !state.studentModal;

    return _.assign({}, state, {studentModal}, action.payload);
};

const studentDropdownUpdater = (state, action) => {
    const studentDropdown = !state.studentDropdown;

    return _.assign({}, state, {studentDropdown}, action.payload);
};

const subjectDropdownUpdater = (state, action) => {
    const subjectDropdown = !state.subjectDropdown;

    return _.assign({}, state, {subjectDropdown}, action.payload);
};

export const studentHandlers = {
    [actions.ADD_NEW_STUDENT]:               defaultStateUpdater,
    [actions.GET_ALL_STUDENTS]:              defaultStateUpdater,
    [actions.GET_SINGLE_STUDENT]:            studentModalUpdater,
    [actions.DISPLAY_STUDENT_GRAPH]:         studentDropdownUpdater,
    [actions.DISPLAY_STUDENT_SUBJECT_GRAPH]: subjectDropdownUpdater,
    [actions.STUDENT_FORM_VALIDATION]:       defaultStateUpdater
};
