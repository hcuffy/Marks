import React from 'react';
import _ from 'lodash';
import {Badge, Button, Input, Label} from 'reactstrap';
import css from '../styles/students.css';

export const genderDropdown = (t, defaultValue, styleOne, styleTwo) => (
    <div className={`${styleOne} ${styleTwo}`}>
        <Label className={css.form_label} htmlFor='gSelect'>
            {t('student.gender')}:
        </Label>

        <select
            type='text'
            name='gender'
            defaultValue={defaultValue}
            className='form-control'
        >
            <option data-id='male' className='form-control dropdown'>
                {t('student.male')}
            </option>

            <option data-id='female' className='form-control dropdown'>
                {t('student.female')}
            </option>
        </select>
    </div>
);

export const classroomDropdown = (
    t,
    options,
    classroom,
    styleOne,
    styleTwo,
    styleThree
) => (
    <div className={`${styleOne} ${styleTwo}`}>
        <Label className={styleThree} htmlFor='cSelect'>
            {t('student.classroom')}:
        </Label>

        <select
            type='text'
            name='classroom'
            defaultValue={classroom}
            className='form-control'
        >
            {options}
        </select>
    </div>
);

export const formInputFields = (t, studentData) => {
    const {firstname, lastname, isInvalid} = studentData;

    return _.keys({firstname, lastname}).map((data, idx) => (
        <div key={idx} className={css.form_inner_div}>
            <Label className={css.form_label} htmlFor={`${data}_Id`}>
                {t(`student.${data}`)}*:
            </Label>

            <Input
                name={data}
                className='form-control'
                data-id={`${data}_Id`}
                type='text'
                data-go={studentData.data}
                invalid={isInvalid && _.isEmpty(studentData[`${data}`])}
            />
        </div>
    ));
};

const selectOption = ({classData}) => {
    return _.values(classData).map((data, idx) => (
        <option className='form-control dropdown' data-id={data._id} key={idx}>
            {data.name}
        </option>
    ));
};

export const studentForm = (t, studentData, classData, actions) => {
    return (
        <div>
            <form onSubmit={actions.addNewStudent} method='POST'>
                <div className={css.form_outer_div}>
                    <h4 className={css.center_add_sub_header}>{t('student.add')}</h4>
                    {formInputFields(t, studentData)}

                    {genderDropdown(
                        t,
                        t('student.male'),
                        css.select_dropDown,
                        css.form_div
                    )}

                    {classroomDropdown(
                        t,
                        selectOption(classData),
                        null,
                        css.select_dropDown,
                        css.form_div,
                        css.form_label
                    )}

                    <div className={(css.form_inner_div, css.save_btn)}>
                        <Button type='submit' formNoValidate className='btn btn-success'>
                            {t('general.add')}
                        </Button>
                    </div>
                </div>
            </form>
            <div />
        </div>
    );
};

const generateListBtn = (students, action) => students.map((data, idx) => (
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

export const generateStudentList = (students, actions) => {
    if (_.isUndefined(students)) {
        return [];
    }
    const sortedStudents = _.sortBy(students, ['firstname'], ['asc']);

    return generateListBtn(sortedStudents, actions.showStudentModal);
};
