import * as classroom from './classroomCollection'
import * as exam from './examCollection'
import * as grade from './gradeCollection'
import * as settings from './settingsCollection'
import * as student from './studentCollection'
import * as subject from './subjectCollection'

export const actionsOnDatabase = {
	addClassroomData: classroom.addClassroomData,
	getClassroomData: classroom.getClassroomData,
	deleteClassroom: classroom.deleteClassroom,
	updateRoomData: classroom.updateRoomData,
	updateSubjectArray: classroom.updateSubjectArray,
	updateClassSubjectArray: classroom.updateClassSubjectArray,
	addExamData: exam.addExamData,
	getExamData: exam.getExamData,
	deleteExam: exam.deleteExam,
	updateExamData: exam.updateExamData,
	updateGradeData: grade.updateGradeData,
	addGradeData: grade.addGradeData,
	getAllGrades: grade.getAllGrades,
	deleteAllStudentGrade: grade.deleteAllStudentGrade,
	saveGradeSystem: settings.addAddress,
	getAddressData: settings.addAddress,
	getSystemType: settings.addAddress,
	updateGradeType: settings.addAddress,
	addAddress: settings.addAddress,
	addNewStudentData: student.addNewStudentData,
	getAllStudents: student.getAllStudents,
	deleteStudent: student.deleteStudent,
	updateStudentData: student.updateStudentData,
	addSubjectData: subject.addSubjectData,
	getAllSubjects: subject.getAllSubjects,
	deleteSubject: subject.deleteSubject,
	updateSubjectData: subject.updateSubjectData,
	addExamToSubjectArray: subject.addExamToSubjectArray,
	updateSubjecTestsArray: subject.updateSubjecTestsArray
}
