import { spy } from 'sinon'
import * as actions from '../../app/actions/classroomActions'
import * as types from '../../app/constants/ActionTypes'

jest.mock('../../app/actions/classroomActions')

describe('classroom actions', () => {
	it('should create change classroom tab action', () => {
		const event = {
			target: 'examTab'
		}
		const expectedAction = {
			type: types.CHANGE_CLASSROOM_TAB,
			payload: { classTab: '', examTab: 'active' }
		}

		const fn = actions.changeClassroomTab(event)
		const dispatch = spy()
		fn(dispatch)

		expect(fn).toBeInstanceOf(Function)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})
})
