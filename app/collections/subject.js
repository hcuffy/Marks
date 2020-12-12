import {
    saveSuccessful,
    updateSuccessful,
    saveFailed,
    entryAlreadyExists,
    unableToRetrieve,
    deletionFailed,
    updateFailed
} from '../notifications/general';
import {
    getClassroomData,
    updateSubjectArray,
    updateClassSubjectArray
} from './classroom';
import {getAllExams, deleteExam} from './exam';

const _ = require('lodash');
const Datastore = require('nedb');
const electron = require('electron');
const path = require('path');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const collectionsPath = path.join(userDataPath, 'collections');
const Subject = new Datastore({
    filename:              path.join(collectionsPath, 'subject.db'),
    autoload:              true,
    corruptAlertThreshold: 1,
    timestampData:         true
});

const getSubjects = async({room, abbreviation}) => {
    const data = await getClassroomData();
    const selectedClass = _.find(data, {name: room});
    if (_.includes(selectedClass.subjects, abbreviation)) {
        return true;
    }

    return selectedClass;
};

export const getAllSubjects = () => new Promise(resolve => Subject.find({}, (err, docs) => {
    if (err) {
        unableToRetrieve();
    }

    return resolve(docs);
}));

export const addSubjectData = async data => {
    const subjectClassroom = await getSubjects(data);

    if (subjectClassroom === true) {
        entryAlreadyExists();

        return null;
    }

    const newSubject = _.merge(data, {
        tests:       [],
        classroomId: subjectClassroom._id
    });
    subjectClassroom.subjects.push(data.abbreviation);

    Subject.insert(newSubject, error => {
        if (error) {
            saveFailed();
        }
        updateSubjectArray(subjectClassroom);
        saveSuccessful();
    });
    const allSubjects = await getAllSubjects();

    return allSubjects;
};

const filteredExams = async subjectId => _.filter(await getAllExams(), {subjectId});

const deleteExamsBySubject = async subjectId => {
    const exams = await filteredExams(subjectId);

    if (!_.isEmpty(exams)) {
        _.forEach(exams, exam => {
            deleteExam({examId: exam._id, subjectId});
        });
    }
};

export const deleteSubject = ({id}) => new Promise(resolve => Subject.remove({_id: id}, err => {
    if (err) {
        deletionFailed();
    }
    filteredExams(id);
    Subject.find({}, (error, docs) => {
        if (err) {
            deletionFailed();
        }
        deleteExamsBySubject(id);

        return resolve(docs);
    });
}));

const checkSubjectChanges = (prev, curr) => {
    const {name, abbreviation} = curr;

    return !(_.isEqual(prev.name, name) &&
      _.isEqual(prev.abbreviation, abbreviation));
};

const updateClassroomSubjects = (
    classroomId,
    previousSubject,
    currentSubject
) => {
    if (!_.isEqual(previousSubject, currentSubject)) {
        updateClassSubjectArray(classroomId, previousSubject, currentSubject);
    }
};

const updateSingleSubject = (previous, current) => {
    const {name, abbreviation} = current;
    const {room, tests, classroomId} = previous;

    const subjectUpdatable = checkSubjectChanges(previous, current);
    if (subjectUpdatable) {
        updateClassroomSubjects(classroomId, previous.abbreviation, abbreviation);
        Subject.update(
            {_id: previous._id},
            {
                name,
                abbreviation,
                room,
                tests,
                classroomId
            },
            {},
            err => {
                if (err) {
                    updateFailed();
                }
                updateSuccessful();
            }
        );
    }
};

export const updateSubjectData = data => new Promise(resolve => Subject.find({_id: data.subjectId}, (err, entry) => {
    if (err) {
        updateFailed();
    }
    if (entry.length > 0) {
        updateSingleSubject(entry[0], data);
        Subject.find({_id: data.subjectId}, (error, docs) => {
            if (error) {
                updateFailed();
            }

            return resolve(docs);
        });
    }
}));

export const addExamToSubjectArray = ({subjectId, title}) => {
    Subject.find({_id: subjectId}, (err, doc) => {
        if (err) {
            unableToRetrieve();
        }
        if (doc.length <= 0) {
            return;
        }

        if (!_.includes(doc.tests, title)) {
            Subject.update(
                {_id: subjectId},
                {$push: {tests: title}},
                {},
                error => {
                    if (error) {
                        updateFailed();
                    }
                }
            );
        }
    });
};

export const updateSubjectTestArray = (subjectId, examTitle) => new Promise(resolve => Subject.find({_id: subjectId}, (err, entry) => {
    if (err) {
        updateFailed();
    }
    if (entry.length > 0) {
        Subject.update(
            {_id: subjectId},
            {$pull: {tests: examTitle}},
            {},
            (error, docs) => {
                if (error) {
                    updateFailed();
                }

                return resolve(docs);
            }
        );
    }
}));
