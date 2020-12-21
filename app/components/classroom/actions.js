import _ from 'lodash';

import {actions} from './constants';
import {addClassroomData, getClassroomData, deleteClassroom, updateRoomData} from '../../collections';
import {inputValidation} from '../helpers/formValidation';

export function changeClassroomTab(event) {
    return dispatch => {
        const tabButtons = {classTab: '', examTab: ''};

        const tabUpdate = _.set(
            tabButtons,
            event.target.getAttribute('data-name'),
            'active'
        );

        dispatch({
            type:    actions.CHANGE_CLASSROOM_TAB,
            payload: tabUpdate
        });
    };
}

const clearedForm = {
    name:       '',
    teacher:    '',
    substitute: '',
    check:      true,
    isInvalid:  false
};

export function handleClassData(event) {
    return async dispatch => {
        event.preventDefault();

        const formData = {
            name:       event.target.name.value,
            teacher:    event.target.teacher.value,
            substitute: event.target.substitute.value
        };

        if (inputValidation(formData)) {
            dispatch({
                type:    actions.CLASSROOM_FORM_VALIDATION,
                payload: {formData, isInvalid: true, check: true}
            });
        } else {
            event.target.reset();

            await addClassroomData(formData);
            await getClassroomData();

            dispatch({
                type:    actions.ADD_CLASSROOM_DATA,
                payload: {clearedForm}
            });
        }
    };
}

export function displayClassData() {
    return async dispatch => {
        const data = await getClassroomData();

        if (_.size(data)) {
            dispatch({
                type:    actions.GET_CLASSROOM_DATA,
                payload: {classData: data, check: false}
            });
        }
    };
}

async function updateRoomDispatcher(roomData, dispatch) {
    const docs = await updateRoomData(roomData);

    if (docs) {
        roomData.showModal = false;
        dispatch({
            type:    actions.GET_CLASSROOM_DATA,
            payload: {classData: docs, check: false}
        });
    }

    dispatch({
        type:    actions.UPDATE_CLASSROOM,
        payload: {...roomData, isInvalid: false}
    });
}

export function updateRoom(event) {
    return async dispatch => {
        event.preventDefault();

        const roomData = {
            name:       event.target.name.value,
            teacher:    event.target.teacher.value,
            substitute: event.target.substitute.value,
            oldName:    event.target.oldName.getAttribute('data-id'),
            id:         '',
            showModal:  true
        };

        if (inputValidation(_.omit(roomData, ['id']))) {
            dispatch({
                type:    actions.CLASSROOM_MODAL_VALIDATION,
                payload: {...roomData, isInvalid: true, check: false}
            });
        } else {
            await updateRoomDispatcher(roomData, dispatch);
        }
    };
}

export function deleteRoom(event) {
    return async dispatch => {
        const roomData = {
            id:        event.target.getAttribute('data-id'),
            showModal: true
        };

        const docs = await deleteClassroom(roomData);

        if (docs) {
            dispatch({
                type:    actions.GET_CLASSROOM_DATA,
                payload: {classData: docs, check: false}
            });
        }

        dispatch({
            type:    actions.UPDATE_CLASSROOM,
            payload: roomData
        });
    };
}

export function roomModalDisplay(event) {
    return dispatch => {
        event.preventDefault();

        const roomId = {
            id: event.target.getAttribute('data-id')
        };

        dispatch({
            type:    actions.OPEN_CLOSE_ROOM_MODAL,
            payload: {...roomId, isInvalid: false}
        });
    };
}
