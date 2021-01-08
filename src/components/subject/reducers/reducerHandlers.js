import {actions} from '../constants';
import {defaultStateUpdater, dialogStateUpdater} from '../../../reducers/reducerUtils.js';

export const classlistHandlers = {
    [actions.UPDATE_CLASS_LIST]:       dialogStateUpdater,
    [actions.GET_SINGLE_SUBJECT]:      defaultStateUpdater,
    [actions.SUBJECT_FORM_VALIDATION]: defaultStateUpdater
};

export const subjectDataHandlers = {
    [actions.GET_SUBJECT_LIST]: defaultStateUpdater,
    [actions.ADD_NEW_SUBJECT]:  defaultStateUpdater
};

export const subjectDialogHandlers = {
    [actions.OPEN_CLOSE_SUBJECT_MODAL]: dialogStateUpdater,
    [actions.UPDATE_SUBJECT]:           dialogStateUpdater,
    [actions.SUBJECT_MODAL_VALIDATION]: defaultStateUpdater
};
