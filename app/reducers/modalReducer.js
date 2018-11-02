// @flow
import { DISPLAY_ROOM_MODAL } from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {
  Name: '',
  Teacher: '',
  Code: '',
  Subject_Teacher: '',
  showModal: false
}

const handleClassModal = (state = initialLoadState, action) => {
  switch (action.type) {
    case DISPLAY_ROOM_MODAL:
      const { Name, Teacher, Code, Subject_Teacher, showModal } = action.payload
      return _.assign({}, state, {
        Name,
        Teacher,
        Code,
        Subject_Teacher,
        showModal
      })
    default:
      return state
  }
}

export default handleClassModal
