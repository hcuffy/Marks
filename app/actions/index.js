import { handleSchoolData, displaySchoolData } from './schoolActions'
import {
	roomModalDisplay,
	removeRoom,
	updateRoom,
	updateSubject,
	subjectModalDisplay,
	removeSubject,
	removeSingleExam,
	updateExam
} from './modalActions'
import { changeClassroomTab, handleClassData, displayClassData } from './classroomActions'
import {
	openClassList,
	showSubject,
	addNewSubject,
	getSubjectData
} from './subjectActions'
import {
	addNewExam,
	getSelectedSubject,
	openClassDropdownList,
	displayExamData,
	showSingleExam
} from './examActions'

import { addNewStudent, getStudents } from './studentActions'

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
	subjectModalDisplay,
	removeSubject,
	addNewExam,
	getSelectedSubject,
	openClassDropdownList,
	displayExamData,
	showSingleExam,
	removeSingleExam,
	updateExam,
	addNewStudent,
	getStudents
}
