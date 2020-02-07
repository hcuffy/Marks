/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { Button, Label, Input } from 'reactstrap'
import css from '../styles/students.css'

const _ = require('lodash')

export const genderDropdown = (t, defaultValue, styleOne, styleTwo) => (
	<div className={`${styleOne} ${styleTwo}`}>
		<Label className={css.form_label} htmlFor="gSelect">
			{t('student.gender')}:
		</Label>

		<select
			type="text"
			name="gender"
			defaultValue={defaultValue}
			className="form-control"
		>
			<option data-id="male" className="form-control dropdown">
				{t('student.male')}
			</option>

			<option data-id="female" className="form-control dropdown">
				{t('student.female')}
			</option>
		</select>
	</div>
)

export const classroomDropdown = (
	t,
	options,
	classroom,
	styleOne,
	styleTwo,
	styleThree
) => (
	<div className={`${styleOne} ${styleTwo}`}>
		<Label className={styleThree} htmlFor="cSelect">
			{t('student.classroom')}:
		</Label>

		<select
			type="text"
			name="classroom"
			defaultValue={classroom}
			className="form-control"
		>
			{options}
		</select>
	</div>
)

export const formInputFields = (t, studentData) => {
	const { firstname, lastname, isInvalid } = studentData
	console.log(studentData['firstname'])
	return _.keys({ firstname, lastname }).map((data, idx) => (
		<div key={idx} className={css.form_inner_div}>
			<Label className={css.form_label} htmlFor={`${data}_Id`}>
				{t(`student.${data}`)}*:
			</Label>

			<Input
				name={data}
				className="form-control"
				data-id={`${data}_Id`}
				type="text"
				data-go={studentData.data}
				invalid={isInvalid && _.isEmpty(studentData[`${data}`])}
			/>
		</div>
	))
}

const selectOption = ({ classData }) => {
	return _.values(classData).map((data, idx) => (
		<option className="form-control dropdown" data-id={data._id} key={idx}>
			{data.name}
		</option>
	))
}

export const studentForm = (t, studentData, classData, actions) => {
	const studentFields = (
		<div>
			<form onSubmit={actions.addNewStudent} method="POST">
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
						<Button type="submit" formNoValidate className="btn btn-success">
							{t('general.add')}
						</Button>
					</div>
				</div>
			</form>
			<div />
		</div>
	)

	return studentFields
}
