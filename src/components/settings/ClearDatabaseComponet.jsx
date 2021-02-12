import React from 'react';

import {Button, Classes, Dialog, FormGroup, InputGroup, Intent} from '@blueprintjs/core';

export function ResetDialog(t, openDialog, updateAction, confirmation, isInvalid, closeAction) {
    const inputIntent = isInvalid ? Intent.DANGER : Intent.NONE;

    return (
        < Dialog isOpen={openDialog} onClose={closeAction} title={t('settings.resetDialog')}>
            <div className={Classes.DIALOG_BODY}>
                <form onSubmit={updateAction} method='POST'>
                    <FormGroup inline={false} labelFor={'reset_Id'} label={t('settings.resetLabel')}>
                        <InputGroup
                            name={'reset-input'}
                            id={'reset_Id'}
                            type='text'
                            intent={inputIntent}
                            defaultValue={confirmation}
                        />
                    </FormGroup>
                    <div className={Classes.DIALOG_FOOTER}>
                        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                            <Button type='submit' intent={Intent.DANGER} text={t('general.reset')} />
                        </div>
                    </div>
                </form>
            </div>
        </ Dialog>
    );
}

