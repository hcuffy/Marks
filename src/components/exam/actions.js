import _ from 'lodash';

import {actions} from './constants';
import {addExamData, getAllExams, deleteExam, updateExamData} from '../../collections';
import {
    getSelectedOption,
    getFormValues,
    getTargetValue,
    inputValidation,
    getAttribute,
    getCustomAttribute
} from '../helpers';

export function addNewExam(event) {
    return async dispatch => {
        event.preventDefault();

        const examData = getFormValues(['title', 'date', 'weight'], event);

        _.set(examData, 'subjectId', getSelectedOption(event, 'subject'));

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

export function getSelectedClassroom(event) {
    return dispatch => {
        const classroom = getTargetValue(event);

        dispatch({
            type:    actions.GET_SELECTED_CLASS,
            payload: {classroom}
        });
    };
}

export function showClass(event) {
    return dispatch => {
        if (event['data-check'] !== 'classDropdown') {
            return;
        }

        const classroomId = event.id;

        dispatch({
            type:    actions.UPDATE_DROPDOWN_CLASS_LIST,
            payload: {classroomId}
        });
    };
}

export function showExamList(event) {
    return async dispatch => {
        if (event['data-check'] !== 'subjectDropdown') {
            return;
        }

        const subjectId = event.id;

        const exams = await getAllExams();
        if (_.size(exams)) {
            dispatch({
                type:    actions.DISPLAY_SUBJECT_LIST,
                payload: {exams, subjectId}
            });
        }
    };
}

export function showExamDialog(event) {
    return dispatch => {
        const examId = getAttribute('data-id', event);

        dispatch({
            type:    actions.GET_SINGLE_EXAM,
            payload: {examId, isDialogInvalid: false}
        });
    };
}

export function updateExam(event) {
    return async dispatch => {
        event.preventDefault();

        const examData = getFormValues(['title', 'date', 'weight'], event);
        _.set(examData, 'subjectId', getCustomAttribute('data-id', 'subjectId', event));
        _.set(examData, 'examId', getCustomAttribute('data-id', 'examId', event));

        const inputsToValidate = _.pick(examData, ['title', 'weight']);

        if (inputValidation(inputsToValidate)) {
            dispatch({
                type:    actions.EXAM_MODAL_VALIDATION,
                payload: {...inputsToValidate, isDialogInvalid: true}
            });
        } else {
            const exams = await updateExamData(examData);

            dispatch({
                type:    actions.GET_SINGLE_EXAM,
                payload: {examId: examData.examId, isDialogInvalid: false}
            });

            if (_.size(exams)) {
                dispatch({
                    type:    actions.UPDATE_EXAMS_LIST,
                    payload: {exams, isDialogInvalid: false}
                });
            }
        }
    };
}

export function deleteSingleExam(event) {
    return async dispatch => {
        const examData = {
            examId:    getAttribute('data-id', event),
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
