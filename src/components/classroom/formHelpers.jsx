import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withTranslation} from 'react-i18next';
import {Button, ButtonGroup, Intent, FormGroup, InputGroup, Alignment} from '@blueprintjs/core';

import {actionCreators} from '../../actions';
import {sortByName} from '../helpers';
import css from './styles/room.css';

export function FormInputs({t, classData}) {
    const intent = classData.isInvalid ? Intent.DANGER : Intent.NONE;
    const formLabels = _.pick(classData, ['name', 'teacher', 'substitute']);

    return _.keys(formLabels).map((data, idx) => (
        <div key={idx} className={css.room_form}>
            <FormGroup className={css.room_form_label} inline={true} labelFor={`${data}Id`} label={t(`room.${data}`)}>

                <InputGroup
                    name={data}
                    id={`${data}Id`}
                    type='text'
                    defaultValue={formLabels[data]}
                    intent={intent}
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

export function ClassroomListComponent({classData, actions}) {
    const sortedData = sortByName(classData);

    return _.map(sortedData, (data, idx) => (
        <div key={idx} className={css.list_buttons}>
            <ButtonGroup alignText={Alignment.LEFT} vertical={true} fill={true}>
                <Button
                    onClick={actions.showRoomDialog}
                    text={data.name}
                    data-id={data._id}
                >

                    <span className={`badge badge-warning badge-pill ${css.badge_number}`}>
                        {data.subjects.length}
                    </span>
                </Button>
            </ButtonGroup>
        </div>
    ));
}

export const ClassroomList = connect(
    state => ({
        classData: state.classData
    }),
    dispatch => ({
        actions: bindActionCreators(actionCreators, dispatch)
    })
)(ClassroomListComponent);

export function NavBarButton({t, navBarData, actions}) {
    return _.map(navBarData, (data, idx) => {
        const label = _.findKey(navBarData, key => key === data);

        return (
            <div key={idx} className={css.nav_btn}>
                <ButtonGroup minimal={data === null} large={true}>
                    <Button role='button'
                        outlined={data === null}
                        intent={Intent.PRIMARY}
                        onClick={actions.changeClassroomTab}
                        text={ t(`room.${label}`)}
                        data-name={label}
                    />

                </ButtonGroup>
            </div>
        );
    });
}

export function filterObjectData(objectToClean, selectedId) {
    const requiredProp = _.find(objectToClean, {_id: selectedId}) || {};

    return _.omit(requiredProp, ['_id', 'createdAt', 'updatedAt', 'subjects', 'tests', 'classroomId', 'room']);
}

export function classroomItems(classes) {
    return _.map(classes, (data, idx) => (
        {
            key:          idx,
            name:         data.name,
            id:           data._id,
            'data-check': 'classDropdown'
        }
    ));
}
