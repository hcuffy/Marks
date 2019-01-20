import {
	DISPLAY_EXAM_TABLE,
	OPEN_CLASS_LIST,
	GET_ALL_GRADES
} from '../constants/actionTypes'
import { getExamData } from '../database/examCollection'
import { getAllGrades, addGradeData } from '../database/gradeCollection'

const _ = require('lodash')

export const openGradeClassList = event => {
	const classroom = event.target.innerText
	return {
		type: OPEN_CLASS_LIST,
		payload: classroom
	}
}

export const displayGradeData = event => async dispatch => {
	const subjectData = {
		subjectId: event.target.id,
		subjectName: event.target.innerText
	}

	const exams = _.filter(await getExamData(), ['SubjectId', subjectData.subjectId])
	if (exams.length !== 0) {
		dispatch({
			type: DISPLAY_EXAM_TABLE,
			payload: { exams, subjectData }
		})
	}
}

export const getGrades = () => async dispatch => {
	const grades = await getAllGrades()
	if (grades.length !== 0) {
		dispatch({
			type: GET_ALL_GRADES,
			payload: { grades }
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
		console.log(false)
	}
}
