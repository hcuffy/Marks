import actions from '../constants'
import updateState from '../../..reducers/reducerUtils.js'

export const handlers = {
	[actions.ADD_CLASSROOM_DATA]: updateState(state, action, (propChange = {})),
	[actions.GET_CLASSROOM_DATA]: updateState(state, action, (propChange = {})),
	[actions.CLASSROOM_FORM_VALIDATION]: updateState(
		state,
		action,
		(propChange = {})
	)
}
