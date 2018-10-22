// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import displaySchoolData from './schoolDataReducer'
import handleTabChange from './changeTabReducer'

const rootReducer = combineReducers({
  router,
  schoolData: displaySchoolData,
  tabStatus: handleTabChange
})

export default rootReducer
