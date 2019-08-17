const _ = require('lodash')

const getPersonalInfo = student => ({
	name: `${student.lastname}, ${student.firstname}`,
	gender: student.gender === 'male' ? 'M' : 'F'
})

const checkGradeId = grade => {
	if (_.isUndefined(grade)) {
		return null
	}

	return grade._id
}
const getGradeInfo = (student, gradeData) => {
	const grade = []
	const studentId = student._id
	const { exams, grades } = gradeData
	if (_.isUndefined(exams) || _.isUndefined(grades)) {
		return []
	}

	for (const exam of exams) {
		const assembledInfo = {}
		assembledInfo.studentId = studentId
		assembledInfo.subjectName = gradeData.subjectName
		assembledInfo.subjectId = gradeData.subjectId
		assembledInfo.examId = exam._id
		assembledInfo.weight = exam.weight
		assembledInfo.date = exam.date
		assembledInfo.subjectName = gradeData.subjectName
		const score = _.filter(grades, { examId: exam._id, studentId })
		assembledInfo.gradeId = checkGradeId(score[0])
		const adjustedScore = _.isUndefined(score[0]) ? 0 : score[0].grade
		assembledInfo.score = adjustedScore
		grade.push(assembledInfo)
	}

	return grade
}

const getAverage = grades => {
	const total = _.reduce(
		grades,
		(sum, grade) => {
			const { score, weight } = grade

			return sum + parseInt(score, 10) * parseInt(weight, 10)
		},
		0
	)

	return { average: _.round(total / grades.length, 2) }
}

export const gradeInfo = (gradeData, students) => {
	const data = []

	if (_.isUndefined(gradeData) || _.isUndefined(students)) {
		return []
	}

	for (student of students) {
		const personalData = getPersonalInfo(student)
		const gradesData = getGradeInfo(student, gradeData)
		const average = getAverage(gradesData)
		const studentData = _.assign({}, personalData, { grades: gradesData }, average)

		data.push(studentData)
	}
	if (_.isUndefined(data[0]) || _.isNaN(data[0].average)) {
		return []
	}

	return data
}
