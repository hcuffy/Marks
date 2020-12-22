import React from 'react';
import _ from 'lodash';
import {Input, Label} from 'reactstrap';

import {classroomDropdown, genderDropdown} from './formHelper';
import {getClassroomName} from '../helpers/dropdowns';
import css from './styles/students.css';

export function resolveHiddenInput(studentId) {
    return <input type='hidden' name='studentId' data-id={studentId} />;
}

function dropDownFields(t, studentFields, chosenStudent, classdata) {
    const {gender, classroom} = chosenStudent;

    const classroomOptions = _.values(classdata).map((data, idx) => (
        <option key={idx} className='form-control dropdown' data-id={data._id}>
            {data.name}
        </option>
    ));

    return (
        <div>
            {studentFields}
            {genderDropdown(t, gender, css.form_div_edit, null)}
            {classroomDropdown(
                t,
                classroomOptions,
                getClassroomName(classroom, classdata),
                css.form_div_edit,
                null,
                css.form_label_edit
            )}
        </div>
    );
}

export function determineStudentInputs(student, studentList) {
    const {firstname, lastname, isModalInvalid} = studentList;
    const {gender, classroom} = student;

    if (isModalInvalid === true) {
        return {firstname, lastname, gender, classroom};
    } else {
        return student;
    }
}

export function generateFields(t, student, classdata, studentList) {
    const fullStudentData = determineStudentInputs(student, studentList);
    const {isModalInvalid} = studentList;
    const studentFullName = _.pick(fullStudentData, ['firstname', 'lastname']);

    const studentFields = _.keys(studentFullName).map((data, idx) => (
        <div key={idx} className={css.form_div_edit}>
            <Label className={css.form_label_edit} htmlFor={`${data}_Id`}>
                {t(`student.${data}`)}*:
            </Label>

            <Input
                name={data}
                className={`${css.form_input} form-control`}
                data-id={`${data}_Id`}
                type='text'
                defaultValue={studentFullName[data]}
                invalid={isModalInvalid && _.isEmpty(studentFullName[data])}
            />
        </div>
    ));

    return dropDownFields(
        t,
        studentFields,
        fullStudentData,
        classdata
    );
}
