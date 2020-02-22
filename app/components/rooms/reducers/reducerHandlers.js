import { actions } from '../constants'
import {
	defaultStateUpdater,
	modalStateUpdater
} from '../../../reducers/reducerUtils.js'

export const classroomHandlers = {
	[actions.ADD_CLASSROOM_DATA]: defaultStateUpdater,
	[actions.GET_CLASSROOM_DATA]: defaultStateUpdater,
	[actions.CLASSROOM_FORM_VALIDATION]: defaultStateUpdater
}

export const classroomModalHandlers = {
	[actions.OPEN_CLOSE_ROOM_MODAL]: modalStateUpdater,
	[actions.UPDATE_CLASSROOM]: modalStateUpdater,
	[actions.CLASSROOM_MODAL_VALIDATION]: defaultStateUpdater
}

export const tabHandlers = {
	[actions.CHANGE_CLASSROOM_TAB]: defaultStateUpdater
}
