import _ from 'lodash';

import {actions} from './constants';
import {getAllQuestions, updateSingleAnswer, getAllAnswers} from '../../collections';
import {getAttribute, getTargetValue} from '../helpers';

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
    return dispatch => {
        if (event['data-check'] !== 'studentDropdown') {
            return;
        }

        dispatch({
            type:    actions.OPEN_CLOSE_STUDENT_LIST,
            payload: {
                studentName: event.name,
                studentId:   event.id
            }
        });
    };
}

//TODO : delete this after the capability update
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
    return dispatch => {
        if (event['data-check'] !== 'questionDropdown') {
            return;
        }

        const questionSetData = {classroomId: event['data-id'], questionList: event.name};
        _.set(questionSetData, 'questionBase', event.title);

        dispatch({
            type:    actions.UPDATE_QUESTION_SET,
            payload: {...questionSetData}
        });
    };
}

export function handleCapabilityAnswers(event) {
    return async dispatch => {
        const formData = {
            classroomId: getAttribute('classroom-id', event),
            questionId:  getAttribute('data-id', event),
            studentId:   getAttribute('student-id', event),
            cardId:      getAttribute('card-id', event),
            answer:      getTargetValue(event)
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

export function openCard(event) {
    return dispatch => {
        dispatch({
            type:    actions.SHOW_CARDS,
            payload: {cardId: getAttribute('card-id', event)}
        });
    };
}
