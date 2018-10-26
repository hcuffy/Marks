// @flow
import { CHANGE_CLASSROOM_TAB } from './actionTypes'

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
