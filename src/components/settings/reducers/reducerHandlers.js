import {actions} from '../constants';
import {defaultStateUpdater} from '../../../reducers/reducerUtils.js';
import _ from 'lodash';

function resetDialogUpdater(state, action) {
    const showDialog = !state.showDialog;

    return _.assign({}, state, {showDialog}, action.payload);
}

export const settingsHandlers = {
    [actions.HANDLE_SCHOOL_DATA]:  defaultStateUpdater,
    [actions.UPDATE_GRADING_DATA]: defaultStateUpdater,
    [actions.GET_SYSTEM_TYPE]:     defaultStateUpdater,
    [actions.DISPLAY_SCHOOL_DATA]: defaultStateUpdater,
    [actions.DISPLAY_DIALOG]:      resetDialogUpdater,
    [actions.RESET_DATABASE]:      defaultStateUpdater
};
