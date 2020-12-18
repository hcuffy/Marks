import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';
import {deleteGradesByStudentId} from './grade';

const Student = connectionToDB('student');

export const addNewStudentData = data => {
    Student.insert(data, error => {
        if (error) {
            displayToast('saveFail');
        }
        displayToast('saveSuccess');
    });
};

export const getAllStudents = () => new Promise(resolve => Student.find({}, (error, docs) => {
    if (error) {
        displayToast('retrieveFail');
    }

    return resolve(docs);
}));

export const deleteStudent = data => new Promise(resolve => Student.remove({_id: data}, error => {
    if (error) {
        displayToast('deleteFail');
    }
    Student.find({}, async(error, students) => {
        if (error) {
            displayToast('deleteFail');
        }
        await deleteGradesByStudentId(data);

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
        error => {
            if (error) {
                displayToast('updateFail');
            }
            displayToast('updateSuccess');
        }
    );
};

export const updateStudentData = data => new Promise(resolve => {
    updateSingleStudent(data);
    Student.find({}, (error, docs) => {
        if (error) {
            displayToast('updateFail');
        }

        return resolve(docs);
    });
});
