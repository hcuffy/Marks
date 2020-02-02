import React from 'react'
import { getClassroomId } from '../../helpers/dropdowns'
import { Button } from 'reactstrap'
import css from '../styles/exam.css'

const _ = require('lodash')

export const getClassOptions = classInfo => {
	const selectOptions = _.values(classInfo).map((data, idx) => (
		<option className="form-control dropup" key={idx}>
			{data.name}
		</option>
	))

	return selectOptions
}

export const getSubjectOptions = (subjectData, examData, cleanedClassList) => {
	const { subject } = examData
	const classroom = subject || cleanedClassList[0].name
	const classroomId = getClassroomId(classroom, cleanedClassList)

	const filteredSubject = _.filter(subjectData.data, [
		'classroomId',
		classroomId
	])

	const selectedOptions = _.values(filteredSubject).map((data, idx) => (
		<option className="form-control dropup" key={idx} data-id={data._id}>
			{data.abbreviation}
		</option>
	))

	return selectedOptions
}

const titleInput = t => (
	<div>
		<label className={css.form_label} htmlFor="titleId">
			{t('exam.title')}*:
		</label>

		<input
			name="title"
			className="form-control"
			required
			data-id="titleId"
			type="text"
		/>
	</div>
)
const classInput = (t, options, action) => (
	<div>
		<label className={css.form_label} htmlFor="classSelection">
			{t('general.selectRoom')}:
		</label>

		<select
			onChange={action}
			className="form-control"
			name="room"
			data-id="classSelection"
			type="text"
		>
			{options}
		</select>
	</div>
)

const subjectInput = (t, options) => (
	<div className={css.subject_dropdown}>
		<label className={css.form_label} htmlFor="subjectSelection">
			{t('general.selectSubject')}:
		</label>

		<select
			className="form-control"
			name="subject"
			data-id="subjectSelection"
			type="text"
		>
			{options}
		</select>
	</div>
)

const dateInput = t => {
	const defaultDate = new Date().toISOString().substring(0, 10)

	return (
		<div className={`${css.form_div} form-group`}>
			<label className={css.form_label} htmlFor="dateIn">
				{t('general.date')}:
			</label>

			<input
				className="form-control"
				name="date"
				type="date"
				data-id="dateIn"
				defaultValue={defaultDate}
			/>
		</div>
	)
}
const numberInput = t => (
	<div className={`${css.form_div} form-group`}>
		<label className={css.form_label} htmlFor="number-input">
			{t('general.weight')}:
		</label>

		<input
			className={`${css.weight_input} form-control`}
			defaultValue="1"
			name="weight"
			type="number"
			data-id="number-input"
			min="1"
			max="4"
			step="0.5"
		/>
	</div>
)

export const examForm = (
	t,
	subjectOptions,
	classOption,
	{ addNewExam, getSelectedSubject }
) => {
	const examFields = (
		<div>
			<form className="form-inline" onSubmit={addNewExam} method="POST">
				{titleInput(t)}
				{classInput(t, classOption, getSelectedSubject)}
				{subjectInput(t, subjectOptions)}
				{dateInput(t)}
				{numberInput(t)}

				<div className={css.form_save_btn}>
					<Button type="submit" className="btn btn-success">
						{t('general.add')}
					</Button>
				</div>
			</form>
		</div>
	)

	return examFields
}
