import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';

const Answers = connectionToDB('answer');

export async function getAllAnswers() {
    const result = await Answers.find({});

    if (result instanceof Error) {
        displayToast('retrieveFail', 'fail');

        return null;
    }

    return result;
}

async function addStudentAnswer(answerData) {
    const {classroomId, questionId, studentId, cardId, answer} = answerData;
    const dataToInsert = {classroomId, studentId, cardId, capability: {[questionId]: answer}};

    try {
        await Answers.insert(dataToInsert);
        displayToast('saveSuccess');
    } catch (e) {
        displayToast('saveFail', 'fail');
        console.log(e);
    }
}

async function updateStudentAnswer({classroomId, questionId, studentId, cardId, answer}) {
    const answerToUpdate = {classroomId, studentId, cardId};

    const updateData = {[`capability.${questionId}`]: answer};
    try {
        await Answers.update(answerToUpdate, {$set: updateData}, {});

        displayToast('updateSuccess');
    } catch (e) {
        displayToast('updateFail', 'fail');
        console.log(e);
    }
}

export async function updateSingleAnswer(answerData) {
    const {classroomId, studentId, cardId} = answerData;

    const count = await Answers.count({classroomId, studentId, cardId});

    if (count < 1) {
        await addStudentAnswer(answerData);
    } else {
        await updateStudentAnswer(answerData);
    }

    const result = await Answers.find({});

    if (result instanceof Error) {
        displayToast('updateFail', 'fail');

        return null;
    }

    return result;
}
