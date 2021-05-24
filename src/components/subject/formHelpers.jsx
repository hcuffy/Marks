import React from 'react';
import _ from 'lodash';

import {filterObjectData} from '../classroom/formHelpers';
import {Alignment, Button, ButtonGroup, FormGroup, InputGroup, Intent} from '@blueprintjs/core';

import css from './style.css';

function getClassroomId(dataList) {
    if (_.isEmpty(dataList) || _.isNil(dataList)) {
        return [];
    }

    return dataList[0].classroomId;
}

export function determineSubjectInputs(filteredData, id, subjectDialogData) {
    const {name, abbreviation, isInvalid} = subjectDialogData;

    if (isInvalid === true) {
        return {name, abbreviation};
    } else {
        return filterObjectData(filteredData, id);
    }
}

export function resolveHiddenInput(filteredData, id) {
    return (
        <div>
            <InputGroup
                type='hidden'
                name='classroomId'
                data-id={getClassroomId(filteredData)}
            />

            <InputGroup type='hidden' name='subjectId' data-id={id}/>
        </div>
    );
}

export function filterSubjectByClass(chosenClass, {data}) {
    if (_.isNil(data) || _.isNil(chosenClass)) {
        return [];
    }

    return _.chain(data).filter(['classroomId', chosenClass._id])
        .orderBy(['abbreviation'], [subject => subject.abbreviation.toLowerCase()], ['asc']).value();
}

export function List({filteredData, action}) {
    return _.map(filteredData, (data, idx) => (
        <div key={idx}>
            <ButtonGroup alignText={Alignment.LEFT} vertical={true} fill={true}>
                <Button
                    text={data.abbreviation}
                    onClick={action}
                    data-id={data._id}
                >

                    <span className={`badge badge-warning badge-pill ${css.badge_number}`}>
                        {data.tests.length}
                    </span>
                </Button>
            </ButtonGroup>
        </div>
    ));
}

export function SubjectFormInputs({t, classListData}) {
    const {name, abbreviation, isInvalid} = classListData;

    function intent(data) {
        return isInvalid && _.isEmpty({name, abbreviation}[data]) ? Intent.DANGER : Intent.NONE;
    }

    return _.keys({name, abbreviation}).map((data, idx) => (
        <div key={idx} className={css.form_div}>
            <FormGroup labelFor={`${data}Sid`} inline={true} label={t(`room.${data}`)}>
                <InputGroup
                    name={data}
                    id={`${data}Sid`}
                    data-id={`${data}Sid`}
                    type='text'
                    intent={intent(data)}
                />
            </FormGroup>
        </div>
    ));
}
