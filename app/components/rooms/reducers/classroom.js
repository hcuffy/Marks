import { classroomHandlers } from './reducerHandlers'
import { reducerActionHandler } from '../../../reducers/reducerUtils.js'

const initialLoadState = {
	name: '',
	teacher: '',
	substitute: '',
	classData: [{ name: '', subjects: [] }],
	check: false,
	isInvalid: false
}

export const applyClassData = (state = initialLoadState, action) => {
	return reducerActionHandler(state, action, classroomHandlers)
}
