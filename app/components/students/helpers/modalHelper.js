import React from 'react'
import { genderDropdown, classroomDropdown } from './formHelper'
import styles from '../styles/students.css'

const _ = require('lodash')

const getClassroomName = (id, classdata) => {
	const classObject = _.find(classdata, { _id: id })
	if (_.isUndefined(classObject)) {
		return ''
	}

	return classObject.name
}

const dropDownFields = (t, studentFields, chosenStudent, classdata) => {
	const { gender, classroom } = chosenStudent

	const classroomOptions = _.values(classdata).map((data, idx) => (
		<option key={idx} className="form-control dropdown" data-id={data._id}>
			{data.name}
		</option>
	))

	const dropList = (
		<div>
			{studentFields}
			{genderDropdown(t, gender, styles.form_div_edit, null)}
			{classroomDropdown(
				t,
				classroomOptions,
				getClassroomName(classroom, classdata),
				styles.form_div_edit,
				null,
				styles.form_label_edit
			)}
		</div>
	)

	return dropList
}

const generateFields = (t, chosenStudent, classdata) => {
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
	const studentForm = dropDownFields(t, studentFields, chosenStudent, classdata)
	return studentForm
}

export default generateFields
