import {studentHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    firstname:      '',
    lastname:       '',
    showDialog:     false,
    studentId:      null,
    studentName:    null,
    classroomId:    null,
    subjectId:      null,
    subjectName:    null,
    chartToDisplay: null,
    isInvalid:      false,
    dialogInvalid:  true
};

export function applyStudentData(state = initialLoadState, action) {
    return reducerActionHandler(state, action, studentHandlers);
}
