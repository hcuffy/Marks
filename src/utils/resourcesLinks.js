import {shell} from 'electron';

export function openResource({currentTarget}) {
    const link = currentTarget.getAttribute('data-name');

    shell.openExternal(link);
}
