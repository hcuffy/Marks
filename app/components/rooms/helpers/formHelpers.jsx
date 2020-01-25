import React from 'react'
import { Button, Input } from 'reactstrap'
import css from '../styles/room.css'

const _ = require('lodash')

export const createFormInputs = (t, classData) => {
	const { isInvalid } = classData
	const formLabels = _.pick(classData, ['name', 'teacher', 'substitute'])

	return _.keys(formLabels).map((data, idx) => (
		<div key={idx} className={css.room_form}>
			<label className={css.room_form_label} htmlFor={`${data}Id`}>
				{t(`room.${data}`)}:
			</label>

			<Input
				name={data}
				className="form-control"
				id={`${data}Id`}
				type="text"
				defaultValue={formLabels[data]}
				invalid={isInvalid && _.isEmpty(formLabels[data])}
			/>
		</div>
	))
}
export const addRoomForm = (t, formInputs, actions) => (
	<div className={css.room_div}>
		<form onSubmit={actions.handleClassData} method="POST">
			<div className={css.form_outer_div}>
				<h4 className={css.add_header}>{t('room.addClassHeader')}</h4>

				{formInputs}

				<div className={(css.form_div, css.save_btn)}>
					<Button type="submit" formNoValidate className="btn btn-success">
						{t('general.add')}
					</Button>
				</div>
			</div>
		</form>
	</div>
)

export const classInputs = (cleanData, action) =>
	cleanData.map((data, idx) => (
		<Button
			key={idx}
			data-id={data._id}
			className={`list-group-item list-group-item-action ${css.list_btn}`}
			onClick={action}
		>
			{data.name}

			<span className={`badge badge-warning badge-pill ${css.badge_number}`}>
				{data.subjects.length}
			</span>
		</Button>
	))

export const classPill = (index, pillClass, name, action, title) => (
	<li className="nav-item">
		<a
			role="button"
			tabIndex={index}
			className={`${css.tab_link} nav-link ${pillClass}`}
			onClick={action}
			data-name={name}
		>
			{title}
		</a>
	</li>
)

export const filterObjectData = (objectToClean, selectedId) => {
	const requiredProp = _.find(objectToClean, { _id: selectedId })

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

export const createModalInputs = (t, selectedRoom, isInvalid) => {
	return _.keys(selectedRoom).map((data, idx) => (
		<div key={idx} className={css.form_div}>
			<label className={css.form_label} htmlFor={`${data}_Id`}>
				{t(`room.${data}`)}:
			</label>

			<Input
				name={data}
				className={`${css.form_input} form-control`}
				data-id={`${data}_Id`}
				type="text"
				invalid={isInvalid && _.isEmpty(selectedRoom[data])}
				defaultValue={selectedRoom[data]}
			/>
		</div>
	))
}

export const checkChange = (classData, actions) => {
	if (classData.check) {
		actions.displayClassData()
	}
}

export const sortData = clean => {
	const sortedProp = _.sortBy(clean.classData, ['name'], ['asc'])

	return sortedProp
}
