import { handleSchoolData, displaySchoolData } from './schoolActions'
import { handleRoomData, removeRoom } from './modalActions'
import { changeClassroomTab, handleClassData, displayClassData } from './classroomActions'

export const actionCreators = {
	handleSchoolData,
	displaySchoolData,
	changeClassroomTab,
	handleClassData,
	displayClassData,
	handleRoomData,
	removeRoom
}
