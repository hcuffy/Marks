import { subjectModalHandlers } from './reducerHandlers'
import { reducerActionHandler } from '../../../reducers/reducerUtils.js'

const initialLoadState = {
	id: '',
	showSubjectModal: false,
	isInvalid: false
}

export const applySubjectModal = (state = initialLoadState, action) => {
	return reducerActionHandler(state, action, subjectModalHandlers)
}
