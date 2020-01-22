/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { Button } from 'reactstrap'
import css from '../styles/students.css'

export const genderDropdown = (t, defaultValue, styleOne, styleTwo) => (
	<div className={`${styleOne} ${styleTwo}`}>
		<label className={css.form_label} htmlFor="gSelect">
			{t('student.gender')}:
		</label>

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
		<label className={styleThree} htmlFor="cSelect">
			{t('student.classroom')}:
		</label>

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

const studentForm = (t, selectOption, formFields, actions) => {
	const studentFields = (
		<div>
			<form onSubmit={actions.addNewStudent} method="POST">
				<div className={css.form_outer_div}>
					<h4 className={css.center_add_sub_header}>{t('student.add')}</h4>
					{formFields}

					{genderDropdown(
						t,
						t('student.male'),
						css.select_dropDown,
						css.form_div
					)}

					{classroomDropdown(
						t,
						selectOption,
						null,
						css.select_dropDown,
						css.form_div,
						css.form_label
					)}

					<div className={(css.form_inner_div, css.save_btn)}>
						<Button type="submit" className="btn btn-success">
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

export default studentForm
