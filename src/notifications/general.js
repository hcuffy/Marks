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

export function displayToast(message, toastType = 'success') {
    if (toastType === 'success') {
        return toast.success(customTranslate(`'notifications.${message}`), options);
    }

    return toast.error(customTranslate(`'notifications.${message}`), options);
}

export function firstMakeSelection(t, section) {
    toast.warn(t(`notifications.${section}`), options);
}
