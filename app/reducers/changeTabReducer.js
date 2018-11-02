// @flow
import { CHANGE_CLASSROOM_TAB } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {
  tabOneTitle: 'Classes',
  tabTwoTitle: 'Exams/Tests',
  classTab: true,
  testTab: false,
  subjectClass: 'active',
  testClass: ''
}

const handleTabChange = (state = initialLoadState, action) => {
  switch (action.type) {
    case CHANGE_CLASSROOM_TAB: {
      const {
        classTab,
        testTab,
        subjectClass,
        testClass
      } = action.payload.tabState

      return _.assign({}, state, {
        classTab,
        testTab,
        subjectClass,
        testClass
      })
    }
    default:
      return state
  }
}

export default handleTabChange
