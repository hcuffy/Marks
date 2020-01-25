import React from 'react'
import {
	DropdownItem,
	Dropdown,
	DropdownToggle,
	DropdownMenu
} from 'reactstrap'
import { firstMakeSelection } from '../../notifications/warnings'
import css from './styles/helpers.css'

const _ = require('lodash')

export const getClassList = classlist => {
	const items = classlist.map((data, idx) => (
		<DropdownItem
			key={idx}
			name={data.name}
			data-id={data._id}
			data-check="classDropdown"
		>
			{data.name}
		</DropdownItem>
	))

	return items
}

export const getSubjectList = (classroom, subjectData) => {
	const selectedSubjects = _.filter(subjectData.data, [
		'classroomId',
		classroom.selectedRoom
	])

	const items = selectedSubjects.map((data, idx) => (
		<DropdownItem
			key={idx}
			name={data.name}
			data-id={data._id}
			data-check="subjectDropdown"
		>
			{data.name}
		</DropdownItem>
	))

	return items
}

export const getAllSubjects = subjects => {
	const checkSubject = _.isUndefined(subjects) ? [] : subjects

	const items = checkSubject.map((data, idx) => (
		<DropdownItem
			key={idx}
			name={data.name}
			data-id={data._id}
			data-check="subjectDropdown"
		>
			{data.name}
		</DropdownItem>
	))

	return items
}

export const getExamList = (exams, subjectId) => {
	const selectedExams = _.filter(exams, ['subjectId', subjectId])

	const items = selectedExams.map((data, idx) => (
		<DropdownItem
			key={idx}
			name={data.subjectId}
			data-id={data._id}
			data-check="examDropdown"
		>
			{data.title}
		</DropdownItem>
	))

	return items
}

export const getStudentList = allStudents => {
	const students = _.sortBy(
		_.isUndefined(allStudents) ? [] : allStudents,
		['firstname'],
		['asc']
	)

	const items = students.map((data, idx) => (
		<DropdownItem key={idx} data-id={data._id} data-check="studentDropdown">
			{`${data.firstname} ${data.lastname}`}
		</DropdownItem>
	))

	return items
}

export const getNotesList = (allNotes, studentId) => {
	if (_.isNull(studentId) || allNotes.length === 0) {
		return []
	}

	const notes = _.sortBy(_.filter(allNotes, { studentId }), ['title'], ['asc'])

	const items = notes.map((data, idx) => {
		const created = _.toString(data.createdAt).substring(4, 15)

		return (
			<DropdownItem key={idx} data-id={data._id} data-check="notesDropdown">
				{`${data.title} (${created})`}
			</DropdownItem>
		)
	})

	return items
}

export const subjectOptions = (subjects, actions) => {
	const options = subjects.map((data, idx) => (
		<DropdownItem
			key={idx}
			name={data.name}
			onClick={actions.showSubject}
			data-check="classDropdown"
		>
			{data.name}
		</DropdownItem>
	))

	return options
}

const heightModifier = {
	setMaxHeight: {
		enabled: true,
		fn: data => ({
			...data,
			styles: {
				...data.styles,
				overflow: 'auto',
				maxHeight: 300
			}
		})
	}
}

export const createDropdown = (
	styling,
	openIt,
	action,
	label,
	options,
	dataId
) => (
	<div className={styling}>
		<Dropdown isOpen={openIt} toggle={action}>
			<DropdownToggle data-check={dataId} className={css.dropdown_color} caret>
				{label}
			</DropdownToggle>
			<DropdownMenu modifiers={heightModifier}>{options}</DropdownMenu>
		</Dropdown>
	</div>
)

export const notifyIfEmpty = (t, options, selected, section) => {
	if (_.isEmpty(options) && selected) {
		firstMakeSelection(t, section)
	}
}

export const getClassroomName = (id, classdata) => {
	const classObject = _.find(classdata, { _id: id })
	if (_.isUndefined(classObject)) {
		return ''
	}

	return classObject.name
}

export const getClassroomId = (name, classdata) => {
	const classObject = _.find(classdata, { name })
	if (_.isUndefined(classObject)) {
		return ''
	}

	return classObject._id
}

export const getQuestionList = (
	t,
	classroomId,
	capabilityQuestions,
	{ updateQuestionSet }
) => {
	const items = capabilityQuestions.map((data, idx) => (
		<DropdownItem
			key={idx}
			name={data.name}
			data-id={classroomId}
			onClick={updateQuestionSet}
			data-check="questionDropdown"
		>
			{t(`capability.${data.name}.name`)}
		</DropdownItem>
	))

	return items
}