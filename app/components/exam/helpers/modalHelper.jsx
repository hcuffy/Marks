import React from 'react'
import { Input, Label } from 'reactstrap'
import css from '../styles/exam.css'

const _ = require('lodash')

export const resolveHiddenInputs = (subjectId, examId) => (
	<div>
		<Input type="hidden" name="subjectId" data-id={subjectId} />
		<Input type="hidden" name="examId" data-id={examId} />
	</div>
)

const examTitle = (t, { title, isModalInvalid }) => (
	<div className={css.form_div_edit}>
		<Label
			className={css.form_label_edit}
			htmlFor={`${_.keys({ title })[0]}_Id`}
		>
			{t(`exam.${_.keys({ title })[0]}`)}:
		</Label>

		<Input
			name={_.keys({ title })[0]}
			className={`${css.form_input} ${css.modalInput} form-control`}
			data-id={`${_.keys({ title })[0]}_Id`}
			type="text"
			defaultValue={title}
			invalid={isModalInvalid && _.isEmpty(title)}
		/>
	</div>
)

const examWeight = (t, { weight, isModalInvalid }) => (
	<div className={css.form_div_edit}>
		<Label
			className={css.form_label_edit}
			htmlFor={`${_.keys({ weight })[0]}_Id`}
		>
			{t(`general.${_.keys({ weight })[0]}`)}:
		</Label>

		<Input
			name={_.keys({ weight })[0]}
			className={`${css.form_input} form-control`}
			data-id={`${_.keys({ weight })[0]}_Id`}
			type="number"
			min="1"
			max="4"
			step="0.5"
			defaultValue={weight}
			invalid={isModalInvalid && _.isEmpty(weight)}
		/>
	</div>
)

const examDate = (t, { date }) => (
	<div className={css.form_div_edit}>
		<Label
			className={css.form_label_edit}
			htmlFor={`${_.keys({ date })[0]}_Id`}
		>
			{t(`general.${_.keys({ date })[0]}`)}:
		</Label>

		<Input
			name={_.keys({ date })[0]}
			className={`${css.form_input} form-control`}
			data-id={`${_.keys({ date })[0]}_Id`}
			type="date"
			defaultValue={date}
		/>
	</div>
)

export const determineExamInputs = (exam, examData) => {
	const { title, weight, isModalInvalid } = examData
	const { date } = exam

	if (isModalInvalid === true) {
		return { title, weight, date, isModalInvalid }
	} else {
		return exam
	}
}

export const generateExamForm = (t, exam, examData) => {
	const selectedExam = determineExamInputs(exam, examData)

	const examFields = (
		<div>
			{examTitle(t, selectedExam)}
			{examWeight(t, selectedExam)}
			{examDate(t, selectedExam)}
		</div>
	)

	return examFields
}
