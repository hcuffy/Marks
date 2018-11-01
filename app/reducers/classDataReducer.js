// @flow
import { ADD_CLASSROOM_DATA, GET_CLASSROOM_DATA } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {
  Name: '',
  Teacher: '',
  Code: '',
  Subject_Teacher: '',
  classData: [{ Name: '', Subjects: [] }]
}

export const addedClassData = (state = initialLoadState, action) => {
  switch (action.type) {
    case ADD_CLASSROOM_DATA:
      const { Name, Teacher, Code, Subject_Teacher } = action.payload.inputData
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
      const { classData } = action.payload
      return _.assign({}, state, {
        classData
      })
    default:
      return state
  }
}

export default displayClassData
