import {gradeHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    classroomId: null,
    subjectId:   null,
    classroom:   null
};

export function applyGradeData(state = initialLoadState, action) {
    return reducerActionHandler(state, action, gradeHandlers);
}
