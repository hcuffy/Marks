// @flow
import { toast } from 'react-toastify'
import { CHANGE_CLASSROOM_TAB, ADD_CLASSROOM_DATA } from './actionTypes'
import {
  addClassroomData,
  getClassroomData
} from '../database/classroomCollection'

function changeTab(tabTitle) {
  const newState = {}

  newState.classTab = tabTitle == 'Classes'
  newState.testTab = tabTitle == 'Exams/Tests'
  newState.subjectClass = tabTitle == 'Classes' ? 'active' : ''
  newState.testClass = tabTitle == 'Exams/Tests' ? 'active' : ''

  return newState
}

export const changeClassroomTab = event => {
  const clickedTabTitle = event.target.text
  const clickedTabState = event.target.className.split(' ')[1]

  if (clickedTabState !== 'active') {
    const tabState = changeTab(clickedTabTitle)
    return {
      type: CHANGE_CLASSROOM_TAB,
      payload: { tabState }
    }
  }
  return {
    type: '',
    payload: {}
  }
}

export const handleClassData = event => {
  event.preventDefault()

  const formData = {
    Name: event.target.Name.value,
    Teacher: event.target.Teacher.value,
    Code: event.target.Code.value,
    Subject_Teacher: event.target.Subject_Teacher.value
  }

  addClassroomData(formData)

  return {
    type: ADD_CLASSROOM_DATA,
    payload: { classData: formData }
  }
}

export const displayClassData = () => async dispatch => {
  const data = await getClassroomData()
  if (data.length !== 0) {
    dispatch({
      type: DISPLAY_SCHOOL_DATA,
      payload: { schoolData: data }
    })
  }
}
