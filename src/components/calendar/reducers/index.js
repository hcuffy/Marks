import {calendarHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    events:     [],
    showDialog: null,
    isInvalid:  null,
    eventId:    null,
    eventText:  null,
    eventStart: null,
    eventEnd:   null
};

export function applyCalendarChanges(state = initialLoadState, action) {
    return reducerActionHandler(state, action, calendarHandlers);
}
