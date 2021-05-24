import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {Alignment, Button, ButtonGroup, FormGroup, HTMLSelect, InputGroup, Intent, Label} from '@blueprintjs/core';

import {showStudentDialog} from './actions';
import css from './style.css';

export function GenderSelect({t, gender}) {
    return (
        <div className={css.select_outerDiv}>
            <Label className={`bp3-inline ${css.input_field}`} htmlFor='gSelect'>{t('student.gender')}
                <HTMLSelect className={css.dropdown_field} type='text' name='gender' id='gSelect' defaultValue={gender}>
                    <option data-id='male'>{t('student.male')}</option>
                    <option data-id='female'>{t('student.female')}</option>
                </HTMLSelect>
            </Label>
        </div>
    );
}

export function ClassroomSelect({t, classData, classroom}) {
    const options = _.values(classData).map((data, idx) => (
        <option data-id={data._id} key={idx}>
            {data.name}
        </option>
    ));

    return (
        <div className={css.select_outerDiv}>
            <Label className={`bp3-inline ${css.input_field}`} htmlFor='cSelect'>{t('student.classroom')}
                <HTMLSelect className={css.dropdown_field} type='text' name='classroom' id='cSelect' defaultValue={classroom}>
                    {options}
                </HTMLSelect>
            </Label>
        </div>
    );
}

export function NameInputFields({t, studentData}) {
    const {firstname, lastname, isInvalid} = studentData;
    const intent = isInvalid ? Intent.DANGER : Intent.NONE;

    return _.keys({firstname, lastname}).map((data, idx) => (
        <div key={idx}>
            <FormGroup inline={true} labelFor={`${data}_Id`} className={css.input_field} label={t(`student.${data}`)}>
                <InputGroup
                    name={data}
                    className={css.input_width}
                    id={`${data}_Id`}
                    data-id='titleId'
                    data-go={studentData.data}
                    type='text'
                    intent={intent}
                />
            </FormGroup>
        </div>
    ));
}

function getClassName(classData, {classroom}) {
    const classObject = _.find(classData, {_id: classroom});

    return classObject?.name ? ` - ${classObject?.name}` : '';
}

function StudentListComponent({students, classData, showStudentDialog}) {
    if (_.isUndefined(students)) {
        return [];
    }

    return _.map(students, (data, idx) => (
        <div key={idx} >
            <ButtonGroup alignText={Alignment.LEFT} vertical={true} fill={true}>
                <Button
                    onClick={showStudentDialog}
                    text={`${data.firstname} ${data.lastname} ${getClassName(classData, data)}`}
                    data-id={data._id}
                    className={data.gender === 'male' ? css.male : css.female}
                />
            </ButtonGroup>
        </div>
    ));
}

const mapStateToProps = state => ({
    students:  state.studentData.students,
    classData: state.classData.classData
});

const mapDispatchToProps = {showStudentDialog};

export const ListOfStudent = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(StudentListComponent));
