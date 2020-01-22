import { resolveLabel } from '../../../utils/translationUtil'

export const gradingSystem = settings =>
	_.findKey(settings, gradeType => gradeType === true)

const _ = require('lodash')

const xAxisLabels = (start, limit, step) => _.range(start, limit, step)

const computeGrades = (grades, { start, limit, step }) => {
	const chartLabels = xAxisLabels(start, limit, step)
	const computedGrades = []

	for (let i = start; i < limit; i += 1) {
		computedGrades.push(
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

	return { computedGrades, chartLabels }
}

const computePercentGrades = (grades, { start, limit, step }) => {
	const chartLabels = xAxisLabels(start, limit, step)
	const computedGrades = []

	for (let i = 0; i < grades.length; i += 1) {
		for (let j = 0; j < chartLabels.length; j += 1) {
			if (_.inRange(grades[i].grade, chartLabels[j], chartLabels[j + 1])) {
				computedGrades.push({ grade: chartLabels[j] })
				break
			}
		}
	}

	return computeGrades(computedGrades, { start, limit, step })
}

const computeGradeFormat = (grades, settings) => {
	const gradeSystem = gradingSystem(settings)

	switch (gradeSystem) {
		case 'note':
			return computeGrades(grades, { start: 1, limit: 7, step: 1 })
		case 'points':
			return computeGrades(grades, { start: 0, limit: 16, step: 1 })
		case 'percent':
			return computePercentGrades(grades, { start: 0, limit: 110, step: 10 })
		default:
			return computeGrades(grades, { start: 1, limit: 7, step: 1 })
	}
}

const filterByClass = (allGrades, chartTitle, subjects, exams) => {
	const filteredGrades = []
	const filteredClass = _.filter(subjects, { room: chartTitle })

	for (let i = 0; i < filteredClass.length; i += 1) {
		const temp = filterBySubject(filteredClass[i]._id, exams, allGrades)
		filteredGrades.push(...temp)
	}

	return filteredGrades
}

export const filterBySubject = (subjectId, exams, grades) => {
	const filteredGrades = []
	const filteredExams = _.filter(exams, { subjectId })

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
export const chartData = (t, graphData, subjects, settings) => {
	const filteredGrades = gradesToDisplay(graphData, subjects)

	const { computedGrades, chartLabels } = computeGradeFormat(
		filteredGrades,
		settings
	)

	return {
		labels: chartLabels,
		datasets: [
			{
				label: resolveLabel(graphData.chartTitle, t('graph.schoolGrades')),
				data: computedGrades,
				backgroundColor: [
					'rgba(255, 99, 132, 0.6)',
					'rgba(54, 162, 235, 0.6)',
					'rgba(255, 206, 86, 0.9)',
					'rgba(75, 192, 192, 0.6)',
					'rgba(153, 102, 255, 0.6)',
					'rgba(255, 159, 64, 0.6)',
					'rgba(255, 99, 132, 0.6)',
					'rgba(66, 209, 244,0.6)',
					'rgba(244, 119, 66,0.6)',
					'rgba(201, 66, 190,0.6)',
					'rgba(80, 44, 178,0.6)',
					'rgba(45, 119, 175,0.6)',
					'rgba(34, 183, 183,0.6)',
					'rgba(186, 89, 29,0.6)',
					'rgba(0, 48, 104,0.6)',
					'rgba(209, 28, 8,0.6)',
					'rgba(201, 66, 79,0.6)'
				]
			}
		]
	}
}
