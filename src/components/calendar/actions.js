import {actions} from './constants';
import {addCalendarEvent, getAllEvents} from '../../collections';

export function getEvents() {
    return async dispatch => {
        const events = await getAllEvents();

        dispatch({
            type:    actions.GET_ALL_EVENTS,
            payload: {events}
        });
    };
}

export function showAddEventDialog(event) {
    return dispatch => {
        dispatch({
            type:    actions.SHOW_ADD_DIALOG,
            payload: {
                eventStart: event.start,
                eventEnd:   event.end,
                showDialog: true
            }
        });
    };
}

export function closeEventDialog() {
    return dispatch => {
        dispatch({
            type:    actions.CLOSE_DIALOG,
            payload: {
                eventStart: null,
                eventEnd:   null,
                showDialog: false
            }
        });
    };
}

export function addNewEvent(event) {
    event.preventDefault();

    return async dispatch => {
        await addCalendarEvent({ });
        const events = await getAllEvents();

        dispatch({
            type:    actions.ADD_EVENT,
            payload: {
                showDialog: false, events, eventStart: null, eventEnd: null
            }
        });
    };
}
