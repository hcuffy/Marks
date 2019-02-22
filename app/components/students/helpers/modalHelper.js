/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { t } from '../../../utils/translationUtil'
import styles from '../styles/students.css'

const _ = require('lodash')

const formDropdowns = ({ label, id, defaultValue, options }) => (
	<div className={styles.form_div_edit}>
		<label className={styles.form_label_edit} htmlFor={id}>
			{t(`student.${label}`)}:
		</label>
		<select
			className="form-control"
			type="text"
			data-id={id}
			name="gender"
			defaultValue={defaultValue}
		>
			{options}
		</select>
	</div>
)
const dropDownFields = (studentFields, chosenStudent, classdata) => {
	const classroomOptions = _.values(classdata).map((data, idx) => (
		<option key={idx} className="form-control dropdown">
			{data.name}
		</option>
	))
	const genderData = {
		label: 'gender',
		id: 'gSelect',
		defaultValue: chosenStudent.gender,
		options: [
			<option key="0" className="form-control dropdown">
				{t('student.male')}
			</option>, <option key="1" className="form-control dropdown">
				{t('student.female')}
			</option>
		]
	}

	const classData = {
		label: 'classroom',
		id: 'cSelect',
		defaultValue: chosenStudent.classroom,
		options: classroomOptions
	}

	const dropList = (
		<div>
			{studentFields}
			{formDropdowns(genderData)}
			{formDropdowns(classData)}
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
