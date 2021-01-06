import {subjectDialogHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    id:               '',
    showSubjectModal: false,
    isInvalid:        false
};

export function applySubjectDialog(state = initialLoadState, action) {
    return reducerActionHandler(state, action, subjectDialogHandlers);
}
