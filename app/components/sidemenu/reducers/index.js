import {sidemenuHandlers} from './reducerHandlers';
import {reducerActionHandler} from '../../../reducers/reducerUtils.js';

const initialLoadState = {
    home:       '#1dbb90',
    classroom:  '',
    students:   '',
    exams:      '',
    graphs:     '',
    notes:      '',
    capability: '',
    settings:   ''
};

export const applyMenuStyling = (state = initialLoadState, action) => {
    return reducerActionHandler(state, action, sidemenuHandlers);
};
