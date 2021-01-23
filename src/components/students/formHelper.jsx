import React from 'react';
import _ from 'lodash';
import {Button, FormGroup, HTMLSelect, InputGroup, Intent} from '@blueprintjs/core';
import {Badge, Label} from 'reactstrap';

import css from './styles/students.css';

export function GenderSelect({t, gender}) {
    return (
        <div className={css.select_outerDiv}>
            <Label className={css.input_field} htmlFor='gSelect'>{t('student.gender')}
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
            <Label className={css.input_field} htmlFor='cSelect'>{t('student.classroom')}
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
                    name='title'
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

function generateListBtn(students, action) {
    return _.map(students, (data, idx) => (
        <Button
            key={idx}
            data-id={data._id}
            className={`list-group-item list-group-item-action ${css.list_btn}`}
            onClick={action}
        >
            {`${data.firstname} ${data.lastname}`}

            {data.gender === 'male' ? (
                <Badge className={`badge-pill ${css.badge_boy}`}>
                    <i className='fas fa-mars' />
                </Badge>
            ) : (
                <Badge className={`badge-pill ${css.badge_girl}`}>
                    <i className='fas fa-venus' />
                </Badge>
            )}
        </Button>
    ));
}

export function generateStudentList(students, actions) {
    if (_.isUndefined(students)) {
        return [];
    }
    const sortedStudents = _.sortBy(students, ['firstname'], ['asc']);

    return generateListBtn(sortedStudents, actions.showModal);
}
