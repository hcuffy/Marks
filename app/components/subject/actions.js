import _ from 'lodash';
import {actions} from './constants';
import {
    addSubjectData,
    getAllSubjects,
    updateSubjectData,
    deleteSubject
} from '../../collections/subject';
import {inputValidation} from '../helpers/formValidation';

export const openClassList = event => dispatch => {
    if (event.target.getAttribute('data-check') !== 'classDropdown') {
        return;
    }

    const subject = event.target.innerText;

    dispatch({
        type:    actions.UPDATE_CLASS_LIST,
        payload: {subject}
    });
};

export const addNewSubject = event => async dispatch => {
    event.preventDefault();

    const formData = {
        name:         event.target.name.value,
        abbreviation: event.target.abbreviation.value,
        room:         event.target.room.value
    };

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

export const getSubjectData = () => async dispatch => {
    const data = await getAllSubjects();

    dispatch({
        type:    actions.GET_SUBJECT_LIST,
        payload: {data}
    });
};

export const showSubject = event => dispatch => {
    const subject = event.target.innerText;

    getSubjectData();

    dispatch({
        type:    actions.GET_SINGLE_SUBJECT,
        payload: {subject}
    });
};

export const deleteSingleSubject = event => async dispatch => {
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

const updateSubjectDispatcher = async(subjectData, dispatch) => {
    const subjectDoc = await updateSubjectData(subjectData);
    const data = await getAllSubjects();

    dispatch({
        type:    actions.OPEN_CLOSE_SUBJECT_MODAL,
        payload: {id: subjectData.subjectId}
    });

    if (subjectDoc.length > 0) {
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
};

export const updateSubject = event => async dispatch => {
    event.preventDefault();

    const subjectData = {
        name:         event.target.name.value,
        abbreviation: event.target.abbreviation.value,
        classroomId:  event.target.classroomId.getAttribute('data-id'),
        subjectId:    event.target.subjectId.getAttribute('data-id')
    };

    if (inputValidation(_.omit(subjectData, ['classroomId', 'subjectId']))) {
        dispatch({
            type:    actions.SUBJECT_MODAL_VALIDATION,
            payload: {...subjectData, isInvalid: true}
        });
    } else {
        await updateSubjectDispatcher(subjectData, dispatch);
    }
};

export const subjectModalDisplay = event => dispatch => {
    event.preventDefault();

    const subjectId = {
        id: event.target.getAttribute('data-id')
    };

    dispatch({
        type:    actions.OPEN_CLOSE_SUBJECT_MODAL,
        payload: {...subjectId, isInvalid: false}
    });
};
