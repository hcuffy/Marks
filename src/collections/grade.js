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
    const result = await Grade.insert(data);

    if (result instanceof Error) {
        displayToast('saveFail');

        return null;
    }

    return result;
}

export async function getAllGrades() {
    const result = await Grade.find({});

    if (result instanceof Error) {
        displayToast('retrieveFail');

        return null;
    }

    return result;
}

export async function deleteGradesByStudentId(id) {
    await Grade.remove({studentId: id}, {multi: true});

    const result = await Grade.find({});

    if (result instanceof Error) {
        displayToast('deleteFail');

        return null;
    }

    return result;
}

export async function deleteGradesByExamId(id) {
    await Grade.remove({examId: id}, {multi: true});

    let result = await Grade.find({});

    if (result instanceof Error) {
        displayToast('deleteFail');

        return null;
    }

    return result;
}
