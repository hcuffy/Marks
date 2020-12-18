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
        displayToast('retrieveFail');
    }

    return resolve(docs);
}));

export const addSubjectData = async data => {
    const subjectClassroom = await getSubjects(data);

    if (subjectClassroom === true) {
        displayToast('exists');

        return null;
    }

    const newSubject = _.merge(data, {
        tests:       [],
        classroomId: subjectClassroom._id
    });
    subjectClassroom.subjects.push(data.abbreviation);

    Subject.insert(newSubject, error => {
        if (error) {
            displayToast('saveFail');
        }
        updateSubjectArray(subjectClassroom);
        displayToast('saveSuccess');
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
        displayToast('deleteFail');
    }
    filteredExams(id);
    Subject.find({}, (error, docs) => {
        if (err) {
            displayToast('deleteFail');
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
                    displayToast('updateFail');
                }
                displayToast('updateSuccess');
            }
        );
    }
};

export const updateSubjectData = data => new Promise(resolve => Subject.find({_id: data.subjectId}, (err, entry) => {
    if (err) {
        displayToast('updateFail');
    }
    if (entry.length > 0) {
        updateSingleSubject(entry[0], data);
        Subject.find({_id: data.subjectId}, (error, docs) => {
            if (error) {
                displayToast('updateFail');
            }

            return resolve(docs);
        });
    }
}));

export const addExamToSubjectArray = ({subjectId, title}) => {
    Subject.find({_id: subjectId}, (err, doc) => {
        if (err) {
            displayToast('retrieveFail');
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
                        displayToast('updateFail');
                    }
                }
            );
        }
    });
};

export const updateSubjectTestArray = (subjectId, examTitle) => new Promise(resolve => Subject.find({_id: subjectId}, (err, entry) => {
    if (err) {
        displayToast('updateFail');
    }
    if (entry.length > 0) {
        Subject.update(
            {_id: subjectId},
            {$pull: {tests: examTitle}},
            {},
            (error, docs) => {
                if (error) {
                    displayToast('updateFail');
                }

                return resolve(docs);
            }
        );
    }
}));
