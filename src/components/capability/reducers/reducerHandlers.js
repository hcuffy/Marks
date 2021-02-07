import _ from 'lodash';

import {actions} from '../constants';
import {defaultStateUpdater} from '../../../reducers/reducerUtils.js';

function cardStateUpdater(state, action) {
    return _.assign({}, state, {showCard: !state.showCard}, action.payload);
}

export const capabilityHandlers = {
    [actions.OPEN_CLOSE_CLASS_LIST]:    defaultStateUpdater,
    [actions.OPEN_CLOSE_STUDENT_LIST]:  defaultStateUpdater,
    [actions.GET_ALL_QUESTIONS]:        defaultStateUpdater,
    [actions.OPEN_CLOSE_QUESTION_LIST]: defaultStateUpdater,
    [actions.UPDATE_QUESTION_SET]:      defaultStateUpdater,
    [actions.UPDATE_ANSWERS]:           defaultStateUpdater,
    [actions.SHOW_CARDS]:               cardStateUpdater

};
