import { actions } from '../constants'
import { defaultStateUpdater } from '../../../reducers/reducerUtils.js'

export const sidemenuHandlers = {
	[actions.HANDLE_MENU_CHANGE]: defaultStateUpdater
}
