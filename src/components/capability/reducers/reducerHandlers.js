import {actions} from '../constants';
import {defaultStateUpdater} from '../../../reducers/reducerUtils.js';

export const capabilityHandlers = {
    [actions.OPEN_CLOSE_CLASS_LIST]:    defaultStateUpdater,
    [actions.OPEN_CLOSE_STUDENT_LIST]:  defaultStateUpdater,
    [actions.GET_ALL_QUESTIONS]:        defaultStateUpdater,
    [actions.OPEN_CLOSE_QUESTION_LIST]: defaultStateUpdater,
    [actions.UPDATE_QUESTION_SET]:      defaultStateUpdater,
    [actions.UPDATE_ANSWERS]:           defaultStateUpdater
};
