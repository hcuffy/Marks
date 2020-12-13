import {graphHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    classroomId:       null,
    subjectName:       null,
    examName:          null,
    subjectId:         null,
    examId:            null,
    classroomDropdown: false,
    openSubList:       false,
    openExamList:      false,
    chartToDisplay:    null,
    chartTitle:        null
};

export const applyGraphData = (state = initialLoadState, action) => {
    return reducerActionHandler(state, action, graphHandlers);
};
