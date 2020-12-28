import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';

const Settings = connectionToDB('settings');

export async function saveGradeSystem(data) {
    try {
        await Settings.insert(data);
    } catch (e) {
        displayToast('updateFail');
        console.log(e);
    }
}

export async function getSettingsData() {
    const result = await Settings.find({});

    if (result instanceof Error) {
        displayToast('retrieveFail');

        return null;
    }

    return result;
}

async function updateAddress(previous, id) {
    const {title, street, province, country, zip, city, year} = previous;
    try {
        await Settings.update({_id: id}, {$set: {title, street, province, country, zip, city, year}}, {});
    } catch (e) {
        displayToast('updateFail');
        console.log(e);
    }
}

async function updateSystem(previous, id) {
    const {note, points, percent} = previous;
    try {
        await Settings.update({_id: id}, {$set: {note, points, percent}}, {});
        displayToast('saveSuccess');
    } catch (e) {
        displayToast('saveFail');
        console.log(e);
    }
}

export async function updateGradeType(data) {
    let result = await getSettingsData();

    if (result instanceof Error) {
        displayToast('updateFail');

        return null;
    }

    await updateSystem(data, result[0]._id);
    result = await getSettingsData();

    return result;
}

export async function addAddress(data) {
    let result = await getSettingsData();

    try {
        await updateAddress(data, result[0]._id);
        result = await getSettingsData();

        return result;
    } catch (e) {
        displayToast('updateFail');
        console.log(e);

        return null;
    }
}
