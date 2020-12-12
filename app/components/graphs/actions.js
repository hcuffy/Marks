import {actions} from './constants';
import {getAllGrades} from '../../collections/grade';
import {getAllExams} from '../../collections/exam';

export const openGraphClassList = event => dispatch => {
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

export const displaySubjectGraph = event => dispatch => {
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

export const displayExamGraph = event => dispatch => {
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

export const getAllGradeData = () => async dispatch => {
    const grades = await getAllGrades();

    dispatch({
        type:    actions.GET_ALL_GRADES,
        payload: {grades}
    });
};

export const getGraphExamData = () => async dispatch => {
    const exams = await getAllExams();

    if (exams.length !== 0) {
        dispatch({
            type:    actions.GET_ALL_EXAMS,
            payload: {exams}
        });
    }
};
