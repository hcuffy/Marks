// @flow
import { ADD_CLASSROOM_DATA, GET_CLASSROOM_DATA } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {
  Name: '',
  Teacher: '',
  Code: '',
  Subject_Teacher: ''
}

export const addedClassData = (state = initialLoadState, action) => {
  switch (action.type) {
    case ADD_CLASSROOM_DATA:
      const { Name, Teacher, Code, Subject_Teacher } = action.payload.classData
      return _.assign({}, state, {
        Name,
        Teacher,
        Code,
        Subject_Teacher
      })
    default:
      return state
  }
}

const displayClassData = (state = initialLoadState, action) => {
  switch (action.type) {
    case GET_CLASSROOM_DATA:
      const { Name, Teacher, Code, Subject_Teacher } = action.payload.classData
      return _.assign({}, state, {
        Name,
        Teacher,
        Code,
        Subject_Teacher
      })
    default:
      return state
  }
}

export default displayClassData
