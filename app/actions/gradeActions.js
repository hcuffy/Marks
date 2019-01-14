import {
	DISPLAY_EXAM_TABLE,
	OPEN_CLASS_LIST,
	GET_ALL_GRADES
} from '../constants/actionTypes'
import { getExamData } from '../database/examCollection'
import { getAllGrades } from '../database/gradeCollection'

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

export const addGrade = event => {
	event.preventDefault()
	const test = event.target.value
	console.log(test)
}
