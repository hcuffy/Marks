import * as school from './schoolActions'
import * as modals from './modalActions'
import * as classroom from './classroomActions'
import * as subject from './subjectActions'
import * as exam from './examActions'
import * as student from './studentActions'
import * as grade from './gradeActions'
import * as sidemenu from './sidemenuActions'
import * as graph from './graphActions'

export const actionCreators = {
	handleSchoolData: school.handleSchoolData,
	displaySchoolData: school.displaySchoolData,
	changeClassroomTab: classroom.changeClassroomTab,
	handleClassData: classroom.handleClassData,
	displayClassData: classroom.displayClassData,
	roomModalDisplay: modals.roomModalDisplay,
	deleteRoom: modals.deleteRoom,
	updateRoom: modals.updateRoom,
	openClassList: subject.openClassList,
	showSubject: subject.showSubject,
	addNewSubject: subject.addNewSubject,
	getSubjectData: subject.getSubjectData,
	updateSubject: modals.updateSubject,
	subjectModalDisplay: modals.subjectModalDisplay,
	deleteSingleSubject: modals.deleteSingleSubject,
	addNewExam: exam.addNewExam,
	getSelectedSubject: exam.getSelectedSubject,
	openClassDropdownList: exam.openClassDropdownList,
	displayExamData: exam.displayExamData,
	showSingleExam: exam.showSingleExam,
	deleteSingleExam: modals.deleteSingleExam,
	updateExam: modals.updateExam,
	addNewStudent: student.addNewStudent,
	getStudents: student.getStudents,
	showStudentModal: student.showStudentModal,
	deleteSingleStudent: modals.deleteSingleStudent,
	updateStudent: modals.updateStudent,
	displayGradeData: grade.displayGradeData,
	openGradeClassList: grade.openGradeClassList,
	updateGrade: grade.updateGrade,
	updateButtonStyle: sidemenu.updateButtonStyle,
	openGraphClassList: graph.openGraphClassList,
	displayClassGraph: graph.displayClassGraph,
	getAllGradeData: graph.getAllGradeData
}
