import {studentHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    firstname:        '',
    lastname:         '',
    studentDialog:    false,
    studentDropdown:  false,
    subjectDropdown:  false,
    studentGraphId:   null,
    chartToDisplay:   null,
    studentGraphName: null,
    subjectGraphName: null,
    isInvalid:        false,
    isModalInvalid:   true
};

export function applyStudentData(state = initialLoadState, action) {
    return reducerActionHandler(state, action, studentHandlers);
}
