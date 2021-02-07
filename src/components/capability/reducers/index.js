import {capabilityHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    classroom:    null,
    classroomId:  null,
    studentName:  null,
    studentId:    null,
    answers:      [],
    questions:    [],
    questionList: null,
    showCard:     false,
    questionBase: null,
    cardId:       null
};

export function applyCapabilityChanges(state = initialLoadState, action) {
    return reducerActionHandler(state, action, capabilityHandlers);
}
