/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import styles from '../styles/students.css'

const _ = require('lodash')

const dropDownFields = (studentFields, chosenStudent, classdata) => {
	const classroomOptions = _.values(classdata).map((data, idx) => (
		<option key={idx} className="form-control dropdown">
			{data.Name}
		</option>
	))
	const dropList = (
		<div>
			{studentFields}
			<div className={styles.form_div_edit}>
				<label className={styles.form_label_edit} htmlFor="gSelect">
					Gender:
				</label>
				<select
					className="form-control"
					type="text"
					data-id="gSelect"
					name="Gender"
					defaultValue={chosenStudent.Gender}
				>
					<option className="form-control dropdown">Male</option>
					<option className="form-control dropdown">Female</option>
				</select>
			</div>

			<div className={styles.form_div_edit}>
				<label className={styles.form_label_edit} htmlFor="cSelect">
					Classroom:
				</label>
				<select
					className="form-control"
					type="text"
					name="Classroom"
					data-id="cSelect"
					defaultValue={chosenStudent.Classroom}
				>
					{classroomOptions}
				</select>
			</div>
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
