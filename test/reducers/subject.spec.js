import applyClassList, { applySubjectData } from '../../app/reducers/subjectReducer'
import {
	UPDATE_CLASS_LIST,
	GET_SINGLE_SUBJECT,
	GET_SUBJECT_LIST,
	ADD_NEW_SUBJECT
} from '../../app/constants/actionTypes'

const initialLoadState = {
	openModal: false,
	subject: null,
	name: 'name',
	abbreviation: 'abbreviation'
}

describe('test subject reducer', () => {
	it('should use default class state', () => {
		expect(applyClassList(initialLoadState, {})).toMatchSnapshot()
	})

	it('should update subject list', () => {
		const payload = 'Science'
		expect(
			applyClassList(initialLoadState, { type: UPDATE_CLASS_LIST, payload })
		).toMatchSnapshot()
	})

	it('should get sinlge subject', () => {
		const payload = 'Mathematics'
		expect(
			applyClassList(initialLoadState, { type: GET_SINGLE_SUBJECT, payload })
		).toMatchSnapshot()
	})

	it('should use default subject state', () => {
		expect(applyClassList(initialLoadState, {})).toMatchSnapshot()
	})

	it('should get subject list', () => {
		const data = [
			{
				name: 'Biology',
				abbreviation: 'BIO101',
				room: 'Room 2',
				tests: [],
				classroomId: 'qPtCHoVmf2Tbznji',
				_id: 'qGK99ne2xYjkW4cp',
				createdAt: { $$date: 1534404077665 },
				updatedAt: { $$date: 15544404096125 }
			}, {
				name: 'English',
				abbreviation: 'ENG101',
				room: 'Room 2',
				tests: [],
				classroomId: 'qPtCHnohVmf2Tbznji',
				_id: 'upGQBZVHHM4J1Tam',
				createdAt: { $$date: 1555383021646 },
				updatedAt: { $$date: 1553871237090 }
			}
		]
		const payload = { data }
		expect(
			applySubjectData(initialLoadState, { type: GET_SUBJECT_LIST, payload })
		).toMatchSnapshot()
	})

	it('should add new subject', () => {
		const data = [
			{
				name: 'Mathematics',
				abbreviation: 'MATH101',
				room: 'Room 2',
				tests: [],
				classroomId: 'qPtCHoVmf2Tbznji',
				_id: 'lpfC4fTZERCjwfNo',
				createdAt: { $$date: 1556465049016 },
				updatedAt: { $$date: 1556465049016 }
			}
		]
		const payload = { data }
		expect(
			applySubjectData(initialLoadState, { type: ADD_NEW_SUBJECT, payload })
		).toMatchSnapshot()
	})
})
