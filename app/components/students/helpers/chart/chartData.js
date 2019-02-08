const _ = require('lodash')

const filteredGrades = (studentGraphId, grades) => {
	const data = []
	const studentGrades = _.sortBy(_.filter(grades, ['studentId', studentGraphId]), [
		'date'
	])
	for (let i = 0; i < studentGrades.length; i += 1) {
		data.push({
			t: studentGrades[i].date,
			y: studentGrades[i].grade
		})
	}
	return data
}

const chartHeader = studentGraphName =>
	_.isUndefined(studentGraphName) ? 'Student Grades' : studentGraphName

export const chartData = ({ studentGraphName, studentGraphId }, grades) => {
	const test = filteredGrades(studentGraphId, grades)
	console.log(test)

	return {
		datasets: [
			{
				label: chartHeader(studentGraphName),
				fill: false,
				pointHoverRadius: 20,
				pointRadius: 5,
				borderColor: 'rgba(255, 99, 132, 0.6)',
				backgroundColor: 'rgba(255, 99, 132, 0.6)',
				pointBackgroundColor: 'rgba(255, 99, 132, 0.6)',
				data: filteredGrades(studentGraphId, grades)
			}
		]
	}
}
