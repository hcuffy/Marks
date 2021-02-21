import _ from 'lodash';

import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';

const calendarEvents = connectionToDB('events');

export async function getAllEvents() {
    const result = await calendarEvents.find({});

    if (result instanceof Error) {
        displayToast('retrieveFail', 'fail');

        return null;
    }

    return result;
}

function handleEventArray(data) {
    return _.forEach(data, value => {
        calendarEvents.insert(value);
    });
}

export async function addCalendarEvent(data) {
    try {
        if (_.isArray(data)) {
            await handleEventArray(data);
        } else {
            await calendarEvents.insert(data);
        }
        displayToast('saveSuccess');
    } catch (e) {
        displayToast('saveFail', 'fail');
        console.log(e);
    }
}

export async function updateCalendarEvent(id, data) {
    try {
        await calendarEvents.update({_id: id}, {$set: data});
        displayToast('saveSuccess');
    } catch (e) {
        displayToast('saveFail', 'fail');
        console.log(e);
    }
}

export async function deleteEvents(id) {
    await calendarEvents.remove({_id: id});

    const result = await calendarEvents.find({});

    if (result instanceof Error) {
        displayToast('retrieveFail', 'fail');

        return null;
    }

    return result;
}

export async function clearCalendar() {
    await calendarEvents.remove({}, {multi: true}, (error, numDeleted) => {
        if (error) {
            displayToast('deleteFail', 'fail');
        }

        return numDeleted;
    });
}
