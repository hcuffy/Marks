import {settingsHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {title: '', street: '', province: '', country: '', zip: '', city: '', year: ''};
const gradingLoadState = {
    note:             true,
    points:           false,
    percent:          false,
    isInvalid:        false,
    confirmationText: null,
    showDialog:       false,
    resetId:          null
};

export function applyGradeSystem(state = gradingLoadState, action) {
    return reducerActionHandler(state, action, settingsHandlers);
}

export function applyAddressData(state = initialLoadState, action) {
    return reducerActionHandler(state, action, settingsHandlers);
}
