const _ = require('lodash')

export const filterBySubject = (subjectId, exams, grades) => {
	const filteredGrades = []

	const filteredExams = _.filter(exams, { SubjectId: subjectId })
	for (let i = 0; i < filteredExams.length; i += 1) {
		const temp = _.filter(grades, { examId: filteredExams[i]._id })
		filteredGrades.push(...temp)
	}

	return filteredGrades
}

const chartLabels = () => ['One',
	'Two',
	'Three',
	'Four',
	'Five',
	'Six']

const chartHeader = chartTitle => (chartTitle === null ? 'School Grades' : chartTitle)

const filteredData = grades => {
	const sumArr = []

	for (let i = 1; i < 7; i += 1) {
		sumArr.push(
			_.reduce(
				grades,
				(sum, current) => {
					const temp = parseInt(current.grade, 10)
					return temp === i ? sum + 1 : sum
				},
				0
			)
		)
	}

	return sumArr
}

export const chartData = (grades, chartTitle) => ({
	labels: chartLabels(),
	datasets: [
		{
			label: chartHeader(chartTitle),
			data: filteredData(grades),
			backgroundColor: [
				'rgba(255, 99, 132, 0.6)',
				'rgba(54, 162, 235, 0.6)',
				'rgba(255, 206, 86, 0.6)',
				'rgba(75, 192, 192, 0.6)',
				'rgba(153, 102, 255, 0.6)',
				'rgba(255, 159, 64, 0.6)',
				'rgba(255, 99, 132, 0.6)'
			]
		}
	]
})
