import { spy } from 'sinon'
import * as actions from '../../app/actions/classroomActions'
import * as types from '../../app/constants/actionTypes'
import * as events from './mock_modules/eventMocks/classroomActionEvents'

jest.mock('../../app/actions/classroomActions')

describe('classroom actions', () => {
	it('should change the classroom tab', () => {
		const expectedAction = {
			type: types.CHANGE_CLASSROOM_TAB,
			payload: { classTab: '', examTab: 'active' }
		}

		const fn = actions.changeClassroomTab(events.changeTab)
		const dispatch = spy()
		fn(dispatch)

		expect(fn).toBeInstanceOf(Function)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})

	it('should add new classrooms', done => {
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

		const fn = actions.handleClassData(events.newUser)
		const dispatch = spy()

		expect(fn).toBeInstanceOf(Function)

		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)
			done()
		})
	})
})
