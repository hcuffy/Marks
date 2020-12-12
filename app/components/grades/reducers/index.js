import {gradeHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    classroomId:       null,
    subjectName:       null,
    classroomDropdown: false,
    subDrop:           false
};

export const applyGradeData = (state = initialLoadState, action) => {
    return reducerActionHandler(state, action, gradeHandlers);
};
