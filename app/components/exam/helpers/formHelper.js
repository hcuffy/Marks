import React from 'react'
import styles from '../../styles/exam.css'

const examForm = (subjectOptions, classOption, actions) => {
	const examFields = (
		<div>
			<form className="form-inline" onSubmit={actions.addNewExam} method="POST">
				<div>
					<label className={styles.form_label} htmlFor="titleId">
						Title*:
					</label>
					<input
						name="Title"
						className="form-control"
						required
						data-id="titleId"
						type="text"
					/>
				</div>
				<div>
					<label className={styles.form_label} htmlFor="classSelection">
						Select Classroom:
					</label>
					<select
						onChange={actions.getSelectedSubject}
						className="form-control"
						name="Room"
						data-id="classSelection"
						type="text"
					>
						{classOption}
					</select>
				</div>
				<div>
					<label className={styles.form_label} htmlFor="subjectSelection">
						Select Subject:
					</label>
					<select
						className="form-control"
						name="Subject"
						data-id="subjectSelection"
						type="text"
					>
						{subjectOptions}
					</select>
				</div>
				<div className={`${styles.form_div} form-group`}>
					<label className={styles.form_label} htmlFor="dateIn">
						Date:
					</label>
					{/* eslint-disable-next-line max-len */}
					<input className="form-control" name="Date" type="date" data-id="dateIn" />
				</div>
				<div className={`${styles.form_div} form-group`}>
					<label className={styles.form_label} htmlFor="number-input">
						Number:
					</label>
					<input
						className={`${styles.weight_input} form-control`}
						defaultValue="1"
						name="Weight"
						type="number"
						data-id="number-input"
						min="1"
						max="4"
						step="0.5"
					/>
				</div>
				<div className={styles.form_save_btn}>
					<button type="submit" className="btn btn-success">
						Add New Exam
					</button>
				</div>
			</form>
		</div>
	)
	return examFields
}

export default examForm
