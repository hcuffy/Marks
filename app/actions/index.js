import { handleSchoolData, displaySchoolData } from './schoolActions'
import {
	roomModalDisplay,
	removeRoom,
	updateRoom,
	updateSubject,
	subjectModalDisplay
} from './modalActions'
import { changeClassroomTab, handleClassData, displayClassData } from './classroomActions'
import {
	openClassList,
	showSubject,
	addNewSubject,
	getSubjectData
} from './subjectActions'

export const actionCreators = {
	handleSchoolData,
	displaySchoolData,
	changeClassroomTab,
	handleClassData,
	displayClassData,
	roomModalDisplay,
	removeRoom,
	updateRoom,
	openClassList,
	showSubject,
	addNewSubject,
	getSubjectData,
	updateSubject,
	subjectModalDisplay
}
