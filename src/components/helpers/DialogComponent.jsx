import React from 'react';
import {Button, Dialog, Classes, Intent} from '@blueprintjs/core';

function DialogFooter({t, footerData}) {
    const {dataId, nameId, closeId, deleteAction, closeAction} = footerData;

    return (
        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button
                    type='button'
                    intent={Intent.DANGER}
                    text={t('general.delete')}
                    onClick={deleteAction}
                    data-id={dataId}
                    name={nameId}
                />
                <Button type='submit' intent={Intent.SUCCESS} text={t('general.update')} formNoValidate/>
                <Button type='button' intent={Intent.NONE} text={t('general.close')} onClick={closeAction} data-id={closeId} />

            </div>
        </div>
    );
}

export function DialogFrame(t, modalOpen, updateAction, formData, extras, footerData) {
    return (
        < Dialog isOpen={modalOpen} title={t('general.edit')}>
            <div className={Classes.DIALOG_BODY}>
                <form onSubmit={updateAction} method='POST'>
                    {formData}
                    {extras}
                    <DialogFooter t={t} footerData={footerData}/>
                </form>
            </div>
        </ Dialog>
    );
}
