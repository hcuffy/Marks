/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import { spy } from 'sinon'
import * as actions from '../../app/actions/settingsActions'
import * as types from '../../app/constants/actionTypes'
import * as events from './mock_modules/eventMocks/settingsActionEvents'

jest.mock('../../app/actions/settingsActions')

describe('exams actions', () => {
	it('should change the grading system to points', done => {
		const expectedAction = {
			type: types.UPDATE_GRADING_DATA,
			payload: {
				note: false,
				points: true,
				percent: false,
				title: 'Tester School',
				street: 'Riedenburger Str',
				province: 'Kelheim',
				country: 'Germany',
				zip: '93309',
				year: '2019'
			}
		}
		const fn = actions.updateGradingSystem(events.changeSystem)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)

			done()
		})
	})

	it('should get the grading system to type', done => {
		const expectedAction = {
			type: types.GET_SYSTEM_TYPE,
			payload: {
				note: true,
				points: false,
				percent: false,
				title: 'Tester School',
				street: 'Riedenburger Str',
				province: 'Kelheim',
				country: 'Germany',
				zip: '93309',
				year: '2019'
			}
		}
		const fn = actions.getGradingSystem()
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)

			done()
		})
	})

	it('should use default  grading system to type', done => {
		const expectedAction = {
			type: types.GET_SYSTEM_TYPE,
			payload: {
				note: true,
				points: false,
				percent: false,
				title: 'Tester School',
				street: 'Riedenburger Str',
				province: 'Kelheim',
				country: 'Germany',
				zip: '93309',
				year: '2019'
			}
		}
		const fn = actions.getGradingSystem()
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)

			done()
		})
	})

	it('should should save address', () => {
		const expectedAction = {
			type: types.HANDLE_SCHOOL_DATA,
			payload: {
				title: 'Saal School',
				street: 'Saal an der Donau',
				province: 'Kelheim',
				country: 'Germany',
				zip: '93336',
				year: '2020'
			}
		}
		const fn = actions.saveSchoolAddress(events.address)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})

	it('should get the address ', done => {
		const expectedAction = {
			type: types.DISPLAY_SCHOOL_DATA,
			payload: {
				note: true,
				points: false,
				percent: false,
				title: 'Tester School',
				street: 'Riedenburger Str',
				province: 'Kelheim',
				country: 'Germany',
				zip: '93309',
				year: '2019'
			}
		}
		const fn = actions.displayAddress()
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)

			done()
		})
	})
})
