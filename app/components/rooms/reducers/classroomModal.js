import { classroomModalHandlers } from './reducerHandlers'
import { reducerActionHandler } from '../../../reducers/reducerUtils.js'

const initialLoadState = {
	id: '',
	showModal: false,
	isInvalid: false
}

export const applyClassModal = (state = initialLoadState, action) => {
	return reducerActionHandler(state, action, classroomModalHandlers)
}
