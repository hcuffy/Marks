// @flow
import { DISPLAY_SCHOOL_DATA, HANDLE_SCHOOL_DATA } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {}

const displaySchoolData = (state = initialLoadState, action) => {
  switch (action.type) {
    case DISPLAY_SCHOOL_DATA:
      const {
        Title,
        Street,
        Province,
        Country,
        Zip,
        Year
      } = action.payload.schoolData[0]
      return _.assign({}, state, {
        Title,
        Street,
        Province,
        Country,
        Zip,
        Year
      })
    default:
      return state
  }
}

export default displaySchoolData
