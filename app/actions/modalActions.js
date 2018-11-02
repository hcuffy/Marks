import { toast } from 'react-toastify'
import { DISPLAY_ROOM_MODAL } from './actionTypes'

export const handleRoomData = event => {
  event.preventDefault()
  const classData = {
    id: event.target.id
  }

  classData.showModal = true
  console.log(classData)
  return {
    type: DISPLAY_ROOM_MODAL,
    payload: classData
  }
}
