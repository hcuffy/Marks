import {graphHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    classroomId:    null,
    subjectId:      null,
    examId:         null,
    chartToDisplay: null,
    chartTitle:     null
};

export function applyGraphData(state = initialLoadState, action) {
    return reducerActionHandler(state, action, graphHandlers);
}
