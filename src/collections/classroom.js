import _ from 'lodash';

import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';
import {getAllSubjects, deleteSubject} from './subject';

const Classroom = connectionToDB('classroom');

export async function addClassroomData(data) {
    const count = await Classroom.count({name: data.name});

    if (count) {
        displayToast('exists', 'warn');

        return null;
    }
    const newData = data;
    newData.subjects = [];

    const result = await Classroom.insert(newData);

    if (result instanceof Error) {
        displayToast('saveFail', 'fail');

        return null;
    }

    displayToast('saveSuccess');

    return result;
}

export async function getClassrooms(data = {}) {
    const result = await Classroom.find(data);

    if (result instanceof Error) {
        displayToast('retrieveFail', 'fail');

        return null;
    }

    return _.sortBy(result, ['name']);
}

export async function getSingleClassroom(data) {
    const result = await Classroom.findOne(data);

    if (result instanceof Error) {
        displayToast('retrieveFail', 'fail');

        return null;
    }

    return result;
}

async function filteredSubjects(classroomId) {
    return _.filter(await getAllSubjects(), {classroomId});
}

async function deleteSubjectByClassroom(classroomId) {
    try {
        const subjects = await filteredSubjects(classroomId);

        if (!_.isEmpty(subjects)) {
            _.forEach(subjects, subject => {
                const id = subject._id;
                deleteSubject(id);
            });
        }
    } catch (e) {
        displayToast('deleteFail', 'fail');
        console.log(e);
    }
}

export async function deleteClassroom(id) {
    await Classroom.remove({_id: id});
    await deleteSubjectByClassroom(id);
    const result = await Classroom.find({});

    if (result instanceof Error) {
        displayToast('deleteFail', 'fail');

        return null;
    }

    return _.sortBy(result, ['name']);
}

function checkSubject(checkingCurrent) {
    if (_.isNil(checkingCurrent.subjects)) {
        return false;
    }

    return _.size(checkingCurrent.subjects);
}

async function updateSingleClassroom(previous, current) {
    const {name, teacher, substitute} = current;
    const {subjects} = previous;

    if (checkSubject(current)) {
        subjects.push(current.subjects[0]);
    }
    try {
        await Classroom.update({name: previous.name}, {name, teacher, substitute, subjects}, {});
        displayToast('updateSuccess');
    } catch (e) {
        displayToast('updateFail', 'fail');
        console.log(e);
    }
}

export async function updateRoomData(data) {
    let result = await Classroom.findOne({name: data.oldName});
    if (_.size(result)) {
        await updateSingleClassroom(result, data);
    }
    result = await Classroom.find({});

    if (result instanceof Error) {
        displayToast('updateFail', 'fail');

        return null;
    }

    return _.sortBy(result, ['name']);
}

export async function updateSubjectArray(data) {
    let result = await Classroom.findOne({name: data.name});

    if (_.size(result)) {
        await updateSingleClassroom(result, data);
    }
    result = await Classroom.find({});

    if (result instanceof Error) {
        displayToast('updateFail', 'fail');

        return null;
    }

    return _.sortBy(result, ['name']);
}

export async function updateClassSubjectArray(classroomId, oldSubject, newSubject) {
    try {
        await Classroom.update({_id: classroomId}, {$push: {subjects: newSubject}}, {});
    } catch (e) {
        displayToast('updateFail', 'fail');
        console.log(e);
    }
}
