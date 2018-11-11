import { handleSchoolData, displaySchoolData } from './schoolActions'
import { handleRoomData, removeRoom, updateRoom } from './modalActions'
import { changeClassroomTab, handleClassData, displayClassData } from './classroomActions'
import { openSubjectDropdown } from './subjectActions'

export const actionCreators = {
	handleSchoolData,
	displaySchoolData,
	changeClassroomTab,
	handleClassData,
	displayClassData,
	handleRoomData,
	removeRoom,
	updateRoom,
	openSubjectDropdown
}
