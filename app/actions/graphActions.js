import {
	OPEN_GRAPH_CLASS_LIST,
	GET_ALL_GRADES,
	DISPLAY_SUBJECT_GRADES,
	DISPLAY_EXAM_GRADES,
	GET_ALL_EXAMS
} from '../constants/actionTypes'
import { getAllGrades } from '../database/gradeCollection'
import { getExamData } from '../database/examCollection'

export const openGraphClassList = event => dispatch => {
	if (event.target.type !== 'button') {
		return
	}

	const data = {
		classroom: event.target.innerText,
		chartTitle: event.target.innerText,
		chartToDisplay: 'class'
	}

	dispatch({
		type: OPEN_GRAPH_CLASS_LIST,
		payload: data
	})
}

export const displaySubjectGraph = event => dispatch => {
	if (event.target.type !== 'button') {
		return
	}

	const data = {
		subjectId: event.target.getAttribute('data-id'),
		chartTitle: event.target.innerText,
		subjectName: event.target.innerText,
		chartToDisplay: 'subject'
	}

	dispatch({
		type: DISPLAY_SUBJECT_GRADES,
		payload: data
	})
}

export const displayExamGraph = event => dispatch => {
	if (event.target.type !== 'button') {
		return
	}

	const data = {
		examId: event.target.getAttribute('data-id'),
		chartTitle: event.target.innerText,
		examName: event.target.innerText,
		chartToDisplay: 'exam'
	}

	dispatch({
		type: DISPLAY_EXAM_GRADES,
		payload: data
	})
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

export const getGraphExamData = () => async dispatch => {
	const exams = await getExamData()
	if (exams.length !== 0) {
		dispatch({
			type: GET_ALL_EXAMS,
			payload: { exams }
		})
	}
}
