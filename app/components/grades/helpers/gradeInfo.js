const _ = require('lodash')

const getPersonalInfo = student => ({
	name: `${student.Lastname}, ${student.Firstname}`,
	gender: student.Gender === 'Male' ? 'M' : 'F'
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

	for (let i = 0; i < exams.length; i += 1) {
		const assembledInfo = {}
		assembledInfo.studentId = studentId
		assembledInfo.subjectName = gradeData.subjectName
		assembledInfo.subjectId = gradeData.subjectId
		assembledInfo.examId = exams[i]._id
		assembledInfo.weight = exams[i].Weight
		assembledInfo.date = exams[i].Date
		assembledInfo.subjectName = gradeData.subjectName
		const score = _.filter(grades, { examId: exams[i]._id, studentId })
		assembledInfo.gradeId = checkGradeId(score[0])
		const adjustedScore = _.isUndefined(score[0]) ? 0 : score[0].grade
		assembledInfo.score = adjustedScore
		grade.push(assembledInfo)
	}

	return grade
}

const getAverage = grades => {
	const total = _.reduce(grades, (sum, n) => sum + parseInt(n.score, 10), 0)

	return { average: _.round(total / grades.length, 2) }
}

export const gradeInfo = (gradeData, students) => {
	const data = []
	if (_.isUndefined(gradeData) || _.isUndefined(students)) {
		return []
	}
	for (let i = 0; i < students.length; i += 1) {
		const personalData = getPersonalInfo(students[i])
		const gradesData = getGradeInfo(students[i], gradeData)
		const average = getAverage(gradesData)
		const studentData = _.assign({}, personalData, { grades: gradesData }, average)

		data.push(studentData)
	}
	if (_.isNaN(data[0].average)) {
		return []
	}
	return data
}
