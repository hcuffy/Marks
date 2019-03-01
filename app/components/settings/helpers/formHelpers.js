import React from 'react'
import styles from '../styles/settings.css'
import { t } from '../../../utils/translationUtil'

const _ = require('lodash')

export const addressForm = (entry, actions) => (
	<form onSubmit={actions.handleSchoolData} method="POST">
		<div className={styles.form_outer_div}>
			{entry}
			<div className={(styles.form_inner_div, styles.save_btn)}>
				<button type="submit" className="btn btn-success">
					{t('general.save')}
				</button>
			</div>
		</div>
	</form>
)

export const addressFields = schoolData =>
	_.keys(schoolData).map((data, idx) => (
		<div key={idx} className={styles.form_inner_div}>
			<label className={styles.form_label} htmlFor={`school${data}`}>
				{t(`settings.${data}`)}
			</label>
			<input
				name={data}
				className="form-control"
				id={`school${data}`}
				type="text"
				defaultValue={schoolData[data]}
			/>
		</div>
	))

export const gradeRadioButtons = systemType =>
	_.keys(systemType).map((data, idx) => (
		<div key={idx} className={`form-check ${styles.radio_div}`}>
			<label htmlFor={data} className={`form-check-label ${styles.radio_label}`}>
				{t(`settings.${data}`)}
			</label>
			<input
				id={data}
				type="radio"
				className={`form-control ${styles.radio_input}`}
				name="grading"
				defaultValue={data}
				checked={systemType[data]}
			/>
		</div>
	))
