/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import React from 'react'

const ts = () => console.log('Test change')

const customCell = props => <input defaultValue={props.value} onChange={ts} />
const customHeader = (props, date, weight) => (
	<div>
		{`${weight} `}
		<i className="fas fa-weight-hanging">{` ${date}`}</i>
	</div>
)
const customColumn = data => {
	const columnData = new Array(data[0].grades.length)

	for (let i = 0; i < data[0].grades.length; i++) {
		const { date, weight } = data[0].grades[i]
		columnData.push({
			Header: props => customHeader(props, date, weight),
			accessor: `grades[${i}].score`,
			Cell: props => customCell(props)
		})
	}
	return columnData
}

export const gradeColumns = ({ newData }) => {
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
			columns: customColumn(newData)
		}
	]

	return columns
}
