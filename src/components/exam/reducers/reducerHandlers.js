import _ from 'lodash';

import {actions} from '../constants';
import {defaultStateUpdater} from '../../../reducers/reducerUtils.js';

function singleExamUpdater(state, action) {
    const showDialog = !state.showDialog;

    return _.assign({}, state, {showDialog}, action.payload);
}

export const examHandlers = {
    [actions.ADD_NEW_EXAM]:               defaultStateUpdater,
    [actions.GET_SELECTED_CLASS]:         defaultStateUpdater,
    [actions.UPDATE_DROPDOWN_CLASS_LIST]: defaultStateUpdater,
    [actions.GET_SINGLE_EXAM]:            singleExamUpdater,
    [actions.DISPLAY_SUBJECT_LIST]:       defaultStateUpdater,
    [actions.UPDATE_EXAMS_LIST]:          defaultStateUpdater,
    [actions.EXAM_FORM_VALIDATION]:       defaultStateUpdater,
    [actions.EXAM_MODAL_VALIDATION]:      defaultStateUpdater
};
