import React from 'react'
import { DropdownItem } from 'reactstrap'

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
