import React from 'react'

const ts = () => console.log('Test change')
export const gradeColumns = () => {
	const columns = [
		{
			Header: 'Student Data',
			columns: [
				{
					Header: <i className="fas fa-user" />,
					accessor: 'gender',
					width: 40,
					style: { textAlign: 'center' },
					Cell: props => <input defaultValue={props.row.gender} onChange={ts} />
				}, {
					Header: 'Full Name',
					accessor: 'name',
					width: 200,
					Cell: props => <input defaultValue={props.row.name} onChange={ts} />
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
