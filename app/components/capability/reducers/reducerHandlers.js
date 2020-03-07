import { actions } from '../constants'
import { defaultStateUpdater } from '../../../reducers/reducerUtils.js'

const _ = require('lodash')

const classroomDropdownUpdater = (state, action) => {
	const classDropdown = !state.classDropdown
	const studentDropdown = false

	return _.assign({}, state, { classDropdown, studentDropdown }, action.payload)
}

const studentDropdownUpdater = (state, action) => {
	const studentDropdown = !state.studentDropdown
	const classDropdown = false

	return _.assign({}, state, { studentDropdown, classDropdown }, action.payload)
}

const questionDropdownUpdater = (state, action) => {
	const questionDropdown = !state.questionDropdown

	return _.assign({}, state, { questionDropdown })
}

const questionSetUpdater = (state, action) => {
	const questionDropdown = false

	return _.assign({}, state, { questionDropdown }, action.payload)
}

export const capabilityHandlers = {
	[actions.OPEN_CLOSE_CLASS_LIST]: classroomDropdownUpdater,
	[actions.OPEN_CLOSE_STUDENT_LIST]: studentDropdownUpdater,
	[actions.GET_ALL_QUESTIONS]: defaultStateUpdater,
	[actions.OPEN_CLOSE_QUESTION_LIST]: questionDropdownUpdater,
	[actions.UPDATE_QUESTION_SET]: questionSetUpdater,
	[actions.UPDATE_ANSWERS]: defaultStateUpdater
}
