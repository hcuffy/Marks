import _ from 'lodash';

import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';
import {getAllSubjects, deleteSubject} from './subject';

const Classroom = connectionToDB('classroom');

export const addClassroomData = data => {
    Classroom.find({name: data.name}, (error, entry) => {
        if (error) {
            displayToast('saveFail');
        }
        if (entry.length > 0) {
            displayToast('exists');
        }

        const newData = data;
        newData.subjects = [];

        Classroom.insert(newData, (error, doc) => {
            if (error) {
                displayToast('saveFail');
            }
            displayToast('saveSuccess');

            return doc;
        });
    });
};

export const getClassroomData = () => new Promise(resolve => Classroom.find({}, (error, entry) => {
    if (error) {
        displayToast('retrieveFail');
    }

    return resolve(entry);
}));

const filteredSubjects = async classroomId => _.filter(await getAllSubjects(), {classroomId});

const deleteSubjectByClassroom = async classroomId => {
    const subjects = await filteredSubjects(classroomId);

    if (!_.isEmpty(subjects)) {
        _.forEach(subjects, subject => {
            deleteSubject({classroomId: subject._id});
        });
    }
};

export const deleteClassroom = ({id}) => new Promise(resolve => Classroom.remove({_id: id}, error => {
    if (error) {
        displayToast('deleteFail');
    }
    Classroom.find({}, (error, docs) => {
        if (error) {
            displayToast('deleteFail');
        }

        deleteSubjectByClassroom(id);

        return resolve(docs);
    });
}));

const checkSubject = checkingCurrent => {
    if (_.isNil(checkingCurrent.subjects)) {
        return false;
    }

    return checkingCurrent.subjects.length > 0;
};

const updateSingleClassroom = (previous, current) => {
    const {name, teacher, substitute} = current;
    const {subjects} = previous;

    if (checkSubject(current) === true) {
        subjects.push(current.subjects[0]);
    }

    Classroom.update(
        {name: previous.name},
        {
            name,
            teacher,
            substitute,
            subjects
        },
        {},
        error => {
            if (error) {
                displayToast('updateFail');
            }
            displayToast('updateSuccess');
        }
    );
};

export const updateRoomData = data => new Promise(resolve => Classroom.find({name: data.oldName}, (error, entry) => {
    if (error) {
        displayToast('updateFail');
    }
    if (entry.length > 0) {
        updateSingleClassroom(entry[0], data);
        Classroom.find({}, (error, docs) => {
            if (error) {
                displayToast('updateFail');
            }

            return resolve(docs);
        });
    }
}));

export const updateSubjectArray = data => {
    Classroom.find({name: data.name}, (error, entry) => {
        if (error) {
            displayToast('updateFail');
        }
        if (entry.length > 0) {
            updateSingleClassroom(entry[0], data);
            Classroom.find({}, (error, docs) => {
                if (error) {
                    displayToast('updateFail');
                }

                return docs;
            });
        }
    });
};

export const updateClassSubjectArray = (
    classroomId,
    oldSubject,
    newSubject
) => {
    Classroom.update(
        {_id: classroomId},
        {$push: {subjects: newSubject}},
        {},
        error => {
            if (error) {
                displayToast('updateFail');
            }
        }
    );

    Classroom.update(
        {_id: classroomId},
        {$pull: {subjects: oldSubject}},
        {},
        error => {
            if (error) {
                displayToast('updateFail');
            }
        }
    );
};
