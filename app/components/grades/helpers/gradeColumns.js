/* eslint-disable no-plusplus */
import React from 'react'
import styles from '../../styles/grades.css'

const customCell = (props, actions) => (
	<input defaultValue={props.value} onChange={actions.addGrade} />
)
const customHeader = (props, date, weight) => (
	<div>
		<span className={`badge badge-warning badge-pill ${styles.badge_weight}`}>
			<i className="fas fa-weight-hanging" /> {weight}
		</span>
		<span className={`badge badge-light badge-pill ${styles.badge_date}`}>
			<i className="fas fa-calendar" /> {date}
		</span>
	</div>
)
const customColumn = (data, actions) => {
	const columnData = new Array(data[0].grades.length)

	for (let i = 0; i < data[0].grades.length; i++) {
		const { date, weight } = data[0].grades[i]
		columnData.push({
			Header: props => customHeader(props, date, weight),
			accessor: `grades[${i}].score`,
			width: 150,
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
					width: 150,
					headerStyle: { textAlign: 'left' }
				}
			]
		}, {
			Header: 'Examinations & Tests',
			columns: customColumn(newData, actions)
		}
	]

	return columns
}