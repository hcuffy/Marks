import {classroomModalHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    id:         '',
    showDialog: false,
    isInvalid:  false
};

export function applyClassModal(state = initialLoadState, action) {
    return reducerActionHandler(state, action, classroomModalHandlers);
}
