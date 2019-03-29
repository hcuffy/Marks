/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import styles from '../styles/students.css'

export const genderDropdown = (t, defaultValue, styleOne, styleTwo) => (
	<div className={`${styleOne} ${styleTwo}`}>
		<label className={styles.form_label} htmlFor="gSelect">
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
	defaultValue,
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
			defaultValue={defaultValue}
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
				<div className={styles.form_outer_div}>
					<h4 className={styles.center_add_sub_header}>{t('student.add')}</h4>
					{formFields}
					{/* eslint-disable-next-line max-len */}
					{genderDropdown(t, t('student.male'), styles.select_dropDown, styles.form_div)}
					{classroomDropdown(
						t,
						selectOption,
						null,
						styles.select_dropDown,
						styles.form_div,
						styles.form_label
					)}
					<div className={(styles.form_inner_div, styles.save_btn)}>
						<button type="submit" className="btn btn-success">
							{t('general.add')}
						</button>
					</div>
				</div>
			</form>
			<div />
		</div>
	)
	return studentFields
}

export default studentForm
