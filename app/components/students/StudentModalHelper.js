import React from 'react'
import styles from '../styles/students.css'

const _ = require('lodash')

function dropDownFields(chosenStudent, classdata) {
	const classroomOptions = _.values(classdata).map((data, idx) => (
		<option key={idx} className="form-control dropdown">
			{data.Name}
		</option>
	))
	console.log(classdata)
	const dropList = (
		<div>
			<div className={styles.form_inner_div}>
				<label className={styles.form_label} htmlFor="gSelect">
					Gender:
				</label>
				<select
					defaultValue={chosenStudent.Gender}
					type="text"
					name="Gender"
					className="form-control"
				>
					<option className="form-control dropdown" selected>
						Male
					</option>
					<option className="form-control dropdown">Female</option>
				</select>
			</div>

			<div className={styles.form_inner_div}>
				<label className={styles.form_label} htmlFor="cSelect">
					Classroom:
				</label>
				<select
					defaultValue={chosenStudent.Classroom}
					type="text"
					name="Classroom"
					className="form-control"
				>
					{classroomOptions}
				</select>
			</div>
		</div>
	)

	return dropList
}

const generateFields = (chosenStudent, classdata) => {
	console.log(chosenStudent)
	const studentFields = _.keys(_.pick(chosenStudent, ['Firstname', 'Lastname'])).map(
		(data, idx) => (
			<div key={idx} className={styles.form_inner_div}>
				<label className={styles.form_label} htmlFor={`${data}_Id`}>
					{`${data}*:`}
				</label>
				<input
					name={data}
					required
					className="form-control"
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
