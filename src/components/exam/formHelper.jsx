import React from 'react';
import _ from 'lodash';
import {Button, Input, Label} from 'reactstrap';

import {getClassroomProp} from '../helpers';
import css from './styles/exam.css';

export function getClassOptions(classInfo) {
    return _.values(classInfo).map((data, idx) => (
        <option className='form-control dropup' key={idx}>
            {data.name}
        </option>
    ));
}

export function getSubjectOptions(subjectData, examData, cleanedClassList) {
    const {subject} = examData;
    const classroom = subject || cleanedClassList[0].name;
    const classroomId = getClassroomProp(classroom, cleanedClassList);
    const filteredSubject = _.filter(subjectData.data, ['classroomId', classroomId]);

    return _.values(filteredSubject).map((data, idx) => (
        <option className='form-control dropup' key={idx} data-id={data._id}>
            {data.abbreviation}
        </option>
    ));
}

function titleInput(isInvalid, t) {
    return (
        <div>
            <Label className={css.form_label} htmlFor='titleId'>
                {t('exam.title')}*:
            </Label>

            <Input
                name='title'
                className='form-control'
                data-id='titleId'
                type='text'
                invalid={isInvalid}
            />
        </div>
    );
}

function classInput(t, options, action) {
    return (
        <div>
            <Label className={css.form_label} htmlFor='classSelection'>
                {t('general.selectRoom')}:
            </Label>

            <select
                onChange={action}
                className='form-control'
                name='room'
                data-id='classSelection'
                type='text'
            >
                {options}
            </select>
        </div>
    );
}

function subjectInput(t, options) {
    return (
        <div className={css.subject_dropdown}>
            <Label className={css.form_label} htmlFor='subjectSelection'>
                {t('general.selectSubject')}:
            </Label>

            <select
                className='form-control'
                name='subject'
                data-id='subjectSelection'
                type='text'
            >
                {options}
            </select>
        </div>
    );
}

function dateInput(t) {
    const defaultDate = new Date().toISOString().substring(0, 10);

    return (
        <div className={`${css.form_div} form-group`}>
            <Label className={css.form_label} htmlFor='dateIn'>
                {t('general.date')}:
            </Label>

            <Input
                className='form-control'
                name='date'
                type='date'
                data-id='dateIn'
                defaultValue={defaultDate}
            />
        </div>
    );
}

function numberInput(t) {
    return (
        <div className={`${css.form_div} form-group`}>
            <Label className={css.form_label} htmlFor='number-input'>
                {t('general.weight')}:
            </Label>

            <Input
                className={`${css.weight_input} form-control`}
                defaultValue='1'
                name='weight'
                type='number'
                data-id='number-input'
                min='1'
                max='4'
                step='0.5'
            />
        </div>
    );
}

export function generateExamForm(t, subjectOptions, classOption, {isInvalid}, {addNewExam, getSelectedSubject}) {
    return (
        <div>
            <form className='form-inline' onSubmit={addNewExam} method='POST'>
                {titleInput(isInvalid, t)}
                {classInput(t, classOption, getSelectedSubject)}
                {subjectInput(t, subjectOptions)}
                {dateInput(t)}
                {numberInput(t)}

                <div className={css.form_save_btn}>
                    <Button type='submit' formNoValidate className='btn btn-success'>
                        {t('general.add')}
                    </Button>
                </div>
            </form>
        </div>
    );
}
