import React from 'react';
import _ from 'lodash';
import {Button, Dialog, Classes, Intent, FormGroup, InputGroup} from '@blueprintjs/core';

import css from '../classroom/style.css';

function DialogFooter({t, footerData}) {
    const {dataId, nameId, deleteAction} = footerData;

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

            </div>
        </div>
    );
}

export function DialogFrame(t, openDialog, updateAction, formData, extras, footerData, closeAction) {
    return (
        < Dialog isOpen={openDialog} onClose={closeAction} title={t('general.edit')}>
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

export function DialogInputs({t, selection, isInvalid, label}) {
    function intent(data) {
        return isInvalid && _.isEmpty(selection[data]) ? Intent.DANGER : Intent.NONE;
    }

    return _.keys(selection).map((data, idx) => (
        <div key={idx} className={css.form_div}>
            <FormGroup inline={false} labelFor={`${data}_Id`} label={t(`${label}.${data}`)}>

                <InputGroup
                    name={data}
                    id={`${data}_Id`}
                    data-id={`${data}_Id`}
                    type='text'
                    intent={intent(data)}
                    defaultValue={selection[data]}
                />
            </FormGroup>
        </div>
    ));
}
