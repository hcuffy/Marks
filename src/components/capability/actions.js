import _ from 'lodash';

import {actions} from './constants';
import {getAllQuestions, updateQuestionData, updateSingleAnswer, getAllAnswers} from '../../collections';

export function openCapabilityClassList(event) {
    return dispatch => {
        if (event.target.getAttribute('data-check') !== 'classDropdown') {
            return;
        }

        dispatch({
            type:    actions.OPEN_CLOSE_CLASS_LIST,
            payload: {
                classroom:   event.target.innerText,
                classroomId: event.target.getAttribute('data-id')
            }
        });
    };
}

export function openCapabilityStudentList(event) {
    return async dispatch => {
        if (event.target.getAttribute('data-check') !== 'studentDropdown') {
            return;
        }

        event.persist();
        const questions = await getAllQuestions();

        dispatch({
            type:    actions.OPEN_CLOSE_STUDENT_LIST,
            payload: {
                studentName: event.target.innerText,
                studentId:   event.target.getAttribute('data-id'),
                questions
            }
        });
    };
}

export function getQuestions() {
    return async dispatch => {
        const questions = await getAllQuestions();

        dispatch({
            type:    actions.GET_ALL_QUESTIONS,
            payload: {questions}
        });
    };
}

export function openQuestionList(event) {
    return dispatch => {
        event.stopPropagation();

        if (
            event.target.getAttribute('data-check') !== 'openButton' ||
          _.isNull(event.target.getAttribute('data-id'))
        ) {
            return;
        }

        dispatch({
            type:    actions.OPEN_CLOSE_QUESTION_LIST,
            payload: {}
        });
    };
}

export function updateQuestionSet(event) {
    return async dispatch => {
        if (event.target.getAttribute('data-check') !== 'questionDropdown') {
            return;
        }

        const questionSetData = {
            classroomId: event.target.getAttribute('data-id'),
            questionSet: event.target.name
        };

        const questions = await updateQuestionData(questionSetData);

        dispatch({
            type:    actions.UPDATE_QUESTION_SET,
            payload: {questions}
        });
    };
}

export function handleCapabilityAnswers(event) {
    return async dispatch => {
        const formData = {
            classroomId: event.target.getAttribute('classroom-id'),
            questionId:  event.target.getAttribute('data-id'),
            studentId:   event.target.getAttribute('student-id'),
            optionTag:   event.target.getAttribute('option-tag')
        };

        if (_.includes(formData, null)) {
            return;
        }

        const answers = await updateSingleAnswer(formData);

        dispatch({
            type:    actions.UPDATE_ANSWERS,
            payload: {answers}
        });
    };
}

export function getAnswers() {
    return async dispatch => {
        const answers = await getAllAnswers();

        dispatch({
            type:    actions.UPDATE_ANSWERS,
            payload: {answers}
        });
    };
}
