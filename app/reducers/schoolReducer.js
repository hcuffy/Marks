// @flow
import { HANDLE_SCHOOL_DATA } from '../actions/actionTypes'
import type { Action } from './types'

const _ = require('lodash')

const initialLoadState = {}

const handleSchoolReducer = (state = initialLoadState, action) => {
  switch (action.type) {
    case HANDLE_SCHOOL_DATA:
      return _.assign({}, state, action.payload)
    default:
      return state
  }
}

export default handleSchoolReducer
