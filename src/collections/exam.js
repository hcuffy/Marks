import _ from 'lodash';

import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';
import {addExamToSubjectArray, updateSubjectTestArray} from './subject';
import {deleteGradesByExamId} from './grade';

const Exam = connectionToDB('examinations');

export async function addExamData(data) {
    try {
        const count = await Exam.count({name: data.title});

        if (count) {
            displayToast('exists', 'warn');

            return null;
        }
        const newData = data;
        await addExamToSubjectArray(newData);

        const result = await Exam.insert(newData);

        displayToast('saveSuccess');

        return result;
    } catch (e) {
        displayToast('saveFail');
        console.log(e);

        return null;
    }
}

export async function getAllExams() {
    const result = await Exam.find({});

    if (result instanceof Error) {
        displayToast('retrieveFail', 'fail');

        return null;
    }

    return result;
}

async function updateTestsArr(examId, subjectId) {
    const result = await Exam.findOne({_id: examId});
    const examTitle = result[0]?.title;
    if (examTitle) {
        await updateSubjectTestArray(subjectId, examTitle);
    }
}

export async function deleteExam({examId, subjectId}) {
    await updateTestsArr(examId, subjectId);
    await Exam.remove({_id: examId});
    await deleteGradesByExamId(examId);
    let result = await Exam.find({});

    if (result instanceof Error) {
        displayToast('deleteFail', 'fail');

        return null;
    }

    return result;
}

async function updateSingleExam(previous, current) {
    const {title, date, weight} = current;
    const {subjectId} = previous;
    try {
        await Exam.update({_id: previous._id}, {title, date, weight, subjectId}, {});
    } catch (e) {
        displayToast('updateFail', 'fail');
        console.log(e);
    }
}

export async function updateExamData(data) {
    try {
        const {examId, subjectId, title} = data;
        let result = await Exam.findOne({_id: examId});

        if (_.size(result)) {
            await updateSingleExam(result, data);
            await updateSubjectTestArray(subjectId, result?.title);
            await addExamToSubjectArray({subjectId, title});
        }
        result = await Exam.find({});

        return result;
    } catch (e) {
        displayToast('updateFail', 'fail');
        console.log(e);

        return null;
    }
}
