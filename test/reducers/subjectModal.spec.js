import applySubjectModal from '../../app/reducers/subjectModalReducer'
import { OPEN_CLOSE_SUBJECT_MODAL, UPDATE_SUBJECT } from '../../app/constants/actionTypes'

const initialLoadState = {
	id: '',
	showSubjectModal: false
}

describe('test subject modal reducer', () => {
	it('should use default subject modal state', () => {
		expect(applySubjectModal(initialLoadState, {})).toMatchSnapshot()
	})

	it('should open subject modal', () => {
		const payload = { id: 'L0EWvgOlqFDKYrVs' }
		expect(
			applySubjectModal(initialLoadState, { type: OPEN_CLOSE_SUBJECT_MODAL, payload })
		).toMatchSnapshot()
	})

	it('should close subject modal', () => {
		initialLoadState.showSubjectModal = true
		const payload = { id: 'L0EWvgOlqFDKYrVs' }
		expect(
			applySubjectModal(initialLoadState, { type: OPEN_CLOSE_SUBJECT_MODAL, payload })
		).toMatchSnapshot()
	})

	it('should update subject modal', () => {
		initialLoadState.showSubjectModal = true
		const payload = { id: 'L0EWvgOlqFDKYrVs' }
		expect(
			applySubjectModal(initialLoadState, { type: UPDATE_SUBJECT, payload })
		).toMatchSnapshot()
	})
})
