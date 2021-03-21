import {classroomDialogHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    id:         '',
    showDialog: false,
    isInvalid:  false
};

export function applyClassDialog(state = initialLoadState, action) {
    return reducerActionHandler(state, action, classroomDialogHandlers);
}
