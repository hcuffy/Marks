/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import { spy } from 'sinon'
import * as actions from '../../app/actions/studentActions'
import * as types from '../../app/constants/actionTypes'
import * as events from './mock_modules/eventMocks/studentActionEvents'

jest.mock('../../app/actions/studentActions')

describe('test the student section actions', () => {
	it('should add new student', done => {
		const expectedActionOne = {
			type: types.ADD_NEW_STUDENT,
			payload: {}
		}
		const expectedActionTwo = {
			type: types.GET_ALL_STUDENTS,
			payload: {
				students: [
					{
						firstname: 'Tester ',
						lastname: 'Baumann',
						gender: 'male',
						classroom: 'Class 1'
					}
				]
			}
		}
		const fn = actions.addNewStudent(events.newStudent)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedActionOne)
			expect(dispatch.args[1][0]).toEqual(expectedActionTwo)
			done()
		})
	})

	it('should get all students', done => {
		const expectedAction = {
			type: types.GET_ALL_STUDENTS,
			payload: {
				students: [
					{
						firstname: 'Tester ',
						lastname: 'Baumann',
						gender: 'male',
						classroom: 'Class 1'
					}
				]
			}
		}
		const fn = actions.getStudents()
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)
			done()
		})
	})

	it('should show student dialog', () => {
		const expectedAction = {
			type: types.GET_SINGLE_STUDENT,
			payload: 'Dgerhe746dhDSh84'
		}
		const fn = actions.showStudentModal(events.showModal)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})

	it('should not display the student chart', () => {
		const fn = actions.openStudentGraph(events.studentDropdownInvalid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args).toHaveLength(0)
	})

	it('should display the student chart', () => {
		const expectedAction = {
			type: types.DISPLAY_STUDENT_GRAPH,
			payload: {
				chartToDisplay: 'student',
				studentGraphId: 'DF347gfr834fnFe',
				studentGraphName: 'John Tester'
			}
		}
		const fn = actions.openStudentGraph(events.studentDropdownValid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})

	it('should not display the subject chart', () => {
		const fn = actions.openStudentGraph(events.subjectDropdownInvalid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args).toHaveLength(0)
	})

	it('should display the subject chart', () => {
		const expectedAction = {
			type: types.DISPLAY_STUDENT_SUBJECT_GRAPH,
			payload: {
				chartToDisplay: 'subject',
				subjectGraphId: 'KlfdJ84nd6dGDf833',
				subjectGraphName: 'German'
			}
		}
		const fn = actions.openStudenSubjectGraph(events.subjectDropdownValid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})

	it('should update student data', done => {
		const expectedActionOne = {
			type: types.GET_SINGLE_STUDENT,
			payload: 'JB4874hdfsjd845e'
		}
		const expectedActionTwo = {
			type: types.GET_ALL_STUDENTS,
			payload: {
				students: [
					{
						classroom: 'Class 1',
						firstname: 'Tester',
						gender: 'female',
						id: 'JB4874hdfsjd845e',
						lastname: 'Blaumann'
					}
				]
			}
		}
		const fn = actions.updateStudent(events.updateStudent)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedActionOne)
			expect(dispatch.args[1][0]).toEqual(expectedActionTwo)
			done()
		})
	})

	it('should delete student data', done => {
		const expectedActionOne = {
			type: types.GET_SINGLE_STUDENT,
			payload: 'JB4874hdfsjd845e'
		}
		const expectedActionTwo = {
			type: types.GET_ALL_STUDENTS,
			payload: {
				students: [{}]
			}
		}
		const fn = actions.deleteSingleStudent(events.deleteStudent)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedActionOne)
			expect(dispatch.args[1][0]).toEqual(expectedActionTwo)
			done()
		})
	})
})
