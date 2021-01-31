import {actions} from '../constants';
import {defaultStateUpdater} from '../../../reducers/reducerUtils.js';

export const gradeHandlers = {
    [actions.DISPLAY_EXAM_TABLE]: defaultStateUpdater,
    [actions.OPEN_CLASS_LIST]:    defaultStateUpdater,
    [actions.UPDATE_EXAM_TABLE]:  defaultStateUpdater
};
