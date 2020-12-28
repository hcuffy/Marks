import React from 'react';
import _ from 'lodash';

import {Input, Label} from 'reactstrap';
import css from './styles/exam.css';

export function resolveHiddenInputs(subjectId, examId) {
    return (
        <div>
            <Input type='hidden' name='subjectId' data-id={subjectId} />
            <Input type='hidden' name='examId' data-id={examId} />
        </div>
    );
}

function examTitle(t, {title, isModalInvalid}) {
    return (
        <div className={css.form_div_edit}>
            <Label
                className={css.form_label_edit}
                htmlFor={`${_.keys({title})[0]}_Id`}
            >
                {t(`exam.${_.keys({title})[0]}`)}:
            </Label>

            <Input
                name={_.keys({title})[0]}
                className={`${css.form_input} ${css.modalInput} form-control`}
                data-id={`${_.keys({title})[0]}_Id`}
                type='text'
                defaultValue={title}
                invalid={isModalInvalid && _.isEmpty(title)}
            />
        </div>
    );
}

function examWeight(t, {weight, isModalInvalid}) {
    return (
        <div className={css.form_div_edit}>
            <Label
                className={css.form_label_edit}
                htmlFor={`${_.keys({weight})[0]}_Id`}
            >
                {t(`general.${_.keys({weight})[0]}`)}:
            </Label>

            <Input
                name={_.keys({weight})[0]}
                className={`${css.form_input} form-control`}
                data-id={`${_.keys({weight})[0]}_Id`}
                type='number'
                min='1'
                max='4'
                step='0.5'
                defaultValue={weight}
                invalid={isModalInvalid && _.isEmpty(weight)}
            />
        </div>
    );
}

function examDate(t, {date}) {
    return (
        <div className={css.form_div_edit}>
            <Label
                className={css.form_label_edit}
                htmlFor={`${_.keys({date})[0]}_Id`}
            >
                {t(`general.${_.keys({date})[0]}`)}:
            </Label>

            <Input
                name={_.keys({date})[0]}
                className={`${css.form_input} form-control`}
                data-id={`${_.keys({date})[0]}_Id`}
                type='date'
                defaultValue={date}
            />
        </div>
    );
}

export function determineExamInputs(exam, examData) {
    const {title, weight, isModalInvalid} = examData;
    const {date} = exam;

    if (isModalInvalid === true) {
        return {title, weight, date, isModalInvalid};
    } else {
        return exam;
    }
}

export function generateExamForm(t, exam, examData) {
    const selectedExam = determineExamInputs(exam, examData);

    return (
        <div>
            {examTitle(t, selectedExam)}
            {examWeight(t, selectedExam)}
            {examDate(t, selectedExam)}
        </div>
    );
}
