import React from 'react'
// TODO: This funciton should take a variable

export const gradeColumns = () => {
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
					width: 200,
					accessor: 'name'
				}
			]
		}, {
			Header: 'Examinations & Tests',
			columns: [
				{
					Header: 'Date & Weight',
					accessor: 'date'
				}, {
					Header: 'Date & Weight'
				}
			]
		}
	]

	return columns
}
