import React from 'react'
import css from '../styles/exam.css'

const _ = require('lodash')

const examTitle = (t, chosenExam) => (
	<div className={css.form_div_edit}>
		<label
			className={css.form_label_edit}
			htmlFor={`${_.invert(chosenExam)[chosenExam.title]}_Id`}
		>
			{t(`exam.${_.invert(chosenExam)[chosenExam.title]}`)}:
		</label>

		<input
			name={_.invert(chosenExam)[chosenExam.title]}
			className={`${css.form_input} ${css.modalInput} form-control`}
			data-id={`${_.invert(chosenExam)[chosenExam.title]}_Id`}
			type="text"
			defaultValue={chosenExam.title}
			required
		/>
	</div>
)

const examWeight = (t, chosenExam) => (
	<div className={css.form_div_edit}>
		<label
			className={css.form_label_edit}
			htmlFor={`${_.invert(chosenExam)[chosenExam.weight]}_Id`}
		>
			{t(`general.${_.invert(chosenExam)[chosenExam.weight]}`)}:
		</label>

		<input
			name={_.invert(chosenExam)[chosenExam.weight]}
			className={`${css.form_input} form-control`}
			data-id={`${_.invert(chosenExam)[chosenExam.weight]}_Id`}
			type="number"
			min="1"
			max="4"
			step="0.5"
			defaultValue={chosenExam.weight}
			required
		/>
	</div>
)

const examDate = (t, chosenExam) => (
	<div className={css.form_div_edit}>
		<label
			className={css.form_label_edit}
			htmlFor={`${_.invert(chosenExam)[chosenExam.date]}_Id`}
		>
			{t(`general.${_.invert(chosenExam)[chosenExam.date]}`)}:
		</label>

		<input
			name={_.invert(chosenExam)[chosenExam.date]}
			className={`${css.form_input} form-control`}
			data-id={`${_.invert(chosenExam)[chosenExam.date]}_Id`}
			type="date"
			defaultValue={chosenExam.date}
			required
		/>
	</div>
)

const generateFields = (t, exam) => {
	const examFields = (
		<div>
			{examTitle(t, exam)}
			{examWeight(t, exam)}
			{examDate(t, exam)}
		</div>
	)

	return examFields
}

export default generateFields
