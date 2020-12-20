import _ from 'lodash';

import {actions} from './constants';
import {getAllExams, getAllGrades, addGradeData, updateGradeData} from '../../collections';

export function openGradeClassList(event) {
    return dispatch => {
        if (event.target.getAttribute('data-check') !== 'classDropdown') {
            return;
        }

        const classroomId = event.target.getAttribute('data-id');

        dispatch({
            type:    actions.OPEN_CLASS_LIST,
            payload: {classroomId}
        });
    };
}

async function filterGrades(exams) {
    const filteredGrades = [];
    const allGrades = await getAllGrades();

    for (let i = 0; i < exams.length; i += 1) {
        filteredGrades.push(..._.filter(allGrades, ['examId', exams[i]._id]));
    }

    return filteredGrades;
}

async function filterExams(subjectData) {
    return _.filter(await getAllExams(), ['subjectId', subjectData.subjectId]);
}

export function displayGradeData(event) {
    return async dispatch => {
        if (event.target.getAttribute('data-check') !== 'subjectDropdown') {
            return;
        }

        const subjectData = {
            subjectId:   event.target.getAttribute('data-id'),
            subjectName: event.target.innerText
        };

        const exams = await filterExams(subjectData);
        const grades = await filterGrades(exams);

        dispatch({
            type:    actions.DISPLAY_EXAM_TABLE,
            payload: {exams, grades, ...subjectData}
        });
    };
}

export function updateGrade(event) {
    return async dispatch => {
        const gradeId = event.target.getAttribute('data-id');

        const subjectData = {
            subjectId:   event.target.getAttribute('data-subjectid'),
            subjectName: event.target.getAttribute('data-subjectname')
        };

        const gradeData = {
            grade:     event.target.value === '' ? 0 : event.target.value,
            examId:    event.target.getAttribute('data-examid'),
            studentId: event.target.getAttribute('data-studentid'),
            date:      event.target.getAttribute('data-date'),
            weight:    event.target.getAttribute('data-weight')
        };

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
