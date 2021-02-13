import {calendarHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {};

export function applyCalendarChanges(state = initialLoadState, action) {
    return reducerActionHandler(state, action, calendarHandlers);
}
