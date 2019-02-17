import React from 'react'
import styles from '../styles/exam.css'

const _ = require('lodash')

const examTitle = chosenExam => (
	<div className={styles.form_div_edit}>
		<label
			className={styles.form_label_edit}
			htmlFor={`${_.invert(chosenExam)[chosenExam.title]}_Id`}
		>
			{_.invert(chosenExam)[chosenExam.title]}:
		</label>
		<input
			name={_.invert(chosenExam)[chosenExam.title]}
			className={`${styles.form_input} ${styles.modalInput} form-control`}
			data-id={`${_.invert(chosenExam)[chosenExam.title]}_Id`}
			type="text"
			defaultValue={chosenExam.title}
		/>
	</div>
)

const examWieght = chosenExam => (
	<div className={styles.form_div_edit}>
		<label
			className={styles.form_label_edit}
			htmlFor={`${_.invert(chosenExam)[chosenExam.weight]}_Id`}
		>
			{_.invert(chosenExam)[chosenExam.weight]}:
		</label>
		<input
			name={_.invert(chosenExam)[chosenExam.weight]}
			className={`${styles.form_input} form-control`}
			data-id={`${_.invert(chosenExam)[chosenExam.weight]}_Id`}
			type="number"
			min="1"
			max="4"
			step="0.5"
			defaultValue={chosenExam.weight}
		/>
	</div>
)

const examDate = chosenExam => (
	<div className={styles.form_div_edit}>
		<label
			className={styles.form_label_edit}
			htmlFor={`${_.invert(chosenExam)[chosenExam.date]}_Id`}
		>
			{_.invert(chosenExam)[chosenExam.date]}:
		</label>
		<input
			name={_.invert(chosenExam)[chosenExam.date]}
			className={`${styles.form_input} form-control`}
			data-id={`${_.invert(chosenExam)[chosenExam.date]}_Id`}
			type="date"
			defaultValue={chosenExam.date}
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
