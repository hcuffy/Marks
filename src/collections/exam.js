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
            displayToast('exists');

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
    try {
        let result = await Exam.find({});

        return result;
    } catch (e) {
        displayToast('retrieveFail');
        console.log(e);

        return null;
    }
}

async function updateTestsArr(examId, subjectId) {
    try {
        const result = await Exam.find({_id: examId});

        const examTitle = result[0].title || {};

        await updateSubjectTestArray(subjectId, examTitle);
    } catch (e) {
        displayToast('updateFail');
        console.log(e);
    }
}

export async function deleteExam({examId, subjectId}) {
    try {
        await updateTestsArr(examId, subjectId);
        await Exam.remove({_id: examId});
        await deleteGradesByExamId(examId);
        let result = await Exam.find({});

        return result;
    } catch (e) {
        displayToast('deleteFail');
        console.log(e);

        return null;
    }
}

async function updateSingleExam(previous, current) {
    const {title, date, weight} = current;
    const {subjectId} = previous;
    try {
        await Exam.update({_id: previous._id}, {title, date, weight, subjectId}, {});
    } catch (e) {
        displayToast('updateFail');
        console.log(e);
    }
}

export async function updateExamData(data) {
    try {
        const {examId, subjectId, title} = data;
        let result = await Exam.find({_id: examId});

        if (_.size(result)) {
            await updateSingleExam(result[0], data);
            await updateSubjectTestArray(subjectId, result[0].title);
            await addExamToSubjectArray({subjectId, title});
        }
        result = await Exam.find({});

        return result;
    } catch (e) {
        displayToast('updateFail');
        console.log(e);

        return null;
    }
}
