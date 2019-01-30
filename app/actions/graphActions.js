import { OPEN_GRAPH_CLASS_LIST } from '../constants/actionTypes'

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
