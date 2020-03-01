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

const assembleGradeInformation = (studentId, gradeData, examData, grades) => {
	const { subjectName, subjectId } = gradeData
	const { examId, weight, date } = examData
	const uneditedScore = _.filter(grades, { examId, studentId })
	const gradeId = checkGradeId(uneditedScore[0])
	const score = _.isUndefined(uneditedScore[0]) ? 0 : uneditedScore[0].grade

	const assembledGradeInfo = {
		studentId,
		subjectName,
		subjectId,
		examId,
		weight,
		date,
		gradeId,
		score
	}

	return assembledGradeInfo
}

const getGradeInfo = (student, gradeData) => {
	const grade = []
	const studentId = student._id
	const { exams, grades } = gradeData

	if (_.isUndefined(exams) || _.isUndefined(grades)) {
		return []
	}

	for (let i = 0; i < exams.length; i += 1) {
		const examData = {
			examId: exams[i]._id,
			weight: exams[i].weight,
			date: exams[i].date
		}

		const assembledInfo = assembleGradeInformation(
			studentId,
			gradeData,
			examData,
			grades
		)
		grade.push(assembledInfo)
	}

	return grade
}

const gradeAvgDenominator = grades =>
	_.sumBy(
		_.filter(grades, grade => grade.score > 0),
		grade => parseInt(grade.weight, 10)
	)

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
	const withoutZeros = _.filter(grades, grade => _.parseInt(grade.score) !== 0)

	const average = _.isEmpty(withoutZeros) ? 0 : studentAverage(withoutZeros)

	return { average }
}

const formulateStudentData = (students, gradeData) => {
	const data = []

	for (let i = 0; i < students.length; i += 1) {
		const personalData = getPersonalInfo(students[i])
		const gradesData = getGradeInfo(students[i], gradeData)
		const average = getAverage(gradesData)

		const studentData = _.assign(
			{},
			personalData,
			{ grades: gradesData },
			average
		)

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
