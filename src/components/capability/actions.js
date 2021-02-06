import _ from 'lodash';

import {actions} from './constants';
import {getAllQuestions, updateQuestionData, updateSingleAnswer, getAllAnswers} from '../../collections';
import {getAttribute} from '../helpers';

export function capabilityClassList(event) {
    return dispatch => {
        if (event['data-check'] !== 'classDropdown') {
            return;
        }

        dispatch({
            type:    actions.OPEN_CLOSE_CLASS_LIST,
            payload: {
                classroom:   event.name,
                classroomId: event.id
            }
        });
    };
}

export function capabilityStudentList(event) {
    return async dispatch => {
        if (event['data-check'] !== 'studentDropdown') {
            return;
        }

        const questions = await getAllQuestions();

        dispatch({
            type:    actions.OPEN_CLOSE_STUDENT_LIST,
            payload: {
                studentName: event.name,
                studentId:   event.id,
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

//Todo: Remove this function once all dropdowns have been replaced
export function handleQuestionList(event) {
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
        if (event['data-check'] !== 'questionDropdown') {
            return;
        }

        const questionSetData = {classroomId: event['data-id'], questionList: event.name};
        const questions = await updateQuestionData(questionSetData);

        dispatch({
            type:    actions.UPDATE_QUESTION_SET,
            payload: {questions, ...questionSetData}
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
