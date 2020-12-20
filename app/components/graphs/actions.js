import _ from 'lodash';

import {actions} from './constants';
import {getAllGrades, getAllExams} from '../../collections';

export function openGraphClassList(event) {
    return dispatch => {
        if (event.target.getAttribute('data-check') !== 'classDropdown') {
            return;
        }

        const data = {
            classroomId:    event.target.getAttribute('data-id'),
            chartTitle:     event.target.innerText,
            chartToDisplay: 'class'
        };

        dispatch({
            type:    actions.OPEN_GRAPH_CLASS_LIST,
            payload: data
        });
    };
}

export function displaySubjectGraph(event) {
    return dispatch => {
        if (event.target.getAttribute('data-check') !== 'subjectDropdown') {
            return;
        }

        event.persist();

        const data = {
            subjectId:      event.target.getAttribute('data-id'),
            chartTitle:     event.target.innerText,
            subjectName:    event.target.innerText,
            chartToDisplay: 'subject'
        };

        dispatch({
            type:    actions.DISPLAY_SUBJECT_GRADES,
            payload: data
        });
    };
}

export function displayExamGraph(event) {
    return dispatch => {
        if (event.target.getAttribute('data-check') !== 'examDropdown') {
            return;
        }

        const data = {
            examId:         event.target.getAttribute('data-id'),
            chartTitle:     event.target.innerText,
            examName:       event.target.innerText,
            chartToDisplay: 'exam'
        };

        dispatch({
            type:    actions.DISPLAY_EXAM_GRADES,
            payload: data
        });
    };
}

export function getAllGradeData() {
    return async dispatch => {
        const grades = await getAllGrades();

        dispatch({
            type:    actions.GET_ALL_GRADES,
            payload: {grades}
        });
    };
}

export function getGraphExamData() {
    return async dispatch => {
        const exams = await getAllExams();

        if (!_.size(exams)) {
            dispatch({
                type:    actions.GET_ALL_EXAMS,
                payload: {exams}
            });
        }
    };
}
