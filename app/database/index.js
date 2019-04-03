import * as classroom from './classroomCollection'
import * as exam from './examCollection'
import * as subject from './gradeCollection'
import * as settings from './settingsCollection'
import * as student from './studentCollection'
import * as subject from './subjectCollection'

export const actionsOnDatabase = {
	addClassroomData: classroom.addClassroomData,
	getClassroomData: classroom.getClassroomData,
	deleteClassroom: classroom.deleteClassroom,
	updateRoomData: classroom.updateRoomData,
	updateSubjectArray: classroom.updateSubjectArray,
	updateClassSubjectArray: classroom.updateClassSubjectArray
}
