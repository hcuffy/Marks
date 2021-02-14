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
