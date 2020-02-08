import React from 'react'
import { filterObjectData } from '../../rooms/helpers/formHelpers'
import { Button, Input, Label } from 'reactstrap'
import css from '../styles/subject.css'

const _ = require('lodash')

const getClassroomId = dataList => {
	if (_.isEmpty(dataList) || _.isNil(dataList)) {
		return []
	}

	return dataList[0].classroomId
}

export const selectedSubject = (t, subject, isInvalid) => {
	return _.keys(subject).map((data, idx) => (
		<div key={idx} className={css.modal_form_div}>
			<Label className={css.modal_form_label} htmlFor={`${data}_Id`}>
				{t(`room.${data}`)}:
			</Label>

			<Input
				name={data}
				className={`${css.badge_number} form-control`}
				data-id={`${data}_Id`}
				type="text"
				defaultValue={subject[data]}
				invalid={isInvalid && _.isEmpty(subject[data])}
			/>
		</div>
	))
}

export const determineSubjectInputs = (filteredData, id, subjectModalData) => {
	const { name, abbreviation, isInvalid } = subjectModalData

	if (isInvalid === true) {
		return { name, abbreviation }
	} else {
		return filterObjectData(filteredData, id)
	}
}

export const resolveHiddenInput = (filteredData, id) => (
	<div>
		<Input
			type="hidden"
			name="classroomId"
			data-id={getClassroomId(filteredData)}
		/>

		<Input type="hidden" name="subjectId" data-id={id} />
	</div>
)

export const filterSubjects = (chosenClass, subjectData) => {
	if (_.isNil(subjectData) || _.isNil(chosenClass)) {
		return []
	}

	const chosenSubjects = _.chain(subjectData)
		.filter(['classroomId', chosenClass._id])
		.orderBy(
			['abbreviation'],
			[subJ => subJ.abbreviation.toLowerCase()],
			['asc']
		)
		.value()

	return chosenSubjects
}

export const generateSubjectList = (filteredData, action) =>
	filteredData.map((data, idx) => (
		<Button
			key={idx}
			data-id={data._id}
			className={`list-group-item list-group-item-action ${css.list_btn}`}
			onClick={action}
		>
			{data.abbreviation}

			<span className={`badge badge-warning badge-pill ${css.badge_number}`}>
				{data.tests.length}
			</span>
		</Button>
	))

export const generateInputs = (t, { name, abbreviation, isInvalid }) => {
	const formLabels = { name, abbreviation }
	return _.keys(formLabels).map((data, idx) => (
		<div key={idx} className={css.form_div}>
			<Label className={css.form_label} htmlFor={`${data}Sid`}>
				{t(`room.${data}`)}:
			</Label>

			<Input
				name={data}
				className="form-control"
				data-id={`${data}Sid`}
				type="text"
				invalid={isInvalid && _.isEmpty(formLabels[data])}
			/>
		</div>
	))
}
