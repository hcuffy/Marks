import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import applySchoolData from './schoolDataReducer'
import applyTabChange from './changeTabReducer'
import applyClassData from './classDataReducer'
import applyClassModal from './roomModalReducer'
import applySubjectModal from './subjectModalReducer'
import applyClassList, { applySubjectData } from './subjectReducer'
import applyFilteredExam from './examReducer'
import applyStudentData from './studentsReducer'
import applyGradeData from './gradeTableReducer'
import applyMenuStyling from './sidemenuReducer'
import applyGraphData from './graphReducer'

export default function createRootReducer(history: History) {
	return combineReducers({
		router: connectRouter(history),
		schoolData: applySchoolData,
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
		graphData: applyGraphData
	})
}
