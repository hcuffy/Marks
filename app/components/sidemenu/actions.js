import _ from 'lodash';
import {actions} from './constants';

function clickedButton(menuButtons, event) {
    return _.set(menuButtons, event.target.getAttribute('data-id'), '#1dbb90');
}

export function updateButtonStyle(event) {
    return dispatch => {
        const menuButtons = {
            home:       '',
            classroom:  '',
            students:   '',
            exams:      '',
            graphs:     '',
            notes:      '',
            capability: '',
            settings:   ''
        };

        const styleUpdate = clickedButton(menuButtons, event);

        dispatch({
            type:    actions.HANDLE_MENU_CHANGE,
            payload: styleUpdate
        });
    };
}
