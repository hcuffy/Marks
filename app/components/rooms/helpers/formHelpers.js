import React from 'react'
import styles from '../styles/room.css'

const _ = require('lodash')

export const createFormInputs = (t, labels) =>
	_.keys(labels).map((data, idx) => (
		<div key={idx} className={styles.room_form}>
			<label className={styles.room_form_label} htmlFor={`${data}Id`}>
				{t(`room.${data}`)}:
			</label>
			<input
				name={data}
				className="form-control"
				id={`${data}Id`}
				type="text"
				required
				defaultValue={labels[data]}
			/>
		</div>
	))

export const addRoomForm = (t, formInputs, actions) => (
	<div className={styles.room_div}>
		<form onSubmit={actions.handleClassData} method="POST">
			<div className={styles.form_outer_div}>
				<h4 className={styles.add_header}>{t('room.addClassHeader')}</h4>
				{formInputs}
				<div className={(styles.form_div, styles.save_btn)}>
					<button type="submit" className="btn btn-success">
						{t('general.add')}
					</button>
				</div>
			</div>
		</form>
	</div>
)

export const classInputs = (cleanData, action) =>
	cleanData.map((data, idx) => (
		<button
			key={idx}
			data-id={data._id}
			type="button"
			className={`list-group-item list-group-item-action ${styles.list_btn}`}
			onClick={action}
		>
			{data.name}
			<span className={`badge badge-warning badge-pill ${styles.badge_number}`}>
				{data.subjects.length}
			</span>
		</button>
	))

export const classPill = (index, pillClass, name, action, title) => (
	<li className="nav-item">
		<a
			role="button"
			tabIndex={index}
			className={`${styles.tab_link} nav-link ${pillClass}`}
			onClick={action}
			data-name={name}
		>
			{title}
		</a>
	</li>
)

export const cleanAndFilterData = (objectToClean, cleanBy) => {
	const requiredProp = _.find(objectToClean, { _id: cleanBy.id })
	const cleanedData = _.omit(requiredProp, [
		'_id',
		'createdAt',
		'updatedAt',
		'subjects',
		'tests',
		'classroomId',
		'room'
	])
	return cleanedData
}

export const createModalInputs = (t, selectedRoom) =>
	_.keys(selectedRoom).map((data, idx) => (
		<div key={idx} className={styles.form_div}>
			<label className={styles.form_label} htmlFor={`${data}_Id`}>
				{t(`room.${data}`)}:
			</label>
			<input
				name={data}
				className={`${styles.form_input} form-control`}
				data-id={`${data}_Id`}
				type="text"
				required
				defaultValue={selectedRoom[data]}
			/>
		</div>
	))

export const checkChange = (classData, actions) => {
	if (classData.check) {
		actions.displayClassData()
	}
}

export const sortData = clean => {
	const sortedProp = _.sortBy(clean.classData, ['name'], ['asc'])

	return sortedProp
}
