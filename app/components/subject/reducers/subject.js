import {classlistHandlers, subjectDataHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    openModal:    false,
    subject:      null,
    name:         '',
    abbreviation: '',
    isInvalid:    false
};

export const applyClassList = (state = initialLoadState, action) => {
    return reducerActionHandler(state, action, classlistHandlers);
};

export const applySubjectData = (state = {}, action) => {
    return reducerActionHandler(state, action, subjectDataHandlers);
};
