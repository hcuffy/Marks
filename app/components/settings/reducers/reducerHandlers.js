import { actions } from '../constants'
import { defaultStateUpdater } from '../../../reducers/reducerUtils.js'

export const settingsHandlers = {
	[actions.HANDLE_SCHOOL_DATA]: defaultStateUpdater,
	[actions.UPDATE_GRADING_DATA]: defaultStateUpdater,
	[actions.GET_SYSTEM_TYPE]: defaultStateUpdater,
	[actions.DISPLAY_SCHOOL_DATA]: defaultStateUpdater
}
