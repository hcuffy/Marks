import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';

const Notes = connectionToDB('notes');

export const addNewNote = data => {
    Notes.insert(data, error => {
        if (error) {
            displayToast('saveFail');
        }
        displayToast('saveSuccess');
    });
};

export const getAllNotes = () => new Promise(resolve => Notes.find({}, (error, docs) => {
    if (error) {
        displayToast('retrieveFail');
    }

    return resolve(docs);
}));

export const deleteNote = data => new Promise(resolve => Notes.remove({_id: data}, error => {
    if (error) {
        displayToast('deleteFail');
    }
    Notes.find({}, (error, notes) => {
        if (error) {
            displayToast('deleteFail');
        }

        return resolve(notes);
    });
}));

const updateSingleNote = previousData => {
    const {title, note, noteId} = previousData;

    Notes.update({_id: noteId}, {$set: {title, note, noteId}}, {}, error => {
        if (error) {
            displayToast('updateFail');
        }
        displayToast('updateSuccess');
    });
};

export const updateNoteData = data => new Promise(resolve => {
    updateSingleNote(data);
    Notes.find({}, (error, docs) => {
        if (error) {
            displayToast('updateFail');
        }

        return resolve(docs);
    });
});
