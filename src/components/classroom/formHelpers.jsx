import React from 'react';
import _ from 'lodash';
import {Button, Intent, FormGroup, InputGroup} from '@blueprintjs/core';
import {Input} from 'reactstrap';

import css from './styles/room.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../actions';
import {withTranslation} from 'react-i18next';

export function FormInputs({t, classData}) {
    //const {isInvalid} = classData;
    const formLabels = _.pick(classData, ['name', 'teacher', 'substitute']);

    return _.keys(formLabels).map((data, idx) => (
        <div key={idx} className={css.room_form}>
            <FormGroup className={css.room_form_label} inline={true} labelFor={`${data}Id`} label={t(`room.${data}`)}>

                <InputGroup
                    name={data}
                    id={`${data}Id`}
                    type='text'
                    defaultValue={formLabels[data]}

                />
            </FormGroup>
        </div>
    ));
}

export function AddClassroomFormComponent({t, classData, actions}) {
    return (
        <div className={css.room_div}>
            <form onSubmit={actions.handleClassData} method='POST'>
                <div className={css.form_outer_div}>
                    <h4 className={css.add_header}>{t('room.addClassHeader')}</h4>

                    <FormInputs t={t} classData={classData}/>

                    <div className={(css.form_div, css.save_btn)}>
                        <Button type='submit' formNoValidate intent={Intent.SUCCESS} text={t('general.add')}/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export const AddClassroomForm = connect(
    state => ({
        classData: state.classData
    }),
    dispatch => ({
        actions: bindActionCreators(actionCreators, dispatch)
    })
)(withTranslation()(AddClassroomFormComponent));

export function gradingSystem(settings) {
    return _.findKey(settings, gradeType => gradeType === true);
}

export function classInputs(cleanData, action) {
    return _.map(cleanData, (data, idx) => (
        <Button
            key={idx}
            data-id={data._id}
            className={`list-group-item list-group-item-action ${css.list_btn}`}
            onClick={action}
        >
            {data.name}

            <span className={`badge badge-warning badge-pill ${css.badge_number}`}>
                {data.subjects.length}
            </span>
        </Button>
    ));
}

export function classPill(index, pillClass, name, action, title) {
    return (
        <li className='nav-item'>
            <a
                role='button'
                tabIndex={index}
                className={`${css.tab_link} nav-link ${pillClass}`}
                onClick={action}
                data-name={name}
            >
                {title}
            </a>
        </li>
    );
}

export function filterObjectData(objectToClean, selectedId) {
    const requiredProp = _.find(objectToClean, {_id: selectedId});

    return _.omit(requiredProp, ['_id', 'createdAt', 'updatedAt', 'subjects', 'tests', 'classroomId', 'room']);
}

export function createModalInputs(t, selectedRoom, isInvalid) {
    return _.keys(selectedRoom).map((data, idx) => (
        <div key={idx} className={css.form_div}>
            <label className={css.form_label} htmlFor={`${data}_Id`}>
                {t(`room.${data}`)}:
            </label>

            <Input
                name={data}
                className={`${css.form_input} form-control`}
                data-id={`${data}_Id`}
                type='text'
                invalid={isInvalid && _.isEmpty(selectedRoom[data])}
                defaultValue={selectedRoom[data]}
            />
        </div>
    ));
}

export function checkChange(classData, actions) {
    if (classData.check) {
        actions.displayClassData();
    }
}

export function sortData(clean) {
    return _.sortBy(clean.classData, ['name'], ['asc']);
}
