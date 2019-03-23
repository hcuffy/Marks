/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import styles from '../styles/exam.css'

const titleInput = t => (
	<div>
		<label className={styles.form_label} htmlFor="titleId">
			{t('exam.title')}*:
		</label>
		{/* eslint-disable-next-line max-len */}
		<input name="title" className="form-control" required data-id="titleId" type="text" />
	</div>
)
const classInput = (t, options, action) => (
	<div>
		<label className={styles.form_label} htmlFor="classSelection">
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
	<div>
		<label className={styles.form_label} htmlFor="subjectSelection">
			{t('general.selectSubject')}:
		</label>
		<select
			className="form-control"
			name="Subject"
			data-id="subjectSelection"
			type="text"
		>
			{options}
		</select>
	</div>
)

const dateInput = t => (
	<div className={`${styles.form_div} form-group`}>
		<label className={styles.form_label} htmlFor="dateIn">
			{t('general.date')}:
		</label>
		<input className="form-control" name="date" type="date" data-id="dateIn" />
	</div>
)
const numberInput = t => (
	<div className={`${styles.form_div} form-group`}>
		<label className={styles.form_label} htmlFor="number-input">
			{t('general.number')}:
		</label>
		<input
			className={`${styles.weight_input} form-control`}
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

const examForm = (t, subjectOptions, classOption, actions) => {
	const examFields = (
		<div>
			<form className="form-inline" onSubmit={actions.addNewExam} method="POST">
				{titleInput(t)}
				{classInput(t, classOption, actions.getSelectedSubject)}
				{subjectInput(t, subjectOptions)}
				{dateInput(t)}
				{numberInput(t)}
				<div className={styles.form_save_btn}>
					<button type="submit" className="btn btn-success">
						{t('general.add')}
					</button>
				</div>
			</form>
		</div>
	)
	return examFields
}

export default examForm
