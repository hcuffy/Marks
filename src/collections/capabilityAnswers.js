import _ from 'lodash';

import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';

const Answers = connectionToDB('answer');

export async function getAllAnswers() {
    const result = await Answers.find({});

    if (result instanceof Error) {
        displayToast('retrieveFail');

        return null;
    }

    return result;
}

export async function addStudentAnswer(answerData) {
    const {classroomId, questionId, studentId, optionTag} = answerData;
    const adjustedData = {classroomId, studentId, capability: [{questionId, optionTag}]};

    try {
        await Answers.insert(adjustedData);
        displayToast('saveSuccess');
    } catch (e) {
        displayToast('saveFail');
        console.log(e);
    }
}

async function updateStudentAnswer({classroomId, studentId, questionId, optionTag}) {
    const answerToUpdate = {classroomId, studentId};
    try {
        let result = await Answers.findOne(answerToUpdate);
        const answerExists = _.find(result?.capability, {questionId}) || {};

        if (_.size(answerExists)) {
            await Answers.update(answerToUpdate, {$pull: {capability: {questionId}}}, {});
        }

        await Answers.update(answerToUpdate, {$addToSet: {capability: {questionId, optionTag}}}, {});
        displayToast('updateSuccess');
    } catch (e) {
        displayToast('updateFail');
        console.log(e);
    }
}

export async function updateSingleAnswer(answerData) {
    const {classroomId, studentId} = answerData;

    const count = await Answers.count({classroomId, studentId});

    if (count < 1) {
        await addStudentAnswer(answerData);
    } else {
        await updateStudentAnswer(answerData);
    }

    const result = await Answers.find({});

    if (result instanceof Error) {
        displayToast('updateFail');

        return null;
    }

    return result;
}
