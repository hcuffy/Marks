import {tabHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    classTab: 'active',
    examTab:  null
};

export function applyTabChange(state = initialLoadState, action) {
    return reducerActionHandler(state, action, tabHandlers);
}
