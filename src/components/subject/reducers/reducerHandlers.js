import _ from 'lodash';

import {actions} from '../constants';
import {defaultStateUpdater} from '../../../reducers/reducerUtils.js';

function classlistModalUpdater(state, action) {
    const openModal = !state.openModal;

    return _.assign({}, state, {openModal}, action.payload);
}

function subjectDialogUpdater(state, action) {
    const showSubjectDialog = !state.showSubjectDialog;

    return _.assign({}, state, {showSubjectDialog}, action.payload);
}

export const classlistHandlers = {
    [actions.UPDATE_CLASS_LIST]:       classlistModalUpdater,
    [actions.GET_SINGLE_SUBJECT]:      defaultStateUpdater,
    [actions.SUBJECT_FORM_VALIDATION]: defaultStateUpdater
};

export const subjectDataHandlers = {
    [actions.GET_SUBJECT_LIST]: defaultStateUpdater,
    [actions.ADD_NEW_SUBJECT]:  defaultStateUpdater
};

export const subjectDialogHandlers = {
    [actions.OPEN_CLOSE_SUBJECT_MODAL]: subjectDialogUpdater,
    [actions.UPDATE_SUBJECT]:           subjectDialogUpdater,
    [actions.SUBJECT_MODAL_VALIDATION]: defaultStateUpdater
};
