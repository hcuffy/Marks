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

export async function addCalendarEvent(data) {
    try {
        await calendarEvents.insert(data);
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

export function clearCalendar() {
    calendarEvents.remove({}, {multi: true}, (error, numDeleted) => {
        if (error) {
            displayToast('deleteFail', 'fail');
        }

        return numDeleted;
    });
}
