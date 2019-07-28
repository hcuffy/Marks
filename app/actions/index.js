import * as classroom from '../components/rooms/actions'
import * as subject from '../components/subject/actions'
import * as exam from '../components/exam/actions'
import * as student from '../components/students/actions'
import * as grade from '../components/grades/actions'
import * as sidemenu from '../components/sidemenu/actions'
import * as graph from '../components/graphs/actions'
import * as notes from '../components/notes/actions'
import * as settings from '../components/settings/actions'

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
	updateNote: notes.updateNote
}
