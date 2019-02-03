import {
	CHANGE_CLASSROOM_TAB,
	ADD_CLASSROOM_DATA,
	GET_CLASSROOM_DATA
} from '../constants/actionTypes'
import { addClassroomData, getClassroomData } from '../database/classroomCollection'

const changeTab = tabTitle => {
	const newState = {}

	newState.classTab = tabTitle === 'Classes'
	newState.testTab = tabTitle === 'Exams/Tests'
	newState.subjectClass = tabTitle === 'Classes' ? 'active' : ''
	newState.testClass = tabTitle === 'Exams/Tests' ? 'active' : ''

	return newState
}

export const changeClassroomTab = event => dispatch => {
	const clickedTabTitle = event.target.text
	const clickedTabState = event.target.className.split(' ')[1]

	if (clickedTabState !== 'active') {
		const tabState = changeTab(clickedTabTitle)
		dispatch({
			type: CHANGE_CLASSROOM_TAB,
			payload: { tabState }
		})
	}
	dispatch({
		type: '',
		payload: {}
	})
}

export const handleClassData = event => async dispatch => {
	event.preventDefault()

	const formData = {
		Name: event.target.Name.value,
		Teacher: event.target.Teacher.value,
		Code: event.target.Code.value,
		Subject_Teacher: event.target.Subject_Teacher.value
	}
	event.target.reset()
	addClassroomData(formData)
	const data = await getClassroomData()

	dispatch({
		type: ADD_CLASSROOM_DATA,
		payload: { inputData: data }
	})
}

export const displayClassData = () => async dispatch => {
	const data = await getClassroomData()
	if (data.length !== 0) {
		dispatch({
			type: GET_CLASSROOM_DATA,
			payload: { classData: data }
		})
	}
}
