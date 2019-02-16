const _ = require('lodash')

const chartLabels = () => ['One',
	'Two',
	'Three',
	'Four',
	'Five',
	'Six']

const chartHeader = chartTitle => (_.isNull(chartTitle) ? 'School Grades' : chartTitle)

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
const filterByClass = (allGrades, chartTitle, subjects, exams) => {
	const filteredGrades = []
	const filteredClass = _.filter(subjects, { Room: chartTitle })

	for (let i = 0; i < filteredClass.length; i += 1) {
		const temp = filterBySubject(filteredClass[i]._id, exams, allGrades)
		filteredGrades.push(...temp)
	}
	return filteredGrades
}

export const filterBySubject = (subjectId, exams, grades) => {
	const filteredGrades = []
	const filteredExams = _.filter(exams, { SubjectId: subjectId })

	for (let i = 0; i < filteredExams.length; i += 1) {
		const temp = _.filter(grades, { examId: filteredExams[i]._id })
		filteredGrades.push(...temp)
	}

	return filteredGrades
}

const filterByExam = (examId, grades) => {
	const filteredGrades = [..._.filter(grades, { examId })]

	return filteredGrades
}

const gradesToDisplay = (
	{ grades, chartTitle, subjectId, exams, examId, chartToDisplay },
	subjects
) => {
	switch (chartToDisplay) {
	case 'exam':
		return [...filterByExam(examId, grades)]
	case 'subject':
		return [...filterBySubject(subjectId, exams, grades)]
	case 'class':
		return [...filterByClass(grades, chartTitle, subjects, exams)]
	default:
		return _.merge([], grades)
	}
}
export const chartData = (graphData, subjects) => {
	const filteredGrades = gradesToDisplay(graphData, subjects)

	return {
		labels: chartLabels(),
		datasets: [
			{
				label: chartHeader(graphData.chartTitle),
				data: filteredData(filteredGrades),
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
	}
}
