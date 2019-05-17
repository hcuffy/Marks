/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import { spy } from 'sinon'
import * as actions from '../../app/actions/sidemenuActions'
import * as types from '../../app/constants/actionTypes'
import * as events from './mock_modules/eventMocks/sidemenuActionEvents'

jest.mock('../../app/actions/sidemenuActions')

describe('test the sidemenu actions', () => {
	it('should change menu background color', () => {
		const expectedAction = {
			type: types.HANDLE_MENU_CHANGE,
			payload: {
				styleUpdate: {
					home: '',
					classroom: '#1dbb90',
					students: '',
					exams: '',
					graphs: '',
					settings: ''
				}
			}
		}
		const fn = actions.updateButtonStyle(events.changeButtonColor)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})
})
