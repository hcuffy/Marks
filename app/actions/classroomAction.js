// @flow
import { CHANGE_CLASSROOM_TAB } from './actionTypes'

function changeTab(tabTitle) {
  const newState = {}

  newState.subjectTab = tabTitle == 'Subjects'
  newState.testTab = tabTitle == 'Exams/Tests'
  newState.subjectIsActive = tabTitle == 'Subjects' ? 'Active' : ''
  newState.testIsActive = tabTitle == 'Exams/Tests' ? 'Active' : ''

  return newState
}

export const changeClassroomTab = event => {
  const clickedTabTitle = event.target.value
  const clickedTabState = event.target.className.split(' ')[1]

  if (clickedTabState !== 'active') {
    const tabState = changeTab(clickedTabTitle)
    return {
      type: CHANGE_CLASSROOM_TAB,
      payload: { tabStatus: tabState }
    }
  }
}
