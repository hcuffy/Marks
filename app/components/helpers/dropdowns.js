import React from 'react'
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap'
import { selectClassroom } from '../../notifications/warnings'

const _ = require('lodash')

export const getClassList = classlist => {
	const items = classlist.map((data, idx) => (
		<DropdownItem key={idx} name={data.Name}>
			{data.Name}
		</DropdownItem>
	))

	return items
}

export const getSubjectList = (examData, subjectData) => {
	const selectedSubjects = _.filter(subjectData.data, ['Room', examData.selectedRoom])
	const items = selectedSubjects.map((data, idx) => (
		<DropdownItem key={idx} name={data.Name} data-id={data._id}>
			{data.Name}
		</DropdownItem>
	))
	return items
}

export const getAllSubjects = subjects => {
	const checkSubject = _.isUndefined(subjects) ? [] : subjects
	const items = checkSubject.map((data, idx) => (
		<DropdownItem key={idx} name={data.Name} data-id={data._id}>
			{data.Name}
		</DropdownItem>
	))
	return items
}

export const getExamList = (exams, subjectId) => {
	const selectedExams = _.filter(exams, ['SubjectId', subjectId])
	const items = selectedExams.map((data, idx) => (
		<DropdownItem key={idx} name={data.SubjectId} data-id={data._id}>
			{data.Title}
		</DropdownItem>
	))

	return items
}

export const getStudentList = allStudents => {
	const students = _.sortBy(
		_.isUndefined(allStudents) ? [] : allStudents,
		['Firstname'],
		['asc']
	)
	const items = students.map((data, idx) => (
		<DropdownItem key={idx} data-id={data._id}>
			{`${data.Firstname} ${data.Lastname}`}
		</DropdownItem>
	))

	return items
}

export const createDropdown = (styling, openIt, action, { label }, options) => (
	<div className={styling}>
		<Dropdown isOpen={openIt} toggle={action}>
			<DropdownToggle color="info" caret>
				{label}
			</DropdownToggle>
			<DropdownMenu>{options}</DropdownMenu>
		</Dropdown>
	</div>
)

export const notifyIfEmpty = (options, selected) => {
	if (_.isEmpty(options) && selected) {
		selectClassroom()
	}
}
