import { capabilityHandlers } from './reducerHandlers'
import { reducerActionHandler } from '../../../reducers/reducerUtils.js'

const initialLoadState = {
	classDropdown: false,
	studentDropdown: false,
	questionDropdown: false,
	classroom: null,
	classroomId: null,
	studentName: null,
	studentId: null,
	answers: [],
	questions: []
}

export const applyCapabilityChanges = (state = initialLoadState, action) => {
	return reducerActionHandler(state, action, capabilityHandlers)
}
