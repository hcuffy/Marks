import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import {
	applyAddressData,
	applyGradeSystem
} from '../components/settings/reducers'
import {
	applyTabChange,
	applyClassData,
	applyClassModal
} from '../components/rooms/reducers'
import {
	applyClassList,
	applySubjectData,
	applySubjectModal
} from '../components/subject/reducers'
import applyFilteredExam from '../components/exam/reducer'
import { applyStudentData } from '../components/students/reducers'
import applyGradeData from '../components/grades/reducer'
import { applyMenuStyling } from '../components/sidemenu/reducers'
import { applyGraphData } from '../components/graphs/reducers'
import { applyNotesData } from '../components/notes/reducers'
import applyCapabilityChanges from '../components/capability/reducer'

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
		notesData: applyNotesData,
		capabilityData: applyCapabilityChanges
	})
}
