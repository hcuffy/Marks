import {
    saveFailed,
    unableToRetrieve,
    updateFailed,
    deletionFailed
} from '../notifications/general';

const Datastore = require('nedb');
const electron = require('electron');
const path = require('path');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const collectionsPath = path.join(userDataPath, 'collections');

const Grade = new Datastore({
    filename:              path.join(collectionsPath, 'grade.db'),
    autoload:              true,
    corruptAlertThreshold: 1,
    timestampData:         true
});

export const updateGradeData = (data, id) => {
    const {grade, examId, studentId, date, weight} = data;
    Grade.update(
        {_id: id},
        {grade, examId, studentId, date, weight},
        {},
        err => {
            if (err) {
                updateFailed();
            }
        }
    );
};
export const addGradeData = data => {
    Grade.insert(data, (error, doc) => {
        if (error) {
            saveFailed();
        }

        return doc;
    });
};

export const getAllGrades = () => new Promise(resolve => Grade.find({}, (err, docs) => {
    if (err) {
        unableToRetrieve();
    }

    return resolve(docs);
}));

export const deleteGradesByStudentId = id => new Promise(resolve => Grade.remove({studentId: id}, {multi: true}, err => {
    if (err) {
        deletionFailed();
    }
    Grade.find({}, (error, docs) => {
        if (err) {
            deletionFailed();
        }

        return resolve(docs);
    });
}));

export const deleteGradesByExamId = id => new Promise(resolve => Grade.remove({examId: id}, {multi: true}, err => {
    if (err) {
        deletionFailed();
    }
    Grade.find({}, (error, docs) => {
        if (err) {
            deletionFailed();
        }

        return resolve(docs);
    });
}));
