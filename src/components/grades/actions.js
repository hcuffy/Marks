import _ from 'lodash';

import {actions} from './constants';
import {getAllExams, getAllGrades, addGradeData, updateGradeData} from '../../collections';
import {getAttribute, getTargetValue} from '../helpers';

export function handleGradeClassList(event) {
    return dispatch => {
        if (event['data-check'] !== 'classDropdown') {
            return;
        }

        const classroomId = event.id;
        const classroom = event.name;

        dispatch({
            type:    actions.OPEN_CLASS_LIST,
            payload: {classroomId, classroom}
        });
    };
}

async function filterGrades(exams) {
    const filteredGrades = [];
    const allGrades = await getAllGrades();

    for (let i = 0; i < exams.length; i += 1) {
        filteredGrades.push(..._.filter(allGrades, ['examId', exams[i]?._id]));
    }

    return filteredGrades;
}

async function filterExams(subjectData) {
    return _.filter(await getAllExams(), ['subjectId', subjectData.subjectId]);
}

export function showGradeData(event) {
    return async dispatch => {
        if (event['data-check'] !== 'subjectDropdown') {
            return;
        }

        const subjectData = {subjectId: event.id, subjectName: event.name};

        const exams = await filterExams(subjectData);
        const grades = await filterGrades(exams);

        dispatch({
            type:    actions.DISPLAY_EXAM_TABLE,
            payload: {exams, grades, ...subjectData}
        });
    };
}

export function updateStudentGrade(event) {
    return async dispatch => {
        const subjectData = {
            subjectId:   getAttribute('subjectid', event),
            subjectName: getAttribute('subjectname', event)
        };

        const grade = getTargetValue(event);
        const gradeData = {
            grade:     grade === '' ? 0 : grade,
            examId:    getAttribute('examid', event),
            studentId: getAttribute('studentid', event),
            date:      getAttribute('data-date', event),
            weight:    getAttribute('weight', event)
        };

        const gradeId = getAttribute('id', event);

        if (_.isNull(gradeId)) {
            await addGradeData(gradeData);
        } else {
            await updateGradeData(gradeData, gradeId);
        }

        const exams = await filterExams(subjectData);
        const grades = await filterGrades(exams);

        dispatch({
            type:    actions.UPDATE_EXAM_TABLE,
            payload: {exams, grades}
        });
    };
}
