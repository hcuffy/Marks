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

export async function getAddressData() {
    try {
        const address = await Settings.find({});

        return address;
    } catch (e) {
        displayToast('retrieveFail');
        console.log(e);

        return null;
    }
}

export async function getSystemType() {
    try {
        const results = await Settings.find({});

        return results;
    } catch (e) {
        displayToast('retrieveFail');
        console.log(e);

        return null;
    }
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
    let systemType = await getSystemType();
    try {
        await updateSystem(data, systemType[0]._id);
        systemType = await getSystemType();

        return systemType;
    } catch (e) {
        displayToast('updateFail');
        console.log(e);

        return null;
    }
}

export async function addAddress(data) {
    let setting = await getAddressData();

    try {
        await updateAddress(data, setting[0]._id);
        setting = await getAddressData();

        return setting;
    } catch (e) {
        displayToast('retrieveFail');
        console.log(e);

        return null;
    }
}
