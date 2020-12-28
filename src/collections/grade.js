import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';

const Grade = connectionToDB('grade');

export async function updateGradeData(data, id) {
    try {
        await Grade.update({_id: id}, {...data}, {});
    } catch (e) {
        displayToast('updateFail');
        console.log(e);
    }
}

export async function addGradeData(data) {
    try {
        const result = await Grade.insert(data);

        return result;
    } catch (e) {
        displayToast('saveFail');
        console.log(e);

        return null;
    }
}

export async function getAllGrades() {
    try {
        const result = await Grade.find({});

        return result;
    } catch (e) {
        displayToast('retrieveFail');
        console.log(e);

        return null;
    }
}

export async function deleteGradesByStudentId(id) {
    try {
        await Grade.remove({studentId: id}, {multi: true});

        let result = await Grade.find({});

        return result;
    } catch (e) {
        displayToast('deleteFail');
        console.log(e);

        return null;
    }
}

export async function deleteGradesByExamId(id) {
    try {
        await Grade.remove({examId: id}, {multi: true});

        let result = await Grade.find({});

        return result;
    } catch (e) {
        displayToast('deleteFail');
        console.log(e);

        return null;
    }
}
