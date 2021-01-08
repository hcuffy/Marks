import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';

const Capability = connectionToDB('question');

export async function getAllQuestions() {
    const result = await Capability.find({});

    if (result instanceof Error) {
        displayToast('retrieveFail', 'fail');

        return null;
    }

    return result;
}

async function addNewQuestion(data) {
    try {
        await Capability.insert(data);
        displayToast('saveSuccess');
    } catch (e) {
        displayToast('saveFail', 'fail');
        console.log(e);
    }
}

async function updateQuestion(data) {
    const {classroomId, questionSet} = data;
    try {
        await Capability.update({classroomId}, {$set: {questionSet}}, {});

        displayToast('updateSuccess');
    } catch (e) {
        displayToast('updateFail', 'fail');
        console.log(e);
    }
}

export async function updateQuestionData(data) {
    const {classroomId} = data;

    const count = await Capability.find({classroomId});
    if (count) {
        await updateQuestion(data);
    } else {
        await addNewQuestion(data);
    }
    const result = await Capability.find({});

    if (result instanceof Error) {
        displayToast('updateFail', 'fail');

        return null;
    }

    return result;
}
