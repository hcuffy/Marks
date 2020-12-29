import _ from 'lodash';

import {actions} from './constants';
import {saveGradeSystem, getSystemType, updateGradeType, addAddress, getAddressData} from '../../collections';
import {getFormValues} from '../helpers/formValidation';

export function updateGradingSystem(event) {
    return async dispatch => {
        const systemType = {note: false, points: false, percent: false};
        const newSystemType = _.set(systemType, event.currentTarget.value, true);
        const settings = await updateGradeType(newSystemType);

        dispatch({
            type:    actions.UPDATE_GRADING_DATA,
            payload: {...settings[0]}
        });
    };
}

export function getGradingSystem() {
    return async dispatch => {
        const defaultSystemType = [{note: true, points: false, percent: false}];
        const systemType = await getSystemType();

        if (!_.size(systemType)) {
            await saveGradeSystem(defaultSystemType);
            _.assign(systemType, defaultSystemType);
        }

        dispatch({
            type:    actions.GET_SYSTEM_TYPE,
            payload: {...systemType}
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
        const data = await getAddressData();

        if (_.size(data)) {
            const {title, street, province, country, zip, city, year} = data[0];

            dispatch({
                type:    actions.DISPLAY_SCHOOL_DATA,
                payload: {title, street, province, country, zip, city, year}
            });
        }
    };
}
