import { DISPLAY_EXAM_TABLE, OPEN_CLASS_LIST } from '../constants/actionTypes'
import { getExamData } from '../database/examCollection'
import { getAllGrades, addGradeData, updateGradeData } from '../database/gradeCollection'

const _ = require('lodash')

export const openGradeClassList = event => {
	const classroom = event.target.innerText
	return {
		type: OPEN_CLASS_LIST,
		payload: classroom
	}
}

const filterTheGrades = async exams => {
	const filteredGrades = []
	const allGrades = await getAllGrades()
	for (let i = 0; i < exams.length; i += 1) {
		filteredGrades.push(..._.filter(allGrades, ['examId', exams[i]._id]))
	}
	return filteredGrades
}

export const displayGradeData = event => async dispatch => {
	const subjectData = {
		subjectId: event.target.id,
		subjectName: event.target.innerText
	}

	const exams = _.filter(await getExamData(), ['SubjectId', subjectData.subjectId])
	if (exams.length !== 0) {
		const grades = await filterTheGrades(exams)
		dispatch({
			type: DISPLAY_EXAM_TABLE,
			payload: { exams, grades, subjectData }
		})
	}
}

export const updateGrade = event => {
	const { id } = event.target
	const gradeData = {
		grade: event.target.value,
		examId: event.target.getAttribute('data-examid'),
		studentId: event.target.getAttribute('data-studentid'),
		date: event.target.getAttribute('data-date'),
		weight: event.target.getAttribute('data-weight')
	}
	if (id === '') {
		addGradeData(gradeData)
	} else {
		updateGradeData(gradeData, id)
	}
}
