import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import displaySchoolData from './schoolDataReducer'
import handleTabChange from './changeTabReducer'
import displayClassData from './classDataReducer'
import handleClassModal from './modalReducer'
import openClassList, { getSubjectData } from './subjectReducer'

const rootReducer = combineReducers({
	router,
	schoolData: displaySchoolData,
	tabStatus: handleTabChange,
	allClassData: displayClassData,
	roomModal: handleClassModal,
	selectClass: openClassList,
	subjectData: getSubjectData
})

export default rootReducer
