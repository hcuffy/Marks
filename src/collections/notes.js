import _ from 'lodash';

import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';

const Notes = connectionToDB('notes');

export async function addNewNote(data) {
    try {
        await Notes.insert(data);

        displayToast('saveSuccess');
    } catch (e) {
        displayToast('saveFail', 'fail');
        console.log(e);
    }
}

export async function getAllNotes() {
    const result = await Notes.find({});

    if (result instanceof Error) {
        displayToast('retrieveFail', 'fail');

        return null;
    }

    return _.sortBy(result, ['title']);
}

export async function deleteNote(data) {
    await Notes.remove({_id: data});

    const result = await Notes.find({});

    if (result instanceof Error) {
        displayToast('retrieveFail', 'fail');

        return null;
    }

    return _.sortBy(result, ['title']);
}

async function updateSingleNote(previousData) {
    try {
        const {title, note, noteId} = previousData;

        await Notes.update({_id: noteId}, {$set: {title, note, noteId}}, {});
        displayToast('updateSuccess');
    } catch (e) {
        displayToast('retrieveFail', 'fail');
        console.log(e);
    }
}

export async function updateNoteData(data) {
    await updateSingleNote(data);
    let result = await Notes.find({});

    if (result instanceof Error) {
        displayToast('updateFail', 'fail');

        return null;
    }

    return _.sortBy(result, ['title']);
}
