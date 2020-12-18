import {toast} from 'react-toastify';
import {options} from './general';

export function firstMakeSelection(t, section) {
    toast.warn(t(`notifications.warning.${section}`), options);
}
