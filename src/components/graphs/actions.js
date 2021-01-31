import _ from 'lodash';

import {actions} from './constants';
import {getAllGrades, getAllExams} from '../../collections';

export function handleGraphClassList(event) {
    return dispatch => {
        if (event['data-check'] !== 'classDropdown') {
            return;
        }

        const data = {
            classroomId:    event.id,
            chartTitle:     event.name,
            chartToDisplay: 'class'
        };

        dispatch({
            type:    actions.OPEN_GRAPH_CLASS_LIST,
            payload: data
        });
    };
}

export function handleSubjectList(event) {
    return dispatch => {
        if (event['data-check'] !== 'subjectDropdown') {
            return;
        }

        const data = {
            subjectId:      event.id,
            chartTitle:     event.name,
            subjectName:    event.name,
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
        if (event['data-check'] !== 'examDropdown') {
            return;
        }

        const data = {examId: event.id, chartTitle: event.name, chartToDisplay: 'exam'};

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

        if (_.size(exams)) {
            dispatch({
                type:    actions.GET_ALL_EXAMS,
                payload: {exams}
            });
        }
    };
}
