// @flow
import { ADD_CLASSROOM_DATA, GET_CLASSROOM_DATA } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {
  Name: '',
  Teacher: '',
  Code: '',
  Subject_Teacher: '',
  classData: [{ Name: '', Subjects: [] }],
  Check: false
}

const displayClassData = (state = initialLoadState, action) => {
  console.log(state)
  switch (action.type) {
    case ADD_CLASSROOM_DATA:
      return _.assign({}, state, {
        Name: '',
        Teacher: '',
        Code: '',
        Subject_Teacher: '',
        Check: true
      })
    case GET_CLASSROOM_DATA:
      const { classData } = action.payload
      return _.assign({}, state, {
        classData,
        Check: false
      })
    default:
      return state
  }
}

export default displayClassData
