import {Intent, Position, Toaster} from '@blueprintjs/core';

import {customTranslate} from '../utils';

export function displayToast(message, toastType = 'success') {
    const AppToaster = Toaster.create({position: Position.TOP_RIGHT, maxToasts: 3, timeout: 4000});
    let intent = Intent.SUCCESS;

    if (toastType === 'fail') {
        intent = Intent.DANGER;
    }
    if (toastType === 'warn') {
        intent = Intent.WARNING;
    }

    AppToaster.show({intent, message: customTranslate(`notifications.${message}`)});
}
