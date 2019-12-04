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

	for (let i = 0; i < exams.length; i += 1) {
		const assembledInfo = {}
		assembledInfo.studentId = studentId
		assembledInfo.subjectName = gradeData.subjectName
		assembledInfo.subjectId = gradeData.subjectId
		assembledInfo.examId = exams[i]._id
		assembledInfo.weight = exams[i].weight
		assembledInfo.date = exams[i].date
		assembledInfo.subjectName = gradeData.subjectName
		const score = _.filter(grades, { examId: exams[i]._id, studentId })
		assembledInfo.gradeId = checkGradeId(score[0])
		const adjustedScore = _.isUndefined(score[0]) ? 0 : score[0].grade
		assembledInfo.score = adjustedScore
		grade.push(assembledInfo)
	}

	return grade
}

const gradeAvgDenominator = grades => _.sumBy(_.filter(grades,(grade) =>
	grade.score > 0), (grade) => parseInt(grade.weight,10))

const studentAverage = grades => {
	const total = _.reduce(
		grades,
		(sum, grade) => {
			const { score, weight } = grade
			return sum + parseInt(score, 10) * parseInt(weight, 10)
		},
		0
	)
	return _.round(total / gradeAvgDenominator(grades), 2)
}

const getAverage = grades => {
	const removeZeros = _.filter(grades, grade => grade.score !== 0)
	const average = _.isEmpty(removeZeros) ? 0 : studentAverage(removeZeros)

	return { average }
}

const formulateStudentData = (students, gradeData) => {
	const data = []

	for (let i = 0; i < students.length; i += 1) {
		const personalData = getPersonalInfo(students[i])
		const gradesData = getGradeInfo(students[i], gradeData)
		const average = getAverage(gradesData)
		const studentData = _.assign({}, personalData, { grades: gradesData }, average)

		data.push(studentData)
	}

	return data
}

export const gradeInfo = (gradeData, students) => {
	const { classroomId } = gradeData

	if (_.isUndefined(gradeData) || _.isUndefined(students)) {
		return []
	}

	const studentsByClassroom = _.filter(students, { classroom: classroomId })
	const studentGradeData = formulateStudentData(studentsByClassroom, gradeData)

	if (_.isUndefined(studentGradeData[0])) {
		return []
	}

	return studentGradeData
}
