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
