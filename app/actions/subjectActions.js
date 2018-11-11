import { UPDATE_SUBJECT_LIST } from './actionTypes'

export const openClassList = event => {
	event.preventDefault()

	return {
		type: UPDATE_SUBJECT_LIST,
		payload: {}
	}
}
