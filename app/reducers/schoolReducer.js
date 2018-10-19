// @flow
import { HANDLE_SCHOOL_DATA } from '../actions/actionTypes'
import type { Action } from './types'

const initialLoadState = {}

const handleSchoolReducer = (state = initialLoadState, action) => {
  switch (action.type) {
    case HANDLE_SCHOOL_DATA:
      const { title, street, state, country, zip, year } = action.payload
      return Object.assign({}, state, { title, street, state, country, year })
    default:
      return state
  }
}

export default handleSchoolReducer
