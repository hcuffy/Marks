import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';

const Capability = connectionToDB('question');

export async function getAllQuestions() {
    try {
        const result = await Capability.find({});

        return result;
    } catch (e) {
        displayToast('retrieveFail');
        console.log(e);

        return null;
    }
}

async function addNewQuestion(data) {
    try {
        await Capability.insert(data);
        displayToast('saveSuccess');
    } catch (e) {
        displayToast('saveFail');
        console.log(e);
    }
}

async function updateQuestion(data) {
    const {classroomId, questionSet} = data;
    try {
        await Capability.update({classroomId}, {$set: {questionSet}}, {});

        displayToast('updateSuccess');
    } catch (e) {
        displayToast('updateFail');
        console.log(e);
    }
}

export async function updateQuestionData(data) {
    const {classroomId} = data;

    try {
        const count = await Capability.find({classroomId});
        if (count) {
            await updateQuestion(data);
        } else {
            await addNewQuestion(data);
        }
        const result = await Capability.find({});

        return result;
    } catch (e) {
        displayToast('updateFail');
        console.log(e);

        return null;
    }
}
