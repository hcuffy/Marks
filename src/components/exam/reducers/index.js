import {examHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

//TODO : remove this properties once the dropdowns are workingX
const initialLoadState = {
    classroom:         null,
    openClassDropdown: false,
    openSubList:       false,
    classroomId:       null,
    selectedSubject:   null,
    examModal:         false,
    isInvalid:         false,
    isModalInvalid:    false,
    title:             '',
    weight:            ''
};

export function applyFilteredExam(state = initialLoadState, action) {
    return reducerActionHandler(state, action, examHandlers);
}
