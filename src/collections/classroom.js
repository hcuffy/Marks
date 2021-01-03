import _ from 'lodash';

import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';
import {getAllSubjects, deleteSubject} from './subject';

const Classroom = connectionToDB('classroom');

export async function addClassroomData(data) {
    const count = await Classroom.count({name: data.name});

    if (count) {
        displayToast('exists');

        return null;
    }
    const newData = data;
    newData.subjects = [];

    const result = await Classroom.insert(newData);

    if (result instanceof Error) {
        displayToast('saveFail');

        return null;
    }

    displayToast('saveSuccess');

    return result;
}

export async function getClassroomData() {
    const result = await Classroom.find({});

    if (result instanceof Error) {
        displayToast('retrieveFail');

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
                deleteSubject({classroomId: subject._id});
            });
        }
    } catch (e) {
        displayToast('deleteFail');
        console.log(e);
    }
}

export async function deleteClassroom({id}) {
    await Classroom.remove({_id: id});
    await deleteSubjectByClassroom(id);
    const result = await Classroom.find({});

    if (result instanceof Error) {
        displayToast('deleteFail');

        return null;
    }

    return result;
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
        displayToast('updateFail');
        console.log(e);
    }
}

export async function updateRoomData(data) {
    const count = await Classroom.count({name: data.oldName});
    if (count) {
        await updateSingleClassroom(result[0], data);
    }
    const result = await Classroom.find({});

    if (result instanceof Error) {
        displayToast('updateFail');

        return null;
    }

    return result;
}

export async function updateSubjectArray(data) {
    const count = await Classroom.count({name: data.name});
    if (count) {
        await updateSingleClassroom(result[0], data);
    }
    const result = await Classroom.find({});

    if (result instanceof Error) {
        displayToast('updateFail');

        return null;
    }

    return result;
}

export async function updateClassSubjectArray(classroomId, oldSubject, newSubject) {
    try {
        await Classroom.update({_id: classroomId}, {$push: {subjects: newSubject}}, {});
    } catch (e) {
        displayToast('updateFail');
        console.log(e);
    }
}
