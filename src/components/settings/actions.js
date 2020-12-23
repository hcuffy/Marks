import _ from 'lodash';

import {actions} from './constants';
import {saveGradeSystem, getSystemType, updateGradeType, addAddress, getAddressData} from '../../collections';

export function updateGradingSystem(event) {
    return async dispatch => {
        const systemType = {note: false, points: false, percent: false};
        const newSystemType = _.set(systemType, event.target.value, true);
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

        if (_.size(systemType)) {
            await saveGradeSystem(defaultSystemType);
            _.assign(systemType, defaultSystemType);
        }

        dispatch({
            type:    actions.GET_SYSTEM_TYPE,
            payload: {...systemType[0]}
        });
    };
}

export function saveSchoolAddress(event) {
    return dispatch => {
        event.preventDefault();

        const formData = {
            title:    event.target.title.value,
            street:   event.target.street.value,
            province: event.target.province.value,
            country:  event.target.country.value,
            zip:      event.target.zip.value,
            city:     event.target.city.value,
            year:     event.target.year.value
        };

        const addressData = addAddress(formData);
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
            const {title, street, province, country, zip, city, year} = data;
            dispatch({
                type:    actions.DISPLAY_SCHOOL_DATA,
                payload: {title, street, province, country, zip, city, year}
            });
        }
    };
}
