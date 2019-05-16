/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import { spy } from 'sinon'
import * as actions from '../../app/actions/subjectActions'
import * as types from '../../app/constants/actionTypes'
import * as events from './mock_modules/eventMocks/subjectActionEvents'

jest.mock('../../app/actions/subjectActions')

describe('test the subject section actions', () => {
	it('should not open the class dropdown', () => {
		const fn = actions.openClassList(events.classroomDropdownInvalid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args).toHaveLength(0)
	})
	it('should open the class dropdown', () => {
		const expectedAction = {
			type: types.UPDATE_CLASS_LIST,
			payload: 'Class 2'
		}
		const fn = actions.openClassList(events.classroomDropdownValid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})
	it('should add new student', done => {
		const expectedAction = {
			type: types.ADD_NEW_SUBJECT,
			payload: { data: [{ abbreviation: 'ENG101', name: 'English', room: 'Class 1' }] }
		}
		const fn = actions.addNewSubject(events.newSubject)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)
			done()
		})
	})
	it('should get all subjects', done => {
		const expectedAction = {
			type: types.GET_SUBJECT_LIST,
			payload: { data: [{ abbreviation: 'ENG101', name: 'English', room: 'Class 1' }] }
		}
		const fn = actions.getSubjectData()
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)
			done()
		})
	})
	it('should get single subject', () => {
		const expectedAction = {
			type: types.GET_SINGLE_SUBJECT,
			payload: 'German'
		}
		const fn = actions.showSubject(events.singleSubject)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})
	it('should show subject dialog', () => {
		const expectedAction = {
			type: types.OPEN_CLOSE_SUBJECT_MODAL,
			payload: {
				id: 'jfMn575HFbnsj394'
			}
		}
		const fn = actions.subjectModalDisplay(events.showModal)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})

	it('should delete subject data', done => {
		const expectedActionOne = {
			type: types.OPEN_CLOSE_SUBJECT_MODAL,
			payload: { id: 'jfMn575HFbnsj394' }
		}
		const expectedActionTwo = {
			type: types.GET_SUBJECT_LIST,
			payload: {
				data: [{}]
			}
		}
		const fn = actions.deleteSingleSubject(events.deleteSubject)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedActionOne)
			expect(dispatch.args[1][0]).toEqual(expectedActionTwo)
			done()
		})
	})

	it('should update subject data', done => {
		const expectedActionOne = {
			type: types.OPEN_CLOSE_SUBJECT_MODAL,
			payload: { id: 'DGfh5475bnf854hfgrf' }
		}
		const expectedActionTwo = {
			type: types.GET_SINGLE_SUBJECT,
			payload: 'Class 1'
		}
		const expectedActionThree = {
			type: types.GET_SUBJECT_LIST,
			payload: { data: [{ abbreviation: 'ENG101', name: 'English', room: 'Class 1' }] }
		}
		const fn = actions.updateSubject(events.updateSubject)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedActionOne)
			expect(dispatch.args[1][0]).toEqual(expectedActionTwo)
			expect(dispatch.args[2][0]).toEqual(expectedActionThree)
			done()
		})
	})
})
