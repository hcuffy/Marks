import React from 'react'
import styles from '../styles/exam.css'

const _ = require('lodash')

const examTitle = chosenExam => (
	<div className={styles.form_div_edit}>
		<label
			className={styles.form_label_edit}
			htmlFor={`${_.invert(chosenExam)[chosenExam.Title]}_Id`}
		>
			{_.invert(chosenExam)[chosenExam.Title]}:
		</label>
		<input
			name={_.invert(chosenExam)[chosenExam.Title]}
			className={`${styles.form_input} ${styles.modalInput} form-control`}
			data-id={`${_.invert(chosenExam)[chosenExam.Title]}_Id`}
			type="text"
			defaultValue={chosenExam.Title}
		/>
	</div>
)

const examWieght = chosenExam => (
	<div className={styles.form_div_edit}>
		<label
			className={styles.form_label_edit}
			htmlFor={`${_.invert(chosenExam)[chosenExam.Weight]}_Id`}
		>
			{_.invert(chosenExam)[chosenExam.Weight]}:
		</label>
		<input
			name={_.invert(chosenExam)[chosenExam.Weight]}
			className={`${styles.form_input} form-control`}
			data-id={`${_.invert(chosenExam)[chosenExam.Weight]}_Id`}
			type="number"
			min="1"
			max="4"
			step="0.5"
			defaultValue={chosenExam.Weight}
		/>
	</div>
)

const examDate = chosenExam => (
	<div className={styles.form_div_edit}>
		<label
			className={styles.form_label_edit}
			htmlFor={`${_.invert(chosenExam)[chosenExam.Date]}_Id`}
		>
			{_.invert(chosenExam)[chosenExam.Date]}:
		</label>
		<input
			name={_.invert(chosenExam)[chosenExam.Date]}
			className={`${styles.form_input} form-control`}
			data-id={`${_.invert(chosenExam)[chosenExam.Date]}_Id`}
			type="date"
			defaultValue={chosenExam.Date}
		/>
	</div>
)

const generateFields = exam => {
	const examFields = (
		<div>
			{examTitle(exam)}
			{examWieght(exam)}
			{examDate(exam)}
		</div>
	)

	return examFields
}

export default generateFields
