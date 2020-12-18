import _ from 'lodash';

import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';

const Answers = connectionToDB('answer');

export const getAllAnswers = () => new Promise(resolve => {
    Answers.find({}, (error, docs) => {
        if (error) {
            displayToast('retrieveFail');
        }

        return resolve(docs);
    });
});

export const addStudentAnswer = answerData => {
    const {classroomId, questionId, studentId, optionTag} = answerData;
    const capability = [{questionId, optionTag}];
    const adjustedData = {classroomId, studentId, capability};

    Answers.insert(adjustedData, error => {
        if (error) {
            displayToast('saveFail');
        }
        displayToast('saveSuccess');
    });
};

const updateStudentAnswer = ({
    classroomId,
    studentId,
    questionId,
    optionTag
}) => {
    const answerToUpdate = {classroomId, studentId};
    Answers.find(answerToUpdate, (error, answer) => {
        if (error) {
            displayToast('updateFail');
        }
        const answerExists = _.find(answer[0].capability, {questionId});

        if (_.size(answerExists) > 0) {
            Answers.update(
                answerToUpdate,
                {$pull: {capability: {questionId}}},
                {},
                () => {}
            );
        }

        Answers.update(
            answerToUpdate,
            {$addToSet: {capability: {questionId, optionTag}}},
            {},
            () => {}
        );
        displayToast('updateSuccess');
    });
};

export const updateSingleAnswer = answerData => new Promise(resolve => {
    const {classroomId, studentId} = answerData;
    Answers.count({classroomId, studentId}, (error, count) => {
        if (error) {
            displayToast('updateFail');
        }
        if (count < 1) {
            addStudentAnswer(answerData);
        } else {
            updateStudentAnswer(answerData);
        }
    });

    Answers.find({}, (error, docs) => {
        if (error) {
            displayToast('updateFail');
        }

        return resolve(docs);
    });
});
