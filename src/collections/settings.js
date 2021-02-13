import _ from 'lodash';

import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';

const Settings = connectionToDB('settings');

export async function saveGradeSystem(data) {
    try {
        await Settings.insert(data);
    } catch (e) {
        displayToast('updateFail', 'fail');
        console.log(e);
    }
}

export async function getSettingsData() {
    const result = await Settings.findOne({});

    if (result instanceof Error) {
        displayToast('retrieveFail', 'fail');

        return null;
    }

    return result;
}

async function updateAddress(previous, id) {
    const {title, street, province, country, zip, city, year} = previous;
    try {
        await Settings.update({_id: id}, {$set: {title, street, province, country, zip, city, year}}, {});
    } catch (e) {
        displayToast('updateFail', 'fail');
        console.log(e);
    }
}

async function updateSystem(previous, id) {
    const {note, points, percent} = previous;
    try {
        await Settings.update({_id: id}, {$set: {note, points, percent}}, {});
        displayToast('saveSuccess');
    } catch (e) {
        displayToast('saveFail', 'fail');
        console.log(e);
    }
}

export async function updateGradeType(data) {
    let result = await getSettingsData();

    if (result instanceof Error) {
        displayToast('updateFail', 'fail');

        return null;
    }

    if (_.size(result)) {
        await updateSystem(data, result?._id);
    }
    result = await getSettingsData();

    return result;
}

export async function addAddress(data) {
    let result = await getSettingsData();

    if (_.size(result)) {
        await updateAddress(data, result?._id);
    }
    result = await getSettingsData();

    if (result instanceof Error) {
        displayToast('updateFail', 'fail');

        return null;
    }

    return result;
}

export function clearDatabases() {
    const databases = ['answer', 'classroom', 'examinations', 'grade', 'notes', 'student', 'subject'];

    _.forEach(databases, value => {
        let database = connectionToDB(value);
        // eslint-disable-next-line func-names
        database.remove({}, {multi: true}, (error, numDeleted) => {
            if (error) {
                displayToast('deleteFail', 'fail');
            }

            return numDeleted;
        });
    });
}
