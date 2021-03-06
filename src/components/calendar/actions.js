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

function genrateRecurringEvents(data) {
    const eventStart = moment(data.startDate);
    const eventEnd = moment(data.endDate);
    const weeks = _.clamp(_.floor(data.numOfWeeks), 1, 40);
    const allEventEnd = moment(eventEnd).add(weeks, 'weeks');
    const events = [];

    let start = eventStart.clone();
    let end = eventEnd.clone();

    for (let i = 0; i < data.numOfWeeks; i += 1) {
        if (start.isSameOrBefore(allEventEnd)) {
            events.push({
                startDate: moment(start).format('YYYY-MM-DDTHH:mm'),
                endDate:   moment(end).format('YYYY-MM-DDTHH:mm'),
                title:     data.title
            });
        }
        start = start.add(7, 'days');
        end = end.add(7, 'days');
    }
    console.log(events);

    return events;
}

function handleEventCreate(eventData) {
    if (_.floor(eventData.numOfWeeks) < 1) {
        console.log('should not be inhere');

        return _.omit(eventData, 'numOfWeeks');
    }

    return genrateRecurringEvents(eventData);
}

async function addOrUpdateEvent(eventId, eventData) {
    if (eventId) {
        await updateCalendarEvent(eventId, _.omit(eventData, 'numOfWeeks'));
    }

    if (_.isNull(eventId)) {
        const allEvents = handleEventCreate(eventData);
        await addCalendarEvent(allEvents);
    }

    return getAllEvents();
}

export function handleEventCreation(event) {
    event.preventDefault();

    return async dispatch => {
        let events;
        let showDialog = true;
        let eventId = getCustomAttribute('eventid', 'titleId', event);
        const eventData = getFormValues(['startDate', 'endDate', 'title', 'numOfWeeks'], event);
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
