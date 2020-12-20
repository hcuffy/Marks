import _ from 'lodash';

import {actions} from './constants';
import {addExamData, getAllExams, deleteExam, updateExamData} from '../../collections';
import {getOption} from '../students/actions';
import {inputValidation} from '../helpers/formValidation';

export function addNewExam(event) {
    return async dispatch => {
        event.preventDefault();

        const examData = {
            title:     event.target.title.value,
            subjectId: getOption(event, 'subject'),
            date:      event.target.date.value,
            weight:    event.target.weight.value
        };

        if (inputValidation(_.pick(examData, ['title']))) {
            dispatch({
                type:    actions.EXAM_FORM_VALIDATION,
                payload: {isInvalid: true}
            });
        } else {
            await addExamData(examData);

            event.target.reset();

            dispatch({
                type:    actions.ADD_NEW_EXAM,
                payload: {isInvalid: false}
            });
        }
    };
}

export function getSelectedSubject(event) {
    return dispatch => {
        const subject = event.target.value;

        dispatch({
            type:    actions.GET_SELECTED_CLASS,
            payload: {subject}
        });
    };
}

export function openClassDropdownList(event) {
    return dispatch => {
        if (event.target.getAttribute('data-check') !== 'classDropdown') {
            return;
        }

        const classroomId = event.target.getAttribute('data-id');

        dispatch({
            type:    actions.UPDATE_DROPDOWN_CLASS_LIST,
            payload: {classroomId}
        });
    };
}

export function displayExamData(event) {
    return async dispatch => {
        if (event.target.getAttribute('data-check') !== 'subjectDropdown') {
            return;
        }

        const subjectId = event.target.getAttribute('data-id');
        const selectedSubject = event.target.innerText;

        const exams = await getAllExams();
        if (!_.size(exams)) {
            dispatch({
                type:    actions.DISPLAY_SUBJECT_LIST,
                payload: {exams, subjectId, selectedSubject, openClassDropdown: false}
            });
        }
    };
}

export function showSingleExam(event) {
    return dispatch => {
        const examId = event.target.getAttribute('data-id');

        dispatch({
            type:    actions.GET_SINGLE_EXAM,
            payload: {examId, isModalInvalid: true}
        });
    };
}

export function updateExam(event) {
    return async dispatch => {
        event.preventDefault();

        const examData = {
            title:     event.target.title.value,
            date:      event.target.date.value,
            weight:    event.target.weight.value,
            subjectId: event.target.subjectId.getAttribute('data-id'),
            examId:    event.target.examId.getAttribute('data-id')
        };
        const inputsToValidate = _.pick(examData, ['title', 'weight']);

        if (inputValidation(inputsToValidate)) {
            dispatch({
                type:    actions.EXAM_MODAL_VALIDATION,
                payload: {...inputsToValidate, isModalInvalid: true}
            });
        } else {
            const exams = await updateExamData(examData);

            dispatch({
                type:    actions.GET_SINGLE_EXAM,
                payload: {examId: examData.examId, isModalInvalid: false}
            });

            if (_.size(exams)) {
                dispatch({
                    type:    actions.UPDATE_EXAMS_LIST,
                    payload: {exams, isModalInvalid: false}
                });
            }
        }
    };
}

export function deleteSingleExam(event) {
    return async dispatch => {
        const examData = {
            examId:    event.target.getAttribute('data-id'),
            subjectId: event.target.name
        };

        const exams = await deleteExam(examData);

        dispatch({
            type:    actions.GET_SINGLE_EXAM,
            payload: {examId: examData.examId}
        });

        if (_.size(exams)) {
            dispatch({
                type:    actions.UPDATE_EXAMS_LIST,
                payload: {exams}
            });
        }
    };
}
