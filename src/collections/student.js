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
    const result = await Student.find({});
    if (result instanceof Error) {
        displayToast('retrieveFail');

        return null;
    }

    return result;
}

export async function deleteStudent(data) {
    await Student.remove({_id: data});
    await deleteGradesByStudentId(data);
    const result = await Student.find({});

    if (result instanceof Error) {
        displayToast('retrieveFail');

        return null;
    }

    return result;
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
    await updateSingleStudent(data);
    let result = await Student.find({});
    if (result instanceof Error) {
        displayToast('updateFail');

        return null;
    }

    return result;
}
