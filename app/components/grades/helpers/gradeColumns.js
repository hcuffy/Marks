import React from 'react'
import css from '../styles/grades.css'

const _ = require('lodash')

const customCell = (props, actions) => (
	<input
		defaultValue={props.value.score}
		data-studentid={props.value.studentId}
		data-subjectname={props.value.subjectName}
		data-subjectid={props.value.subjectId}
		data-examid={props.value.examId}
		data-date={props.value.date}
		data-weight={props.value.weight}
		data-id={props.value.gradeId}
		type="number"
		onBlur={actions.updateGrade}
	/>
)

const badgeColor = weight => {
	switch (true) {
	case weight <= 1: {
		return 'badge-success'
	}
	case weight > 2: {
		return 'badge-primary'
	}
	default: {
		return 'badge-warning'
	}
	}
}

const customHeader = ({ date, weight }) => (
	<div>
		<span className={`badge badge-pill ${badgeColor(weight)} ${css.badge_weight}`}>
			<i className="fas fa-weight-hanging" /> {weight}
		</span>
		<span className={`badge badge-light badge-pill ${css.badge_date}`}>
			<i className="fas fa-calendar" /> {date}
		</span>
	</div>
)

const averageColumn = () => ({
	Header: 'Ø',
	accessor: 'average',
	width: 50,
	style: { textAlign: 'center' }
})

const customFooter = ({ data }, iterator) => {
	const grades = []
	for (const entry of data) {
		// eslint-disable-next-line no-underscore-dangle
		const { score, weight } = entry._original.grades[iterator]

		grades.push(parseInt(score, 10) * parseInt(weight, 10))
	}

	return (
		<span>
			<strong>Ø:</strong> {_.round(_.mean(grades), 2)}
		</span>
	)
}
const customColumn = (data, actions) => {
	const columnData = []
	if (_.isUndefined(data[0])) {
		return
	}

	for (let i = 0; i < data[0].grades.length; i += 1) {
		const gradeProps = data[0].grades[i]
		columnData.push({
			Header: customHeader(gradeProps),
			accessor: `grades[${i}]`,
			width: 150,
			Cell: props => customCell(props, actions),
			Footer: props => customFooter(props, i)
		})
	}
	columnData.push(averageColumn())

	return columnData
}

export const gradeColumns = ({ t, newData, actions }) => {
	const columns = [
		{
			Header: t('grades.studentHeader'),
			columns: [
				{
					Header: <i className="fas fa-user" />,
					accessor: 'gender',
					width: 40,
					style: { textAlign: 'center' }
				}, {
					Header: t('grades.fullName'),
					accessor: 'name',
					width: 150,
					headerStyle: { textAlign: 'left' }
				}
			]
		}, {
			Header: t('grades.examHeader'),
			columns: customColumn(newData, actions)
		}
	]

	return columns
}
