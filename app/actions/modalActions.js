import { toast } from 'react-toastify'
import { DISPLAY_ROOM_MODAL } from './actionTypes'

export const handleClassData = event => async dispatch => {
  event.preventDefault()

  const classData = {
    Name: event.target.Name.value,
    Teacher: event.target.Teacher.value,
    Code: event.target.Code.value,
    Subject_Teacher: event.target.Subject_Teacher.value
  }

  dispatch({
    type: DISPLAY_ROOM_MODAL,
    payload: { classData }
  })
}
