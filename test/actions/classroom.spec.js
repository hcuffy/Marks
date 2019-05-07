import { spy } from 'sinon'
import * as actions from '../../app/actions/classroomActions'
import * as types from '../../app/constants/actionTypes'

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
	it('should add new classrooms', () => {
		const event = {
			target: {
				name: 'Biology',
				teacher: 'Sara Tester',
				code: 'BIO101',
				substitute: 'John Tester'
			}
		}
		const expectedAction = {
			type: types.ADD_CLASSROOM_DATA,
			payload: {
				inputData: [
					{
						name: 'Biology',
						teacher: 'Sara Tester',
						code: 'BIO101',
						substitute: 'John Tester'
					}
				]
			}
		}

		const fn = actions.handleClassData(event)
		const dispatch = spy()
		fn(dispatch)

		expect(fn).toBeInstanceOf(Function)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})
})
