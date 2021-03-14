import {classlistHandlers, subjectDataHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    classroom:    null,
    name:         '',
    abbreviation: '',
    isInvalid:    false
};

export function applyClassList(state = initialLoadState, action) {
    return reducerActionHandler(state, action, classlistHandlers);
}

export function applySubjectData(state = {}, action) {
    return reducerActionHandler(state, action, subjectDataHandlers);
}
