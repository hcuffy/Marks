/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import { spy } from 'sinon'
import * as actions from '../../app/actions/examActions'
import * as types from '../../app/constants/actionTypes'
import * as events from './mock_modules/eventMocks/examActionEvents'

jest.mock('../../app/actions/examActions')

describe('exams actions', () => {
	it('should add a new exam', () => {
		const expectedAction = {
			type: types.ADD_NEW_EXAM,
			payload: {}
		}
		const fn = actions.addNewExam(events.addExam)
		const dispatch = spy()
		fn(dispatch)
		expect(fn).toBeInstanceOf(Function)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})
	it('should get subject for drop down', () => {
		const expectedActionOne = {
			type: types.GET_SELECTED_CLASS,
			payload: {
				subject: 'Biology',
				id: 'DF347gfr834fnFe'
			}
		}
		const fn = actions.getSelectedSubject(events.displaySubject)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedActionOne)
	})
	it('should not open classroom dropdown', () => {
		const fn = actions.openClassDropdownList(events.classDropdownInvalid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args).toHaveLength(0)
	})
	it('should open classroom dropdown', () => {
		const expectedActionOne = {
			type: types.UPDATE_DROPDOWN_CLASS_LIST,
			payload: 'Class 1'
		}
		const fn = actions.openClassDropdownList(events.classDropdownValid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedActionOne)
	})
	it('should not open subject dropdown', done => {
		const fn = actions.displayExamData(events.subjectDropdownInvalid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		fn(dispatch).then(() => {
			expect(dispatch.args).toHaveLength(0)
			done()
		})
	})
	it('should open subject dropdown', done => {
		const expectedAction = {
			type: types.DISPLAY_SUBJECT_LIST,
			payload: {
				exams: [
					{
						title: 'Science',
						date: '2019-05-05',
						weight: '2',
						_id: '22E47DFF834fgDh',
						subjectId: 'DF347gfr834fnFe'
					}
				],
				selectedSubject: 'Science',
				subjectId: 'DF347gfr834fnFe'
			}
		}
		const fn = actions.displayExamData(events.subjectDropdownValid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)
			done()
		})
	})

	it('should show single exam', () => {
		const expectedActionOne = {
			type: types.GET_SINGLE_EXAM,
			payload: 'FBnf7gfr834hf6g'
		}
		const fn = actions.showSingleExam(events.singleExam)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedActionOne)
	})

	it('should update the exam data', done => {
		const expectedActionOne = {
			type: types.GET_SINGLE_EXAM,
			payload: 'DF347gfr834fnFe'
		}
		const expectedActionTwo = {
			type: types.UPDATE_EXAMS_LIST,
			payload: [
				{
					title: 'Biology',
					date: '2019-06-03',
					weight: '1'
				}
			]
		}
		const fn = actions.updateExam(events.updateExam)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedActionOne)
			expect(dispatch.args[1][0]).toEqual(expectedActionTwo)
			done()
		})
	})

	it('should delete a single exam', done => {
		const expectedActionOne = {
			type: types.GET_SINGLE_EXAM,
			payload: 'DF347gfr834fnFe'
		}
		const expectedActionTwo = {
			type: types.UPDATE_EXAMS_LIST,
			payload: [
				{
					title: 'German',
					date: '2019-01-02',
					weight: '1'
				}
			]
		}
		const fn = actions.deleteSingleExam(events.deleteExam)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedActionOne)
			expect(dispatch.args[1][0]).toEqual(expectedActionTwo)
			done()
		})
	})
})
