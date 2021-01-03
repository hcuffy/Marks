import React from 'react';
import _ from 'lodash';

import {filterObjectData} from '../classroom/formHelpers';
import {Input, Label} from 'reactstrap';
import {Button, FormGroup, InputGroup, Intent} from '@blueprintjs/core';

import css from './styles/subject.css';

function getClassroomId(dataList) {
    if (_.isEmpty(dataList) || _.isNil(dataList)) {
        return [];
    }

    return dataList[0].classroomId;
}

export function selectedSubject(t, subject, isInvalid) {
    return _.keys(subject).map((data, idx) => (
        <div key={idx} className={css.modal_form_div}>
            <Label className={css.modal_form_label} htmlFor={`${data}_Id`}>
                {t(`room.${data}`)}:
            </Label>

            <Input
                name={data}
                className={`${css.badge_number} form-control`}
                data-id={`${data}_Id`}
                type='text'
                defaultValue={subject[data]}
                invalid={isInvalid && _.isEmpty(subject[data])}
            />
        </div>
    ));
}

export function determineSubjectInputs(filteredData, id, subjectModalData) {
    const {name, abbreviation, isInvalid} = subjectModalData;

    if (isInvalid === true) {
        return {name, abbreviation};
    } else {
        return filterObjectData(filteredData, id);
    }
}

export function resolveHiddenInput(filteredData, id) {
    return (
        <div>
            <Input
                type='hidden'
                name='classroomId'
                data-id={getClassroomId(filteredData)}
            />

            <Input type='hidden' name='subjectId' data-id={id} />
        </div>
    );
}

export function filterSubjects(chosenClass, {data}) {
    if (_.isNil(data) || _.isNil(chosenClass)) {
        return [];
    }

    return _.chain(data).filter(['classroomId', chosenClass._id])
        .orderBy(
            ['abbreviation'],
            [subJ => subJ.abbreviation.toLowerCase()],
            ['asc']
        ).value();
}

export function generateSubjectList(filteredData, action) {
    return _.map(filteredData, (data, idx) => (
        <Button
            key={idx}
            data-id={data._id}
            className={`list-group-item list-group-item-action ${css.list_btn}`}
            onClick={action}
        >
            {data.abbreviation}

            <span className={`badge badge-warning badge-pill ${css.badge_number}`}>
                {data.tests.length}
            </span>
        </Button>
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
