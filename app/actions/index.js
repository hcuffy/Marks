import { handleSchoolData, displaySchoolData } from './schoolActions'
import { handleRoomData, removeRoom, updateRoom } from './modalActions'
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
	handleRoomData,
	removeRoom,
	updateRoom,
	openClassList,
	showSubject,
	addNewSubject,
	getSubjectData
}
