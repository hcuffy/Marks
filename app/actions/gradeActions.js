import {
	DISPLAY_EXAM_TABLE,
	OPEN_CLASS_LIST,
	UPDATE_EXAM_TABLE
} from '../constants/actionTypes'
import { getExamData } from '../database/examCollection'
import { getAllGrades, addGradeData, updateGradeData } from '../database/gradeCollection'

const _ = require('lodash')

export const openGradeClassList = event => dispatch => {
	const classroom = event.target.innerText
	dispatch({
		type: OPEN_CLASS_LIST,
		payload: classroom
	})
}

const filterGrades = async exams => {
	const filteredGrades = []
	const allGrades = await getAllGrades()
	for (let i = 0; i < exams.length; i += 1) {
		filteredGrades.push(..._.filter(allGrades, ['examId', exams[i]._id]))
	}
	return filteredGrades
}

const filterExams = async subjectData =>
	_.filter(await getExamData(), ['subjectId', subjectData.subjectId])

export const displayGradeData = event => async dispatch => {
	const subjectData = {
		subjectId: event.target.getAttribute('data-id'),
		subjectName: event.target.innerText
	}

	const exams = await filterExams(subjectData)
	const grades = await filterGrades(exams)
	dispatch({
		type: DISPLAY_EXAM_TABLE,
		payload: { exams, grades, subjectData }
	})
}

export const updateGrade = event => async dispatch => {
	const gradeId = event.target.getAttribute('data-id')
	const subjectData = {
		subjectId: event.target.getAttribute('data-subjectid'),
		subjectName: event.target.getAttribute('data-subjectname')
	}

	const gradeData = {
		grade: event.target.value === '' ? 0 : event.target.value,
		examId: event.target.getAttribute('data-examid'),
		studentId: event.target.getAttribute('data-studentid'),
		date: event.target.getAttribute('data-date'),
		weight: event.target.getAttribute('data-weight')
	}

	if (_.isNull(gradeId)) {
		addGradeData(gradeData)
	} else {
		updateGradeData(gradeData, gradeId)
	}

	const exams = await filterExams(subjectData)
	const grades = await filterGrades(exams)
	dispatch({
		type: UPDATE_EXAM_TABLE,
		payload: { exams, grades }
	})
}
