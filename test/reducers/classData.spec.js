/* eslint-disable max-len */
import applyTabChange from '../../app/reducers/changeTabReducer'
import { ADD_CLASSROOM_DATA, GET_CLASSROOM_DATA } from '../../app/constants/actionTypes'

const initialLoadState = {
	name: '',
	teacher: '',
	code: '',
	substitute: '',
	classData: [{ name: '', subjects: [] }],
	check: false
}

const payload = [
	{
		name: 'Classroom 1',
		teacher: 'Sara Smith',
		code: "Sara's Class",
		substitute: 'John Smith',
		subjects: ['MATH 101',
			'MATH 101',
			'BIO 101'],
		_id: 'ubbNxOkl32Ry2kJB',
		createdAt: { $$date: 1543665946602 },
		updatedAt: { $$date: 1548259313049 }
	}
]

describe('test class data reducer', () => {
	it('should use initial state', () => {
		expect(applyTabChange(initialLoadState, {})).toMatchSnapshot()
	})

	it('should handle ADD_CLASSROOM_DATA', () => {
		expect(
			applyTabChange({}, { type: ADD_CLASSROOM_DATA, initialLoadState })
		).toMatchSnapshot()
	})

	it('should handle GET_CLASSROOM_DATA', () => {
		expect(
			applyTabChange({ check: false }, { type: GET_CLASSROOM_DATA, payload })
		).toMatchSnapshot()
	})

	it('should handle unknown action type', () => {
		expect(applyTabChange({}, { type: 'unknown', payload })).toMatchSnapshot()
	})
})
