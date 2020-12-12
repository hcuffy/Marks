import {
    saveSuccessful,
    saveFailed,
    unableToRetrieve,
    deletionFailed,
    updateFailed,
    updateSuccessful
} from '../notifications/general';
import {deleteGradesByStudentId} from './grade';

const Datastore = require('nedb');
const electron = require('electron');
const path = require('path');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const collectionsPath = path.join(userDataPath, 'collections');
const Student = new Datastore({
    filename:              path.join(collectionsPath, 'student.db'),
    autoload:              true,
    corruptAlertThreshold: 1,
    timestampData:         true
});

export const addNewStudentData = data => {
    Student.insert(data, error => {
        if (error) {
            saveFailed();
        }
        saveSuccessful();
    });
};

export const getAllStudents = () => new Promise(resolve => Student.find({}, (err, docs) => {
    if (err) {
        unableToRetrieve();
    }

    return resolve(docs);
}));

export const deleteStudent = data => new Promise(resolve => Student.remove({_id: data}, err => {
    if (err) {
        deletionFailed();
    }
    Student.find({}, (error, students) => {
        if (err) {
            deletionFailed();
        }
        deleteGradesByStudentId(data);

        return resolve(students);
    });
}));

const updateSingleStudent = previous => {
    const {firstname, lastname, gender, classroom, id} = previous;

    Student.update(
        {_id: id},
        {
            firstname,
            lastname,
            gender,
            classroom
        },
        {},
        err => {
            if (err) {
                updateFailed();
            }
            updateSuccessful();
        }
    );
};

export const updateStudentData = data => new Promise(resolve => {
    updateSingleStudent(data);
    Student.find({}, (error, docs) => {
        if (error) {
            updateFailed();
        }

        return resolve(docs);
    });
});
