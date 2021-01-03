import _ from 'lodash';

import {actions} from './constants';
import {addClassroomData, getClassroomData, deleteClassroom, updateRoomData} from '../../collections';
import {getAttribute, getFormValues, inputValidation} from '../helpers';

export function changeClassroomTab(event) {
    return dispatch => {
        const tabButtons = {classTab: '', examTab: ''};
        const tabUpdate = _.set(tabButtons, getAttribute('data-name', event), 'active');

        dispatch({
            type:    actions.CHANGE_CLASSROOM_TAB,
            payload: tabUpdate
        });
    };
}

export function displayClassData() {
    return async dispatch => {
        const classData = await getClassroomData();

        if (_.size(classData)) {
            dispatch({
                type:    actions.GET_CLASSROOM_DATA,
                payload: {classData}
            });
        }
    };
}

export function handleClassData(event) {
    return async dispatch => {
        event.preventDefault();

        const formData = getFormValues(['name', 'teacher', 'substitute'], event);

        if (inputValidation(formData)) {
            dispatch({
                type:    actions.CLASSROOM_FORM_VALIDATION,
                payload: {formData, isInvalid: true}
            });
        } else {
            event.target.reset();

            await addClassroomData(formData);
            const classData = await getClassroomData();

            dispatch({
                type:    actions.GET_CLASSROOM_DATA,
                payload: {classData}
            });
        }
    };
}

async function updateRoomDispatcher(roomData, dispatch) {
    const classData = await updateRoomData(roomData);

    if (classData) {
        roomData.showModal = false;
        dispatch({
            type:    actions.GET_CLASSROOM_DATA,
            payload: {classData}
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

        const roomData = getFormValues(['name', 'teacher', 'substitute'], event);
        _.set(roomData, 'oldName', event.target.oldName.getAttribute('data-id'));
        _.set(roomData, 'id', '');
        _.set(roomData, 'showModal', true);

        if (inputValidation(_.omit(roomData, ['id']))) {
            dispatch({
                type:    actions.CLASSROOM_MODAL_VALIDATION,
                payload: {...roomData, isInvalid: true}
            });
        } else {
            await updateRoomDispatcher(roomData, dispatch);
        }
    };
}

export function deleteRoom(event) {
    return async dispatch => {
        const roomData = {
            id:        getAttribute('data-id', event),
            showModal: true
        };

        const docs = await deleteClassroom(roomData);

        if (docs) {
            dispatch({
                type:    actions.GET_CLASSROOM_DATA,
                payload: {classData: docs}
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
            id: getAttribute('data-id', event)
        };

        dispatch({
            type:    actions.OPEN_CLOSE_ROOM_MODAL,
            payload: {...roomId, isInvalid: false}
        });
    };
}
