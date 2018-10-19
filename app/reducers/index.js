// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import schoolData from './schoolDataReducer'

const rootReducer = combineReducers({
  router,
  schoolData
})

export default rootReducer
