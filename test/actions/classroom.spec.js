import { spy } from 'sinon'
import * as React from 'react'
import { changeClassroomTab } from '../../app/actions/classroomActions'
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
		const fn = changeClassroomTab(event)
		expect(fn).toBeInstanceOf(Function)
		const dispatch = spy()
		fn(dispatch)

		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})
})
