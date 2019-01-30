import { OPEN_GRAPH_CLASS_LIST, GET_ALL_GRADES } from '../constants/actionTypes'
import { getAllGrades } from '../database/gradeCollection'

export const openGraphClassList = event => {
	const classroom = event.target.innerText
	return {
		type: OPEN_GRAPH_CLASS_LIST,
		payload: classroom
	}
}

export const displayClassGraph = event => {
	console.log(event)
	return {
		type: null,
		payload: null
	}
}

export const getAllGradeData = () => async dispatch => {
	const grades = await getAllGrades()
	if (grades.length !== 0) {
		dispatch({
			type: GET_ALL_GRADES,
			payload: { grades }
		})
	}
}
