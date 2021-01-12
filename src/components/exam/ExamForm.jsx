import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {Button, FormGroup, HTMLSelect, InputGroup, Intent, Label, NumericInput} from '@blueprintjs/core';

import {actionCreators} from '../../actions/index';
import {sortByName} from '../helpers';
import {getClassOptions, getSubjectOptions} from './formHelper';
import css from './styles/exam.css';

function TitleInput({t, isInvalid}) {
    const intent = isInvalid ? Intent.DANGER : Intent.NONE;

    return (
        <div className={css.left_inputs}>
            <FormGroup inline={true} labelFor={'titleId'} label={t('exam.title')}>
                <InputGroup
                    name='title'
                    data-id='titleId'
                    type='text'
                    className={css.inputs_width}
                    intent={intent}
                />
            </FormGroup>
        </div>
    );
}

function ClassSelect({t, options, action}) {
    return (
        <div className={css.left_inputs}>
            <Label className={'bp3-inline'} htmlFor='classSelection'>{t('general.selectRoom')}
                <HTMLSelect
                    onChange={action}
                    name='room'
                    data-id='classSelection'
                    className={css.input_space}
                    type='text'
                >
                    {options}
                </HTMLSelect>
            </Label>
        </div>
    );
}

function SubjectSelect({t, options}) {
    return (
        <div className={css.left_inputs}>
            <Label className={'bp3-inline'} htmlFor='subjectSelection'>{t('general.selectSubject')}
                <HTMLSelect
                    name='subject'
                    data-id='subjectSelection'
                    className={css.input_space}
                    type='text'
                >
                    {options}
                </HTMLSelect>
            </Label>
        </div>
    );
}

function DateSelect({t}) {
    const defaultDate = new Date().toISOString().substring(0, 10);

    return (
        <div className={css.right_inputs}>
            <Label className={'bp3-inline'} htmlFor='dateIn'> {t('general.date')}
                <InputGroup
                    name='date'
                    type='date'
                    className={css.date_space}
                    id='dateIn'
                    defaultValue={defaultDate}
                />
            </Label>
        </div>
    );
}

function WeightInput({t}) {
    return (
        <div className={css.right_inputs}>
            <Label className={css.weight_label} htmlFor='number-input'> {t('general.weight')} </Label>
            <NumericInput
                defaultValue={1}
                className={css.number_input}
                name='weight'
                data-id='number-input'
                min={1}
                max={4}
                stepSize={0.5}
            />

        </div>
    );
}

export function AddExamForm({t, classData, subjectData, examData, actions}) {
    const sortedData = sortByName(classData);
    const classOption = getClassOptions(sortedData);
    const subjectOptions = getSubjectOptions(subjectData, examData, sortedData);

    return (
        <div>
            <form onSubmit={actions.addNewExam} method='POST'>
                <div className={css.left_elements}>
                    <TitleInput t={t } isInvalid={examData.isInvalid}/>
                    <ClassSelect t={t } options={classOption} action={actions.getSelectedSubject}/>
                    <SubjectSelect t={t } options={subjectOptions}/>
                </div>
                <div className={css.right_elements}>
                    <DateSelect t={t}/>
                    <WeightInput t={t}/>
                </div>
                <div className={css.form_save_btn}>
                    <Button type='submit' intent={Intent.SUCCESS} text={t('general.add')}/>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    classData:   state.classData,
    subjectData: state.subjectData,
    examData:    state.examData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddExamForm));
