import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import applyAddressData, { applyGradeSystem } from './settings'
import applyTabChange from './changeTab'
import applyClassData from './classData'
import applyClassModal from './roomModal'
import applySubjectModal from './subjectModal'
import applyClassList, { applySubjectData } from './subject'
import applyFilteredExam from './exam'
import applyStudentData from './students'
import applyGradeData from './gradeTable'
import applyMenuStyling from './sidemenu'
import applyGraphData from './graph'
import applyNotesData from './notes'

export default function createRootReducer(history: History) {
	return combineReducers({
		router: connectRouter(history),
		addressData: applyAddressData,
		settingData: applyGradeSystem,
		classData: applyClassData,
		subjectData: applySubjectData,
		studentData: applyStudentData,
		examData: applyFilteredExam,
		classListData: applyClassList,
		tabChangeData: applyTabChange,
		classModalData: applyClassModal,
		subjectModalData: applySubjectModal,
		menuStylingData: applyMenuStyling,
		gradeData: applyGradeData,
		graphData: applyGraphData,
		notesData: applyNotesData
	})
}
