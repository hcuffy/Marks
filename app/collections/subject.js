import _ from 'lodash';

import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';
import {
    getClassroomData,
    updateSubjectArray,
    updateClassSubjectArray
} from './classroom';
import {getAllExams, deleteExam} from './exam';

const Subject = connectionToDB('subject');

async function getSubjects({room, abbreviation}) {
    const data = await getClassroomData();
    const selectedClass = _.find(data, {name: room});
    if (_.includes(selectedClass.subjects, abbreviation)) {
        return true;
    }

    return selectedClass;
}

export async function getAllSubjects() {
    try {
        let result = await Subject.find({});

        return result;
    } catch (e) {
        displayToast('retrieveFail');
        console.log(e);

        return null;
    }
}

export async function addSubjectData(data) {
    try {
        const subjectClassroom = await getSubjects(data);
        if (subjectClassroom === true) {
            displayToast('exists');

            return null;
        }
        const newSubject = _.merge(data, {tests: [], classroomId: subjectClassroom._id});
        subjectClassroom.subjects.push(data.abbreviation);

        await Subject.insert(newSubject);
        await updateSubjectArray(subjectClassroom);
        displayToast('saveSuccess');

        const results = await getAllSubjects();

        return results;
    } catch (e) {
        displayToast('saveFail');
        console.log(e);

        return null;
    }
}

async function filteredExams(subjectId) {
    const exams = await getAllExams();

    return _.filter(exams, {subjectId});
}

async function deleteExamsBySubject(subjectId) {
    const exams = await filteredExams(subjectId);

    if (!_.isEmpty(exams)) {
        _.forEach(exams, async exam => {
            await deleteExam({examId: exam._id, subjectId});
        });
    }
}

export async function deleteSubject({id}) {
    try {
        await Subject.remove({_id: id});
        await filteredExams(id);
        await deleteExamsBySubject(id);
        const result = await Subject.find({});

        return result;
    } catch (e) {
        displayToast('deleteFail');
        console.log(e);

        return null;
    }
}

function checkSubjectChanges(previous, current) {
    const {name, abbreviation} = current;

    return !(_.isEqual(previous.name, name) &&
      _.isEqual(previous.abbreviation, abbreviation));
}

async function updateClassroomSubjects(classroomId, previousSubject, currentSubject) {
    if (!_.isEqual(previousSubject, currentSubject)) {
        await updateClassSubjectArray(classroomId, previousSubject, currentSubject);
    }
}

async function updateSingleSubject(previous, current) {
    const {name, abbreviation} = current;
    const {room, tests, classroomId} = previous;
    const shouldUpdate = checkSubjectChanges(previous, current);

    try {
        if (shouldUpdate) {
            await updateClassroomSubjects(classroomId, previous.abbreviation, abbreviation);
            await Subject.update({_id: previous._id}, {name, abbreviation, room, tests, classroomId}, {});
            displayToast('updateSuccess');
        }
    } catch (e) {
        displayToast('updateFail');
        console.log(e);
    }
}

export async function updateSubjectData(data) {
    try {
        const subject = await Subject.find({_id: data.subjectId});
        if (_.size(subject)) {
            await updateSingleSubject(subject[0], data);
        }
        const result = await Subject.find({_id: data.subjectId});

        return result;
    } catch (e) {
        displayToast('updateFail');
        console.log(e);

        return null;
    }
}

export async function addExamToSubjectArray({subjectId, title}) {
    try {
        const subject = await Subject.find({_id: subjectId});

        if (_.size(subject) && !_.includes(subject.tests, title)) {
            await Subject.update({_id: subjectId}, {$push: {tests: title}}, {});
        }
    } catch (e) {
        displayToast('updateFail');
        console.log(e);
    }
}

export async function updateSubjectTestArray(subjectId, examTitle) {
    try {
        let result = await Subject.find({_id: subjectId});

        if (_.size(result)) {
            result = await Subject.update({_id: subjectId}, {$pull: {tests: examTitle}}, {});
        }

        return result;
    } catch (e) {
        displayToast('updateFail');
        console.log(e);

        return null;
    }
}
