import React from 'react'
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap'
import { firstMakeSelection } from '../../notifications/warnings'
import styles from './styles/helpers.css'

const _ = require('lodash')

export const getClassList = classlist => {
	const items = classlist.map((data, idx) => (
		<DropdownItem key={idx} name={data.name} data-check="classDropdown">
			{data.name}
		</DropdownItem>
	))

	return items
}

export const getSubjectList = (examData, subjectData) => {
	const selectedSubjects = _.filter(subjectData.data, ['room', examData.selectedRoom])
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

export const createDropdown = (styling, openIt, action, label, options, dataId) => (
	<div className={styling}>
		<Dropdown isOpen={openIt} toggle={action}>
			<DropdownToggle data-check={dataId} className={styles.dropdown_color} caret>
				{label}
			</DropdownToggle>
			<DropdownMenu>{options}</DropdownMenu>
		</Dropdown>
	</div>
)

export const notifyIfEmpty = (t, options, selected, section) => {
	if (_.isEmpty(options) && selected) {
		firstMakeSelection(t, section)
	}
}
