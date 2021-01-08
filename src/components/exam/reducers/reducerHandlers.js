import _ from 'lodash';

import {actions} from '../constants';
import {defaultStateUpdater} from '../../../reducers/reducerUtils.js';

function classroomDropdownUpdater(state, action) {
    const openClassDropdown = !state.openClassDropdown;
    const openSubList = state.openClassDropdown;

    return _.assign({}, state, {openClassDropdown, openSubList}, action.payload);
}

function singleExamUpdater(state, action) {
    const examModal = !state.examModal;

    return _.assign({}, state, {examModal}, action.payload);
}

function subjectListUpdater(state, action) {
    const openSubList = !state.openSubList;

    return _.assign({}, state, {openSubList}, action.payload);
}

export const examHandlers = {
    [actions.ADD_NEW_EXAM]:               defaultStateUpdater,
    [actions.GET_SELECTED_CLASS]:         defaultStateUpdater,
    [actions.UPDATE_DROPDOWN_CLASS_LIST]: classroomDropdownUpdater,
    [actions.GET_SINGLE_EXAM]:            singleExamUpdater,
    [actions.DISPLAY_SUBJECT_LIST]:       subjectListUpdater,
    [actions.UPDATE_EXAMS_LIST]:          defaultStateUpdater,
    [actions.EXAM_FORM_VALIDATION]:       defaultStateUpdater,
    [actions.EXAM_MODAL_VALIDATION]:      defaultStateUpdater
};
