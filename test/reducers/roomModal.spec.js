import applyClassModal from '../../app/reducers/roomModalReducer'
import { OPEN_CLOSE_ROOM_MODAL, UPDATE_CLASSROOM } from '../../app/constants/actionTypes'

const initialLoadState = {
	id: '',
	showModal: false
}

describe('test room modal reducer', () => {
	it('should use default state', () => {
		expect(applyClassModal(initialLoadState, {})).toMatchSnapshot()
	})

	it('should open modal', () => {
		const payload = { id: 'umjHjOkl84Ry2kDH' }
		expect(
			applyClassModal(initialLoadState, { type: OPEN_CLOSE_ROOM_MODAL, payload })
		).toMatchSnapshot()
	})

	it('should close modal', () => {
		initialLoadState.showModal = true
		const payload = { id: 'umjHjOkl84Ry2kDH' }
		expect(
			applyClassModal(initialLoadState, { type: OPEN_CLOSE_ROOM_MODAL, payload })
		).toMatchSnapshot()
	})

	it('should update classroom', () => {
		const payload = { id: 'umjHjOkl84Ry2kDH' }
		expect(
			applyClassModal(initialLoadState, { type: UPDATE_CLASSROOM, payload })
		).toMatchSnapshot()
	})
})
