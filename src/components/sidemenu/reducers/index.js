import {sidemenuHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    home:       '#1dbb90',
    classroom:  '#e5e5e5',
    students:   '#e5e5e5',
    exams:      '#e5e5e5',
    graphs:     '#e5e5e5',
    notes:      '#e5e5e5',
    capability: '#e5e5e5',
    settings:   '#e5e5e5'
};

export function applyMenuStyling(state = initialLoadState, action) {
    return reducerActionHandler(state, action, sidemenuHandlers);
}
