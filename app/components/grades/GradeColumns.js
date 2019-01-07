// TODO: This funciton should take a variable

export const GradeColumns = () => {
	const columns = [
		{
			Header: 'Student Data',
			columns: [
				{
					Header: 'Gender',
					style: { width: '300px' }
				},
				{
					Header: 'First Name'
				},
				{
					Header: 'Last Name'
				}
			]
		}, {
			Header: 'Examinations & Tests',
			columns: [
				{
					Header: 'Date & Weight'
				}, {
					Header: 'Date & Weight'
				}
			]
		}
	]

	return columns
}
