import * as classroom from './classroomActions'
import * as subject from './subjectActions'
import * as exam from './examActions'
import * as student from './studentActions'
import * as grade from './gradeActions'
import * as sidemenu from './sidemenuActions'
import * as graph from './graphActions'
import * as notes from './notesActions'
import * as settings from './settingsActions'
import * as capability from './capabilityActions'

export const actionCreators = {
	changeClassroomTab: classroom.changeClassroomTab,
	handleClassData: classroom.handleClassData,
	displayClassData: classroom.displayClassData,
	roomModalDisplay: classroom.roomModalDisplay,
	deleteRoom: classroom.deleteRoom,
	updateRoom: classroom.updateRoom,
	openClassList: subject.openClassList,
	showSubject: subject.showSubject,
	addNewSubject: subject.addNewSubject,
	getSubjectData: subject.getSubjectData,
	updateSubject: subject.updateSubject,
	subjectModalDisplay: subject.subjectModalDisplay,
	deleteSingleSubject: subject.deleteSingleSubject,
	addNewExam: exam.addNewExam,
	getSelectedSubject: exam.getSelectedSubject,
	openClassDropdownList: exam.openClassDropdownList,
	displayExamData: exam.displayExamData,
	showSingleExam: exam.showSingleExam,
	deleteSingleExam: exam.deleteSingleExam,
	updateExam: exam.updateExam,
	addNewStudent: student.addNewStudent,
	getStudents: student.getStudents,
	showStudentModal: student.showStudentModal,
	openStudentGraph: student.openStudentGraph,
	openStudenSubjectGraph: student.openStudenSubjectGraph,
	deleteSingleStudent: student.deleteSingleStudent,
	updateStudent: student.updateStudent,
	displayGradeData: grade.displayGradeData,
	openGradeClassList: grade.openGradeClassList,
	updateGrade: grade.updateGrade,
	updateButtonStyle: sidemenu.updateButtonStyle,
	openGraphClassList: graph.openGraphClassList,
	displaySubjectGraph: graph.displaySubjectGraph,
	getAllGradeData: graph.getAllGradeData,
	getGraphExamData: graph.getGraphExamData,
	displayExamGraph: graph.displayExamGraph,
	saveSchoolAddress: settings.saveSchoolAddress,
	displayAddress: settings.displayAddress,
	updateSytemType: settings.updateGradingSystem,
	getGradingSystem: settings.getGradingSystem,
	addNote: notes.addNote,
	openStudentDropdown: notes.openStudentDropdown,
	getNotes: notes.getNotes,
	openNotesDropdown: notes.openNotesDropdown,
	updateTextArea: notes.updateTextArea,
	updateTitleField: notes.updateTitleField,
	deleteSingleNote: notes.deleteSingleNote,
	clearNoteField: notes.clearNoteField,
	updateNote: notes.updateNote,
	openCapabilityClassList: capability.openCapabilityClassList,
	openCapabilitySubjectList: capability.openCapabilitySubjectList
}
