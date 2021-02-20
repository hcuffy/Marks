import {actions} from '../constants';
import {defaultStateUpdater} from '../../../reducers/reducerUtils';

export const calendarHandlers = {
    [actions.GET_ALL_EVENTS]:  defaultStateUpdater,
    [actions.SHOW_ADD_DIALOG]: defaultStateUpdater,
    [actions.CLOSE_DIALOG]:    defaultStateUpdater,
    [actions.ADD_EVENT]:       defaultStateUpdater,
    [actions.DELETE_EVENT]:    defaultStateUpdater
};
