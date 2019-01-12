// TODO: This funciton should take a variable

export const gradeInfo = () => {
	const data = [
		{
			name: 'Sara Smith',
			gender: 'F',
			grades: [
				{ date: '2018-12-13', score: 2, weight: 1 },
				{ date: '2018-12-15', score: 4, weight: 2 },
				{ date: '2018-12-25', score: 1, weight: 3 }
			]
		},
		{
			name: 'Bob Johnson',
			gender: 'M',
			grades: [
				{ date: '2018-12-13', score: 1, weight: 1 },
				{ date: '2018-12-15', score: 1, weight: 2 },
				{ date: '2018-12-25', score: 1, weight: 3 }
			]
		},
		{
			name: 'John Ludwig',
			gender: 'M',
			grades: [
				{ date: '2018-12-13', score: 0, weight: 1 },
				{ date: '2018-12-15', score: 0, weight: 2 },
				{ date: '2018-12-25', score: 0, weight: 3 }
			]
		}
	]

	return data
}
