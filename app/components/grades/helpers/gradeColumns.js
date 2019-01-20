/* eslint-disable no-plusplus */
import React from 'react'
import styles from '../../styles/grades.css'

const _ = require('lodash')

const customCell = (props, { studentId, examId, date, weight, gradeId }, actions) => (
	<input
		defaultValue={props.value}
		data-studentid={studentId}
		data-examid={examId}
		data-date={date}
		data-weight={weight}
		id={gradeId}
		type="number"
		onChange={actions.updateGrade}
	/>
)
const customHeader = ({ date, weight }) => {
	const badgeColor = weight > 1 ? 'badge-warning' : ' badge-success'
	return (
		<div>
			<span className={`badge badge-pill ${badgeColor} ${styles.badge_weight}`}>
				<i className="fas fa-weight-hanging" /> {weight}
			</span>
			<span className={`badge badge-light badge-pill ${styles.badge_date}`}>
				<i className="fas fa-calendar" /> {date}
			</span>
		</div>
	)
}

const averageColumn = () => ({
	Header: 'Average',
	accessor: 'average',
	width: 150
})

const customFooter = (data, id) => {
	const grades = []
	for (let i = 0; i < data.length; i++) {
		const temp = data[i]
		grades.push(temp[id])
	}
	return (
		<span>
			<strong>Ø:</strong> {_.round(_.mean(grades), 2)}
		</span>
	)
}
const customColumn = (data, actions) => {
	const columnData = new Array(data[0].grades.length)
	for (let i = 0; i < data[0].grades.length; i++) {
		const gradeProps = data[0].grades[i]
		columnData.push({
			Header: customHeader(gradeProps),
			accessor: `grades[${i}].score`,
			width: 150,
			Cell: props => customCell(props, gradeProps, actions),
			Footer: props => customFooter(props.data, props.column.id)
		})
	}
	columnData.push(averageColumn())
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
