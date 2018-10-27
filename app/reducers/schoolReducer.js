// @flow
import { HANDLE_SCHOOL_DATA } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {}

const handleSchoolReducer = (state = initialLoadState, action) => {
  switch (action.type) {
    case HANDLE_SCHOOL_DATA:
      const { title, schoolstate, state, country, zip, year } = action.payload
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

export default handleSchoolReducer
