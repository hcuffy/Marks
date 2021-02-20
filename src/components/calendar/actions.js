import moment from 'moment';
import _ from 'lodash';

import {actions} from './constants';
import {addCalendarEvent, deleteEvents, getAllEvents, updateCalendarEvent} from '../../collections';
import {getAttribute, getCustomAttribute, getFormValues} from '../helpers';

export function getEvents() {
    return async dispatch => {
        const events = await getAllEvents();

        dispatch({
            type:    actions.GET_ALL_EVENTS,
            payload: {events}
        });
    };
}

export function handleEventDialog(event) {
    return dispatch => {
        const eventId = _.isUndefined(event.id) ? null : event.id;

        dispatch({
            type:    actions.SHOW_ADD_DIALOG,
            payload: {
                startDate:  event.start,
                endDate:    event.end,
                title:      event.title || null,
                eventId,
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
                startDate:  null,
                endDate:    null,
                title:      null,
                eventId:    null,
                showDialog: false
            }
        });
    };
}

function isValidateDate({startDate, endDate}) {
    const eventLength = moment(endDate).diff(startDate, 'minutes');

    return moment(endDate).isAfter(startDate) && eventLength > 15;
}

function isValidTitle({title}) {
    return _.isEmpty(title.trim());
}

async function addOrUpdateEvent(eventId, eventData) {
    if (eventId) {
        await updateCalendarEvent(eventId, eventData);
    }

    if (_.isNull(eventId)) {
        await addCalendarEvent(eventData);
    }

    return getAllEvents();
}

export function handleEventCreation(event) {
    event.preventDefault();

    return async dispatch => {
        let events;
        let showDialog = true;
        let eventId = getCustomAttribute('eventid', 'titleId', event);
        const eventData = getFormValues(['startDate', 'endDate', 'title'], event);
        const isInvalid = !isValidateDate(eventData) || isValidTitle(eventData);

        if (!isInvalid) {
            events = await addOrUpdateEvent(eventId, eventData);
            _.set(eventData, 'startDate', null);
            _.set(eventData, 'endDate', null);
            _.set(eventData, 'title', null);
            showDialog = false;
            eventId = null;
        }

        dispatch({
            type:    actions.ADD_EVENT,
            payload: {showDialog, eventId, events, ...eventData}
        });
    };
}

export function deleteSingleEvent(event) {
    return async dispatch => {
        const id = getAttribute('data-id', event);

        const events = await deleteEvents(id);

        dispatch({
            type:    actions.DELETE_EVENT,
            payload: {events, showDialog: false}
        });
    };
}
