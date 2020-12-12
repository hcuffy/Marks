import _ from 'lodash';
import {actions} from '../constants';
import {defaultStateUpdater} from '../../../reducers/reducerUtils.js';

const classroomDropdownUpdater = (state, action) => {
    const classroomDropdown = !state.classroomDropdown;

    return _.assign({}, state, {classroomDropdown}, action.payload);
};

const subjectDropdownUpdater = (state, action) => {
    const openSubList = !state.openSubList;

    return _.assign({}, state, {openSubList}, action.payload);
};

const examDropdownUpdater = (state, action) => {
    const openExamList = !state.openExamList;

    return _.assign({}, state, {openExamList}, action.payload);
};

export const graphHandlers = {
    [actions.OPEN_GRAPH_CLASS_LIST]:  classroomDropdownUpdater,
    [actions.DISPLAY_SUBJECT_GRADES]: subjectDropdownUpdater,
    [actions.DISPLAY_EXAM_GRADES]:    examDropdownUpdater,
    [actions.GET_ALL_EXAMS]:          defaultStateUpdater,
    [actions.GET_ALL_GRADES]:         defaultStateUpdater
};
