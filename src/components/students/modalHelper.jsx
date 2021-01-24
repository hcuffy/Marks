import React from 'react';
import _ from 'lodash';
import {Input, Label} from 'reactstrap';

import {ClassroomSelect, GenderSelect} from './formHelper';
import {getClassroomProp} from '../helpers';
import css from './styles/students.css';

export function resolveHiddenInput(studentId) {
    return <input type='hidden' name='studentId' data-id={studentId} />;
}

function dropDownFields(t, studentFields, chosenStudent, classData) {
    const {gender, classroom} = chosenStudent;
    const selectedClassroom = getClassroomProp(classroom, classData);

    return (
        <div>
            {studentFields}
            <GenderSelect t={t} gender={gender}/>
            <ClassroomSelect t={t} data={classData} classroom={selectedClassroom}/>
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

export function generateFields(t, student, classData, studentList) {
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
        classData
    );
}
