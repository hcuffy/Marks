/* eslint-disable no-plusplus */
import React from 'react'

const customCell = (props, actions) => (
	<input defaultValue={props.value} onChange={actions.addGrade} />
)
const customHeader = (props, date, weight) => (
	<div>
		{`${weight} `}
		<i className="fas fa-weight-hanging">{` ${date}`}</i>
	</div>
)
const customColumn = (data, actions) => {
	const columnData = new Array(data[0].grades.length)

	for (let i = 0; i < data[0].grades.length; i++) {
		const { date, weight } = data[0].grades[i]
		columnData.push({
			Header: props => customHeader(props, date, weight),
			accessor: `grades[${i}].score`,
			Cell: props => customCell(props, actions)
		})
	}
	return columnData
}

export const gradeColumns = ({ newData, actions }) => {
	const columns = [
		{
			Header: 'Student Data',
			columns: [
				{
					Header: <i className="fas fa-user" />,
					accessor: 'gender',
					width: 40,
					style: { textAlign: 'center' }
				}, {
					Header: 'Full Name',
					accessor: 'name',
					width: 200
				}
			]
		}, {
			Header: 'Examinations & Tests',
			columns: customColumn(newData, actions)
		}
	]

	return columns
}
