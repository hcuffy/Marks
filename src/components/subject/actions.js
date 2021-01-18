import _ from 'lodash';

import {actions} from './constants';
import {addSubjectData, getAllSubjects, updateSubjectData, deleteSubject} from '../../collections';
import {getAttribute, getCustomAttribute, getFormValues, inputValidation} from '../helpers';

//TODO: remove this function once all dropdown have between replaced
export function openClassList(event) {
    return dispatch => {
        if (event.target.getAttribute('data-check') !== 'classDropdown') {
            return;
        }

        const subject = event.target.innerText;

        dispatch({
            type:    actions.UPDATE_CLASS_LIST,
            payload: {subject}
        });
    };
}

export function addNewSubject(event) {
    return async dispatch => {
        event.preventDefault();

        const formData = getFormValues(['name', 'abbreviation', 'room'], event);

        if (inputValidation(_.omit(formData, ['room']))) {
            dispatch({
                type:    actions.SUBJECT_FORM_VALIDATION,
                payload: {...formData, isInvalid: true}
            });
        } else {
            event.target.reset();

            const data = await addSubjectData(formData);

            dispatch({
                type:    actions.ADD_NEW_SUBJECT,
                payload: {data, isInvalid: false}
            });
        }
    };
}

export function getSubjectData() {
    return async dispatch => {
        const data = await getAllSubjects();

        dispatch({
            type:    actions.GET_SUBJECT_LIST,
            payload: {data}
        });
    };
}

export function showSubject(event) {
    return async dispatch => {
        const classroom = event.name;
        await getSubjectData();

        dispatch({
            type:    actions.GET_SINGLE_SUBJECT,
            payload: {classroom}
        });
    };
}

export function deleteSingleSubject(event) {
    return async dispatch => {
        const subjectData = {
            id: event.target.getAttribute('data-id')
        };

        const data = await deleteSubject(subjectData);

        dispatch({
            type:    actions.OPEN_CLOSE_SUBJECT_MODAL,
            payload: subjectData
        });

        dispatch({
            type:    actions.GET_SUBJECT_LIST,
            payload: {data}
        });
    };
}

async function updateSubjectDispatcher(subjectData, dispatch) {
    const subjectDoc = await updateSubjectData(subjectData);
    const data = await getAllSubjects();

    dispatch({
        type:    actions.OPEN_CLOSE_SUBJECT_MODAL,
        payload: {id: subjectData.subjectId}
    });

    if (_.size(subjectDoc)) {
        dispatch({
            type:    actions.GET_SINGLE_SUBJECT,
            payload: subjectDoc[0].room
        });

        dispatch({
            type:    actions.SUBJECT_MODAL_VALIDATION,
            payload: {name: '', abbreviation: '', isInvalid: false}
        });
    }

    dispatch({
        type:    actions.GET_SUBJECT_LIST,
        payload: {data}
    });

    dispatch({
        type:    actions.SUBJECT_MODAL_VALIDATION,
        payload: {name: '', abbreviation: '', isInvalid: false}
    });
}

export function updateSubject(event) {
    return async dispatch => {
        event.preventDefault();

        const subjectData = getFormValues(['name', 'abbreviation'], event);
        _.set(subjectData, 'classroomId', getCustomAttribute('data-id', 'classroomId', event));
        _.set(subjectData, 'subjectId', getCustomAttribute('data-id', 'subjectId', event));

        if (inputValidation(_.omit(subjectData, ['classroomId', 'subjectId']))) {
            dispatch({
                type:    actions.SUBJECT_MODAL_VALIDATION,
                payload: {...subjectData, isInvalid: true}
            });
        } else {
            await updateSubjectDispatcher(subjectData, dispatch);
        }
    };
}

export function displaySubjectDialog(event) {
    return dispatch => {
        event.preventDefault();

        const subjectId = {id: getAttribute('data-id', event)};

        dispatch({
            type:    actions.OPEN_CLOSE_SUBJECT_MODAL,
            payload: {...subjectId, isInvalid: false}
        });
    };
}
