import _ from 'lodash';

import {actions} from '../constants';
import {defaultStateUpdater} from '../../../reducers/reducerUtils.js';

function subjectDropdownUpdater(state, action) {
    const subDrop = !state.subDrop;

    return _.assign({}, state, {subDrop}, action.payload);
}

function classroomDropdownUpdater(state, action) {
    const classroomDropdown = !state.classroomDropdown;
    const subDrop = !classroomDropdown;

    return _.assign({}, state, {classroomDropdown, subDrop}, action.payload);
}

export const gradeHandlers = {
    [actions.DISPLAY_EXAM_TABLE]: subjectDropdownUpdater,
    [actions.OPEN_CLASS_LIST]:    classroomDropdownUpdater,
    [actions.UPDATE_EXAM_TABLE]:  defaultStateUpdater
};
