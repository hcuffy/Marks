import {shell} from 'electron';

export function openResource(event) {
    const link = event.target.getAttribute('data-name');
    shell.openExternal(link);
}
