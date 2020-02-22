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
	/*switch (action.type) {
		case ADD_CLASSROOM_DATA: {
			return _.assign({}, state, action.payload)
		}
		case GET_CLASSROOM_DATA: {
			return _.assign({}, state, action.payload)
		}
		case CLASSROOM_FORM_VALIDATION: {
			return _.assign({}, state, action.payload)
		}
		default:
			return state
	}*/
}
