import React from 'react';
import {FormGroup, InputGroup, Intent, Label, NumericInput} from '@blueprintjs/core';

import css from './style.css';

export function resolveHiddenInputs(subjectId, examId) {
    return (
        <div>
            <InputGroup type='hidden' name='subjectId' data-id={subjectId}/>
            <InputGroup type='hidden' name='examId' data-id={examId}/>
        </div>
    );
}

function TitleInput({t, selectedExam, intent}) {
    const {title} = selectedExam;

    return (
        <div className={css.dialog_input}>
            <FormGroup inline={false} labelFor={'titleId'} label={t('exam.title')}>
                <InputGroup
                    name='title'
                    data-id='titleId'
                    type='text'
                    className={css.dialog_date}
                    intent={intent}
                    defaultValue={title}
                />
            </FormGroup>
        </div>
    );
}

function WeightInput({t, selectedExam, intent}) {
    const {weight} = selectedExam;

    return (
        <div className={css.dialog_input}>
            <Label className={css.weight_label} htmlFor='number-input'> {t('general.weight')} </Label>
            <NumericInput
                defaultValue={weight}
                className={css.dialog_date}
                intent={intent}
                leftIcon={'layers'}
                name='weight'
                data-id='number-input'
                min={1}
                max={4}
                stepSize={0.5}
            />

        </div>
    );
}

function DateSelect({t, selectedExam, intent}) {
    const {date} = selectedExam;

    return (
        <div className={css.dialog_input}>
            <Label className={'bp3-inline'} htmlFor='dateIn'> {t('general.date')}
                <InputGroup
                    name='date'
                    intent={intent}
                    type='date'
                    className={css.dialog_date}
                    id='dateIn'
                    defaultValue={date}
                />
            </Label>
        </div>
    );
}

export function determineExamInputs(exam, examData) {
    const {title, weight, isDialogInvalid} = examData;
    const {date} = exam;

    if (isDialogInvalid === true) {
        return {title, weight, date, isDialogInvalid};
    } else {
        return exam;
    }
}

export function DialogInputs({t, selection, examData}) {
    const selectedExam = determineExamInputs(selection, examData);
    const intent = selectedExam.isDialogInvalid ? Intent.DANGER : Intent.NONE;

    return (<div className={css.dialog_div}>

        <TitleInput t={t} selectedExam={selectedExam} intent={intent}/>
        <WeightInput t={t} selectedExam={selectedExam} intent={intent}/>
        <DateSelect t={t} selectedExam={selectedExam} intent={intent}/>

    </div>
    );
}
