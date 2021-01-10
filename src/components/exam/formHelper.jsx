import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import {Button, Intent, FormGroup, InputGroup, HTMLSelect, Label, NumericInput} from '@blueprintjs/core';
import {DateInput} from '@blueprintjs/datetime';

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

function TitleInput({t, isInvalid}) {
    const intent = isInvalid ? Intent.DANGER : Intent.NONE;

    return (
        <div>
            <FormGroup inline={true} labelFor={'titleId'} label={t('exam.title')}>
                <InputGroup
                    name='title'
                    data-id='titleId'
                    type='text'
                    intent={intent}
                />
            </FormGroup>
        </div>
    );
}

function ClassSelect({t, options, action}) {
    return (
        <div>
            <Label className={'bp3-inline'} htmlFor='classSelection'>{t('general.selectRoom')}
                <HTMLSelect
                    onChange={action}
                    name='room'
                    data-id='classSelection'
                    type='text'
                >
                    {options}
                </HTMLSelect>
            </Label>
        </div>
    );
}

function SujectSelect({t, options}) {
    return (
        <div>
            <Label htmlFor='subjectSelection'>{t('general.selectSubject')}
                <HTMLSelect
                    name='subject'
                    data-id='subjectSelection'
                    type='text'
                >
                    {options}
                </HTMLSelect>
            </Label>
        </div>
    );
}

function DateSelect({t}) {
    return (
        <div className={css.form_div}>
            <Label className={css.form_label} htmlFor='dateIn'>{t('general.date')}
                <DateInput
                    formatDate={date => moment(date).format('MM/DD/YYYY')}
                    parseDate={str => new Date(Date.parse(str))}
                    name='date'
                    type='date'
                    data-id='dateIn'
                    defaultValue={new Date()}
                />
            </Label>
        </div>
    );
}

function WeightInput({t}) {
    return (
        <div className={css.form_div}>
            <Label className={css.form_label} htmlFor='number-input'>{t('general.weight')}
                <NumericInput
                    className={css.weight_input}
                    defaultValue={1}
                    name='weight'
                    data-id='number-input'
                    min={1}
                    max={4}
                    stepSize={0.5}
                />
            </Label>
        </div>
    );
}

export function generateExamForm(t, subjectOptions, classOption, {isInvalid}, {addNewExam, getSelectedSubject}) {
    return (
        <div>
            <form className='form-inline' onSubmit={addNewExam} method='POST'>
                <TitleInput t={t } isInvalid={isInvalid}/>
                <ClassSelect t={t } options={classOption} action={getSelectedSubject}/>
                <SujectSelect t={t } options={subjectOptions}/>
                <DateSelect t={t}/>
                <WeightInput t={t}/>

                <div className={css.form_save_btn}>
                    <Button type='submit' formNoValidate intent={Intent.SUCCESS} text={t('general.add')}/>
                </div>
            </form>
        </div>
    );
}
