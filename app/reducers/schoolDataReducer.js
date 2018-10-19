// @flow
import { DISPLAY_SCHOOL_DATA } from '../actions/actionTypes'
import type { Action } from './types'
import { getSchoolData } from '../database/schoolDB'

const initialLoadState = {}

const displaySchoolData = (state = initialLoadState, action) => {
  switch (action.type) {
    case DISPLAY_SCHOOL_DATA:
      const {
        title,
        street,
        schoolstate,
        country,
        zip,
        year
      } = action.payload.schoolData[0]
      return Object.assign({}, state, {
        title,
        street,
        schoolstate,
        country,
        zip,
        year
      })
    default:
      return Object.assign({}, initialLoadState)
  }
}

export default displaySchoolData
