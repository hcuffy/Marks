import { DISPLAY_EXAM_TABLE, OPEN_CLASS_LIST } from '../constants/actionTypes'
import { getExamData } from '../database/examCollection'

const _ = require('lodash')

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

export const openGradeClassList = event => {
	const classroom = event.target.innerText
	return {
		type: OPEN_CLASS_LIST,
		payload: classroom
	}
}
