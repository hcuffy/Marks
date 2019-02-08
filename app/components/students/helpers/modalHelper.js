/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import styles from '../styles/students.css'

const _ = require('lodash')

const formDropdowns = ({ label, id, defaultValue, options }) => (
	<div className={styles.form_div_edit}>
		<label className={styles.form_label_edit} htmlFor={id}>
			{label}
		</label>
		<select
			className="form-control"
			type="text"
			data-id={id}
			name="Gender"
			defaultValue={defaultValue}
		>
			{options}
		</select>
	</div>
)
const dropDownFields = (studentFields, chosenStudent, classdata) => {
	const classroomOptions = _.values(classdata).map((data, idx) => (
		<option key={idx} className="form-control dropdown">
			{data.Name}
		</option>
	))
	const genderData = {
		label: 'Gender:',
		id: 'gSelect',
		defaultValue: chosenStudent.Gender,
		options: [
			<option key="0" className="form-control dropdown">
				Male
			</option>, <option key="1" className="form-control dropdown">
				Female
			</option>
		]
	}

	const classData = {
		label: 'Classroom::',
		id: 'cSelect',
		defaultValue: chosenStudent.Classroom,
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
	const studentFields = _.keys(_.pick(chosenStudent, ['Firstname', 'Lastname'])).map(
		(data, idx) => (
			<div>
				<div key={idx} className={styles.form_div_edit}>
					<label className={styles.form_label_edit} htmlFor={`${data}_Id`}>
						{`${data}*:`}
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
			</div>
		)
	)
	const studentForm = dropDownFields(studentFields, chosenStudent, classdata)
	return studentForm
}

export default generateFields
