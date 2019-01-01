import React from 'react'
import styles from '../styles/students.css'

const _ = require('lodash')

function dropDownFields(chosenStudent, classdata) {
	const classroomOptions = _.values(classdata).map((data, idx) => (
		<option key={idx} className="form-control dropdown">
			{data.Name}
		</option>
	))
	const dropList = (
		<div>
			<div className={styles.form_div_edit}>
				<label className={styles.form_label_edit} htmlFor="gSelect">
					Gender:
				</label>
				<select
					className="form-control"
					type="text"
					id="gSelect"
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
					id="cSelect"
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
			<div key={idx} className={styles.form_div_edit}>
				<label className={styles.form_label_edit} htmlFor={`${data}_Id`}>
					{`${data}*:`}
				</label>
				<input
					name={data}
					required
					className={`${styles.form_input} form-control`}
					id={`${data}_Id`}
					type="text"
					defaultValue={chosenStudent[data]}
				/>
			</div>
		)
	)
	const dropDowns = dropDownFields(chosenStudent, classdata)
	return { studentFields, dropDowns }
}

export default generateFields