import {toast} from 'react-toastify';
import {customTranslate} from '../utils';

export const options = {
    position:        'top-right',
    autoClose:       4000,
    hideProgressBar: false,
    closeOnClick:    true,
    pauseOnHover:    false,
    draggable:       false
};

export function displayToast(message) {
    toast.success(customTranslate(`'notifications.general.'${message}`), options);
}

export function firstMakeSelection(t, section) {
    toast.warn(t(`notifications.warning.${section}`), options);
}
