// @flow
import { CHANGE_CLASSROOM_TAB } from '../actions/actionTypes'
import type { Action } from './types'

const _ = require('lodash')

const initialLoadState = {
  tabOneTitle: 'Subjects',
  tabTwoTitle: 'Exams/Tests',
  subjectTab: true,
  testTab: false,
  subjectIsActive: 'Active',
  testIsActive: ''
}

const handleTabChange = (state = initialLoadState, action) => {
  switch (action.type) {
    case CHANGE_CLASSROOM_TAB:
      const {
        subjectTab,
        testTab,
        subjectIsActive,
        testIsActive
      } = action.payload
      return _.assign({}, state, {
        title,
        street,
        schoolstate,
        country,
        year
      })
    default:
      return state
  }
}

export default handleTabChange
