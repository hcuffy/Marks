/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { t } from '../../../utils/translationUtil'
import styles from '../styles/students.css'

const genderDropdown = () => (
	<div className={`${styles.select_dropDown} ${styles.form_div}`}>
		<label className={styles.form_label} htmlFor="gSelect">
			{t('student.gender')}:
		</label>
		<select type="text" name="gender" className="form-control">
			<option className="form-control dropdown">{t('student.male')}</option>
			<option className="form-control dropdown">{t('student.female')}</option>
		</select>
	</div>
)

const classroomDropdown = options => (
	<div className={`${styles.select_dropDown} ${styles.form_div}`}>
		<label className={styles.form_label} htmlFor="cSelect">
			{t('student.classroom')}:
		</label>
		<select type="text" name="classroom" className="form-control">
			{options}
		</select>
	</div>
)
const studentForm = (selectOption, formFields, actions) => {
	const studentFields = (
		<div>
			<form onSubmit={actions.addNewStudent} method="POST">
				<div className={styles.form_outer_div}>
					<h4 className={styles.center_sub_header}>Add Student</h4>
					{formFields}
					{genderDropdown()}
					{classroomDropdown(selectOption)}
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
