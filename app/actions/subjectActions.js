import { UPDATE_SUBJECT_LIST } from './actionTypes'

export const openSubjectDropdown = event => {
	event.preventDefault()

	return {
		type: UPDATE_SUBJECT_LIST,
		payload: {}
	}
}
