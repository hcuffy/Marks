import _ from 'lodash';

import {actions, dangerAction} from './constants';
import {saveGradeSystem, updateGradeType, addAddress, getSettingsData, clearDatabases, clearCalendar} from '../../collections';
import {getAttribute, getCustomAttribute, getFormValues} from '../helpers';

export function updateGradingSystem(event) {
    return async dispatch => {
        const systemType = {note: false, points: false, percent: false};
        const newSystemType = _.set(systemType, event.currentTarget?.value, true);
        const settings = await updateGradeType(newSystemType);

        dispatch({
            type:    actions.UPDATE_GRADING_DATA,
            payload: settings
        });
    };
}

export function getGradingSystem() {
    return async dispatch => {
        const defaultSystemType = [{note: true, points: false, percent: false}];
        const systemType = await getSettingsData();

        if (!_.size(systemType)) {
            await saveGradeSystem(defaultSystemType);
            _.assign(systemType, defaultSystemType);
        }

        dispatch({
            type:    actions.GET_SYSTEM_TYPE,
            payload: systemType
        });
    };
}

export function saveSchoolAddress(event) {
    return async dispatch => {
        event.preventDefault();

        const formData = getFormValues(['title', 'street', 'province', 'country', 'zip', 'city', 'year'], event);

        const addressData = await addAddress(formData);
        const {title, street, province, country, zip, city, year} = addressData;

        dispatch({
            type:    actions.HANDLE_SCHOOL_DATA,
            payload: {title, street, province, country, zip, city, year}
        });
    };
}

export function displayAddress() {
    return async dispatch => {
        const data = await getSettingsData();

        if (_.size(data)) {
            const {title, street, province, country, zip, city, year} = data;

            dispatch({
                type:    actions.DISPLAY_SCHOOL_DATA,
                payload: {title, street, province, country, zip, city, year}
            });
        }
    };
}

export function showResetDialog(event) {
    return dispatch => {
        const resetId = getAttribute('data-id', event);

        dispatch({
            type:    actions.DISPLAY_DIALOG,
            payload: {resetId}
        });
    };
}

function validateData(confirmationText) {
    const isInvalid = !_.includes(['ja', 'yes'], _.lowerCase(confirmationText));
    const showDialog = !!isInvalid;

    return {isInvalid, showDialog};
}

function clearSpecificDB(resetId) {
    if (resetId === dangerAction.calendar) {
        clearCalendar();
    } else if (resetId === dangerAction.db) {
        clearDatabases();
    }
}

export function resetDatabase(event) {
    event.preventDefault();

    return dispatch => {
        let confirmationText = event.currentTarget?.resetInput?.value;
        let resetId = getCustomAttribute('resetid', 'resetInput', event);
        let {isInvalid, showDialog} = validateData(confirmationText);

        if (!isInvalid) {
            clearSpecificDB(resetId);
            confirmationText = null;
            resetId = null;
        }

        dispatch({
            type:    actions.RESET_DATABASE,
            payload: {showDialog, isInvalid, confirmationText, resetId}
        });
    };
}

