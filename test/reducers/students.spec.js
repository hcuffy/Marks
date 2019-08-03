/* eslint-disable max-len */
import applyStudentData from '../../app/reducers/students'
import {
	ADD_NEW_STUDENT,
	GET_ALL_STUDENTS,
	GET_SINGLE_STUDENT,
	DISPLAY_STUDENT_GRAPH,
	DISPLAY_STUDENT_SUBJECT_GRAPH
} from '../../app/components/students/constants'

const initialLoadState = {
	firstname: '',
	lastname: '',
	studentModal: false,
	studentDropdown: false,
	subjectDropdown: false,
	studentGraphId: null,
	chartToDisplay: null,
	studentGraphName: null,
	subjectGraphName: null
}

describe('test student reducer', () => {
	it('should use default state', () => {
		expect(applyStudentData(initialLoadState, {})).toMatchSnapshot()
	})

	it('should add new student', () => {
		expect(
			applyStudentData(initialLoadState, { type: ADD_NEW_STUDENT, payload: {} })
		).toMatchSnapshot()
	})

	it('should get all students', () => {
		const students = [
			{
				firstname: 'John',
				lastname: 'Tester',
				gender: 'male',
				classroom: 'Class 2',
				_id: 'EySxHRVO4693O78I',
				createdAt: { $$date: 1556364347040 },
				updatedAt: { $$date: 1556515640626 }
			}, {
				firstname: 'Jane',
				lastname: 'Tester',
				gender: 'female',
				classroom: 'Class 2',
				_id: 'zHDJF8nohVmf2Trurjh',
				createdAt: { $$date: 1556364347040 },
				updatedAt: { $$date: 1556515640626 }
			}
		]
		const payload = { students }
		expect(
			applyStudentData(initialLoadState, { type: GET_ALL_STUDENTS, payload })
		).toMatchSnapshot()
	})

	it('should get single student', () => {
		const payload = 'EySxHRVO4693O78I'
		expect(
			applyStudentData(initialLoadState, { type: GET_SINGLE_STUDENT, payload })
		).toMatchSnapshot()
	})

	it('should display student graph', () => {
		const payload = {
			studentGraphId: 'EySxHRVO4693O78I',
			studentGraphName: 'John Tester',
			chartToDisplay: 'student'
		}
		expect(
			applyStudentData(initialLoadState, {
				type: DISPLAY_STUDENT_GRAPH,
				payload
			})
		).toMatchSnapshot()
	})

	it("should display student's subject graph", () => {
		const payload = {
			subjectGraphId: 'qPtCHoVmf2Tbznji',
			subjectGraphName: 'Biology',
			chartToDisplay: 'subject'
		}

		expect(
			applyStudentData(initialLoadState, {
				type: DISPLAY_STUDENT_SUBJECT_GRAPH,
				payload
			})
		).toMatchSnapshot()
	})
})
