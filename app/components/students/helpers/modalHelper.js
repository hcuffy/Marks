import React from 'react'
import { t } from '../../../utils/translationUtil'
import { genderDropdown, classroomDropdown } from './formHelper'
import styles from '../styles/students.css'

const _ = require('lodash')

const dropDownFields = (studentFields, chosenStudent, classdata) => {
	const { gender, classroom } = chosenStudent
	const classroomOptions = _.values(classdata).map((data, idx) => (
		<option key={idx} className="form-control dropdown">
			{data.name}
		</option>
	))

	const dropList = (
		<div>
			{studentFields}
			{genderDropdown(gender, styles.form_div_edit, null)}
			{classroomDropdown(
				classroomOptions,
				classroom,
				styles.form_div_edit,
				null,
				styles.form_label_edit
			)}
		</div>
	)

	return dropList
}

const generateFields = (chosenStudent, classdata) => {
	const studentFields = _.keys(_.pick(chosenStudent, ['firstname', 'lastname'])).map(
		(data, idx) => (
			<div key={idx} className={styles.form_div_edit}>
				<label className={styles.form_label_edit} htmlFor={`${data}_Id`}>
					{t(`student.${data}`)}*:
				</label>
				<input
					name={data}
					required
					className={`${styles.form_input} form-control`}
					data-id={`${data}_Id`}
					type="text"
					defaultValue={chosenStudent[data]}
				/>
			</div>
		)
	)
	const studentForm = dropDownFields(studentFields, chosenStudent, classdata)
	return studentForm
}

export default generateFields
