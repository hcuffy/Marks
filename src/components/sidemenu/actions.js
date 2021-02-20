import _ from 'lodash';
import {actions} from './constants';

function clickedButton(menuButtons, {currentTarget}) {
    let selectedButton = currentTarget.getAttribute('data-id');
    const updatedMenu = {};
    _.forIn(menuButtons, (value, key) => {
        if (key !== selectedButton) {
            _.set(updatedMenu, key, '#e5e5e5');
        } else {
            _.set(updatedMenu, key, '#1dbb90');
        }
    });

    return updatedMenu;
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
            calendar:   '',
            settings:   ''
        };

        const styleUpdate = clickedButton(menuButtons, event);

        dispatch({
            type:    actions.HANDLE_MENU_CHANGE,
            payload: styleUpdate
        });
    };
}
