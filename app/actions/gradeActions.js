import { DISPLAY_EXAM_TABLE } from '../constants/actionTypes'
import { getExamData } from '../database/examCollection'

export const displayGradeData = event => async dispatch => {
	const subjectId = event.target.id
	const exams = await getExamData()
	console.log(exams)
	if (exams.length !== 0) {
		dispatch({
			type: DISPLAY_EXAM_TABLE,
			payload: { exams, subjectId }
		})
	}
}
