import React from 'react';
import _ from 'lodash';
import {FormGroup, InputGroup, Intent} from '@blueprintjs/core';

import {ClassroomSelect, GenderSelect} from './formHelper';
import css from './style.css';

export function resolveHiddenInput(studentId) {
    return <InputGroup type='hidden' name='studentId' data-id={studentId}/>;
}

export function determineStudentInputs(student, studentList) {
    const {firstname, lastname, dialogInvalid} = studentList;
    const {gender, classroom} = student;

    if (dialogInvalid === true) {
        return {firstname, lastname, gender, classroom};
    } else {
        return student;
    }
}

function NameInputFields({t, selectedStudent, dialogInvalid}) {
    const fullName = _.pick(selectedStudent, ['firstname', 'lastname']);

    function intent(data) {
        return dialogInvalid && _.isEmpty(fullName[data]) ? Intent.DANGER : Intent.NONE;
    }

    return _.keys(fullName).map((data, idx) => (
        <div key={idx} className={css.form_div_edit}>
            <FormGroup inline={true} labelFor={`${data}_Id`} label={t(`student.${data}`)} className={css.edit_input_group}>

                <InputGroup
                    name={data}
                    id={`${data}_Id`}
                    className={css.edit_input}
                    data-id={`${data}_Id`}
                    type='text'
                    intent={intent(data)}
                    defaultValue={fullName[data]}
                />
            </FormGroup>
        </div>
    ));
}

function SelectFields({t, selectedStudent, classData}) {
    const {gender, classroom} = selectedStudent;
    const selectedClassroom = _.find(classData, {_id: classroom});

    return (
        <div className={css.dialog_select}>
            <GenderSelect t={t} gender={gender}/>
            <ClassroomSelect t={t} classData={classData} classroom={selectedClassroom?.name}/>
        </div>
    );
}

export function DialogInputs({t, student, classData, studentData}) {
    const selectedStudent = determineStudentInputs(student, studentData);
    const {dialogInvalid} = studentData;

    return (
        <div className={css.student_dialog}>
            <NameInputFields t={t} selectedStudent={selectedStudent} dialogInvalid={dialogInvalid}/>
            <SelectFields t={t} classData={classData} selectedStudent={selectedStudent}/>
        </div>
    );
}
