import _ from 'lodash';

import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';
import {getAllSubjects, deleteSubject} from './subject';

const Classroom = connectionToDB('classroom');

export async function addClassroomData(data) {
    try {
        const count = await Classroom.count({name: data.name});

        if (count) {
            displayToast('exists');

            return null;
        }
        const newData = data;
        newData.subjects = [];

        let result = Classroom.insert(newData);

        displayToast('saveSuccess');

        return result;
    } catch (e) {
        displayToast('saveFail');
        console.log(e);

        return null;
    }
}

export async function getClassroomData() {
    try {
        let result = await Classroom.find({});

        return result;
    } catch (e) {
        displayToast('retrieveFail');
        console.log(e);

        return null;
    }
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
        console.log(e);
    }
}

export async function deleteClassroom({id}) {
    try {
        await Classroom.remove({_id: id});
        await deleteSubjectByClassroom(id);
        let result = await Classroom.find({});

        return result;
    } catch (e) {
        displayToast('deleteFail');
        console.log(e);

        return null;
    }
}

function checkSubject(checkingCurrent) {
    if (_.isNil(checkingCurrent.subjects)) {
        return false;
    }

    return _.size(checkingCurrent.subjects) > 0;
}

async function updateSingleClassroom(previous, current) {
    const {name, teacher, substitute} = current;
    const {subjects} = previous;

    if (checkSubject(current) === true) {
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
    try {
        const count = await Classroom.count({name: data.oldName});
        if (count) {
            await updateSingleClassroom(result[0], data);
        }
        const result = await Classroom.find({});

        return result;
    } catch (e) {
        displayToast('updateFail');
        console.log(e);

        return null;
    }
}

export async function updateSubjectArray(data) {
    try {
        const count = await Classroom.count({name: data.name});
        if (count) {
            await updateSingleClassroom(result[0], data);
        }
        const result = await Classroom.find({});

        return result;
    } catch (e) {
        displayToast('updateFail');
        console.log(e);

        return null;
    }
}

export async function updateClassSubjectArray(classroomId, oldSubject, newSubject) {
    try {
        await Classroom.update({_id: classroomId}, {$push: {subjects: newSubject}}, {});

        await Classroom.update({_id: classroomId}, {$pull: {subjects: oldSubject}}, {});
    } catch (e) {
        displayToast('updateFail');
        console.log(e);
    }
}
