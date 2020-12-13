import {shell} from 'electron';

export const openResource = event => {
    const link = event.target.getAttribute('data-name');
    shell.openExternal(link);
};
