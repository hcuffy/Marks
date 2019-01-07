import { handleSchoolData, displaySchoolData } from './schoolActions'
import {
	roomModalDisplay,
	deleteRoom,
	updateRoom,
	updateSubject,
	subjectModalDisplay,
	deleteSingleSubject,
	deleteSingleExam,
	updateExam,
	deleteSingleStudent,
	updateStudent
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

import { addNewStudent, getStudents, showStudentModal } from './studentActions'
import { displayGradeData } from './gradeActions'

export const actionCreators = {
	handleSchoolData,
	displaySchoolData,
	changeClassroomTab,
	handleClassData,
	displayClassData,
	roomModalDisplay,
	deleteRoom,
	updateRoom,
	openClassList,
	showSubject,
	addNewSubject,
	getSubjectData,
	updateSubject,
	subjectModalDisplay,
	deleteSingleSubject,
	addNewExam,
	getSelectedSubject,
	openClassDropdownList,
	displayExamData,
	showSingleExam,
	deleteSingleExam,
	updateExam,
	addNewStudent,
	getStudents,
	showStudentModal,
	deleteSingleStudent,
	updateStudent,
	displayGradeData
}
