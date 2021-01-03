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
    const result = await Notes.find({});

    if (result instanceof Error) {
        displayToast('retrieveFail');

        return null;
    }

    return result;
}

export async function deleteNote(data) {
    await Notes.remove({_id: data});

    const result = await Notes.find({});

    if (result instanceof Error) {
        displayToast('retrieveFail');

        return null;
    }

    return result;
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
    await updateSingleNote(data);
    let result = Notes.find({});

    if (result instanceof Error) {
        displayToast('updateFail');

        return null;
    }

    return result;
}
