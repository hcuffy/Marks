import _ from 'lodash';
import {actions} from './constants';

const clickedButton = (menuButtons, event) => _.set(menuButtons, event.target.getAttribute('data-id'), '#1dbb90');

export const updateButtonStyle = event => dispatch => {
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
