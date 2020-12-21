import {settingsHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    title:    null,
    street:   null,
    province: null,
    country:  null,
    zip:      null,
    city:     null,
    year:     null
};

const gradingLoadState = {note: true, points: false, percent: false};

export function applyGradeSystem(state = gradingLoadState, action) {
    return reducerActionHandler(state, action, settingsHandlers);
}

export function applyAddressData(state = initialLoadState, action) {
    return reducerActionHandler(state, action, settingsHandlers);
}
