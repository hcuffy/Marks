import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import {Button, Dialog, Classes, Intent, FormGroup, InputGroup, Position} from '@blueprintjs/core';
import {DateInput} from '@blueprintjs/datetime';

import {getUserLocale} from '../../utils';
import {getMomentFormatter} from './utils';
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
                <Button type='submit' intent={Intent.SUCCESS} text={t('general.update')}/>

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

export function DateInputField({calendarDate}) {
    const defaultDate = calendarDate ? new Date(calendarDate) : new Date();

    return (<DateInput
        name='date'
        type='date'
        id='dateIn'
        defaultValue={defaultDate}
        locale={getUserLocale()}
        minDate={new Date(moment().subtract(7, 'y'))}
        maxDate={new Date(moment().add(7, 'y'))}
        {...getMomentFormatter('L')}
        highlightCurrentDay={true}
        popoverProps={{position: Position.LEFT_BOTTOM}}
    />);
}
