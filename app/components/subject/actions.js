import {
	UPDATE_CLASS_LIST,
	GET_SINGLE_SUBJECT,
	ADD_NEW_SUBJECT,
	GET_SUBJECT_LIST,
	OPEN_CLOSE_SUBJECT_MODAL
} from './constants'
import {
	addSubjectData,
	getAllSubjects,
	updateSubjectData,
	deleteSubject
} from '../../collections/subject'

export const openClassList = event => dispatch => {
	if (event.target.getAttribute('data-check') !== 'classDropdown') {
		return
	}

	const subject = event.target.innerText
	dispatch({
		type: UPDATE_CLASS_LIST,
		payload: subject
	})
}

export const addNewSubject = event => async dispatch => {
	event.preventDefault()

	const formData = {
		name: event.target.name.value,
		abbreviation: event.target.abbreviation.value,
		room: event.target.room.value
	}

	event.target.reset()
	const data = await addSubjectData(formData)

	dispatch({
		type: ADD_NEW_SUBJECT,
		payload: { data }
	})
}

export const getSubjectData = () => async dispatch => {
	const data = await getAllSubjects()

	dispatch({
		type: GET_SUBJECT_LIST,
		payload: { data }
	})
}

export const showSubject = event => dispatch => {
	const subject = event.target.innerText
	getSubjectData()
	dispatch({
		type: GET_SINGLE_SUBJECT,
		payload: subject
	})
}

export const deleteSingleSubject = event => async dispatch => {
	const subjectData = {
		id: event.target.getAttribute('data-id')
	}

	const data = await deleteSubject(subjectData)

	dispatch({
		type: OPEN_CLOSE_SUBJECT_MODAL,
		payload: subjectData
	})

	dispatch({
		type: GET_SUBJECT_LIST,
		payload: { data }
	})
}

export const updateSubject = event => async dispatch => {
	event.preventDefault()
	const subjectData = {
		name: event.target.name.value,
		abbreviation: event.target.abbreviation.value,
		classroomId: event.target.classroomId.getAttribute('data-id'),
		subjectId: event.target.subjectId.getAttribute('data-id')
	}

	const subjectDoc = await updateSubjectData(subjectData)
	const data = await getAllSubjects()

	dispatch({
		type: OPEN_CLOSE_SUBJECT_MODAL,
		payload: { id: subjectData.subjectId }
	})

	if (subjectDoc.length > 0) {
		dispatch({
			type: GET_SINGLE_SUBJECT,
			payload: subjectDoc[0].room
		})
	}
	dispatch({
		type: GET_SUBJECT_LIST,
		payload: { data }
	})
}

export const subjectModalDisplay = event => dispatch => {
	event.preventDefault()
	const subjectId = {
		id: event.target.getAttribute('data-id')
	}

	dispatch({
		type: OPEN_CLOSE_SUBJECT_MODAL,
		payload: subjectId
	})
}
