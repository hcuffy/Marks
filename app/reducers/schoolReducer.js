// @flow
import { HANDLE_SCHOOL_DATA } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {}

const handleSchoolReducer = (state = initialLoadState, action) => {
  switch (action.type) {
    case HANDLE_SCHOOL_DATA:
      const { Title, Street, Province, Country, Zip, Year } = action.payload
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

export default handleSchoolReducer
