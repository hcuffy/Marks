import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';
import {deleteGradesByStudentId} from './grade';

const Student = connectionToDB('student');

export async function addNewStudentData(data) {
    try {
        await Student.insert(data);
        displayToast('saveSuccess');
    } catch (e) {
        displayToast('saveFail');
        console.log(e);
    }
}

export async function getAllStudents() {
    try {
        const result = await Student.find({});

        return result;
    } catch (e) {
        displayToast('retrieveFail');
        console.log(e);

        return null;
    }
}

export async function deleteStudent(data) {
    try {
        await Student.remove({_id: data});
        await deleteGradesByStudentId(data);
        const result = await Student.find({});

        return result;
    } catch (e) {
        displayToast('deleteFail');
        console.log(e);

        return null;
    }
}

async function updateSingleStudent(previous) {
    try {
        const {firstname, lastname, gender, classroom, id} = previous;
        await Student.update({_id: id}, {firstname, lastname, gender, classroom}, {});
        displayToast('updateSuccess');
    } catch (e) {
        displayToast('updateFail');
        console.log(e);
    }
}

export async function updateStudentData(data) {
    try {
        await updateSingleStudent(data);
        let result = await Student.find({});

        return result;
    } catch (e) {
        displayToast('updateFail');
        console.log(e);

        return null;
    }
}
