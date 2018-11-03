// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import displaySchoolData from './schoolDataReducer'
import handleTabChange from './changeTabReducer'
import displayClassData from './classDataReducer'
import handleClassModal from './modalReducer'

const rootReducer = combineReducers({
	router,
	schoolData: displaySchoolData,
	tabStatus: handleTabChange,
	allClassData: displayClassData,
	roomModal: handleClassModal
})

export default rootReducer
