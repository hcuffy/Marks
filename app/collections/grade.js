import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';

const Grade = connectionToDB('grade');

export const updateGradeData = (data, id) => {
    const {grade, examId, studentId, date, weight} = data;
    Grade.update(
        {_id: id},
        {grade, examId, studentId, date, weight},
        {},
        error => {
            if (error) {
                displayToast('updateFail');
            }
        }
    );
};
export const addGradeData = data => {
    Grade.insert(data, (error, doc) => {
        if (error) {
            displayToast('saveFail');
        }

        return doc;
    });
};

export const getAllGrades = () => new Promise(resolve => Grade.find({}, (error, docs) => {
    if (error) {
        displayToast('retrieveFail');
    }

    return resolve(docs);
}));

export const deleteGradesByStudentId = id => new Promise(resolve => Grade.remove({studentId: id}, {multi: true}, error => {
    if (error) {
        displayToast('deleteFail');
    }
    Grade.find({}, (error, docs) => {
        if (error) {
            displayToast('deleteFail');
        }

        return resolve(docs);
    });
}));

export const deleteGradesByExamId = id => new Promise(resolve => Grade.remove({examId: id}, {multi: true}, error => {
    if (error) {
        displayToast('deleteFail');
    }
    Grade.find({}, (error, docs) => {
        if (error) {
            displayToast('deleteFail');
        }

        return resolve(docs);
    });
}));
