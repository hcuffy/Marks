import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';

const Notes = connectionToDB('notes');

export async function addNewNote(data) {
    try {
        await Notes.insert(data);

        displayToast('saveSuccess');
    } catch (e) {
        displayToast('saveFail');
        console.log(e);
    }
}

export async function getAllNotes() {
    try {
        const result = await Notes.find({});

        return result;
    } catch (e) {
        displayToast('retrieveFail');
        console.log(e);

        return null;
    }
}

export async function deleteNote(data) {
    try {
        await Notes.remove({_id: data});

        const result = await Notes.find({});

        return result;
    } catch (e) {
        displayToast('retrieveFail');
        console.log(e);

        return null;
    }
}

async function updateSingleNote(previousData) {
    try {
        const {title, note, noteId} = previousData;

        await Notes.update({_id: noteId}, {$set: {title, note, noteId}}, {});
        displayToast('updateSuccess');
    } catch (e) {
        displayToast('retrieveFail');
        console.log(e);
    }
}

export async function updateNoteData(data) {
    try {
        await updateSingleNote(data);
        let result = Notes.find({});

        return result;
    } catch (e) {
        displayToast('updateFail');
        console.log(e);

        return null;
    }
}
