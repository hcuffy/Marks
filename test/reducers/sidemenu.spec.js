import applyMenuStyling from '../../app/reducers/sidemenuReducer'
import { HANDLE_MENU_CHANGE } from '../../app/constants/actionTypes'

const initialLoadState = {
	home: '#1dbb90',
	classroom: '',
	students: '',
	exams: '',
	graphs: '',
	settings: ''
}

describe('test sidemenu reducer', () => {
	it('should use default state', () => {
		expect(applyMenuStyling(initialLoadState, {})).toMatchSnapshot()
	})

	it('should handle menu change', () => {
		const styleUpdate = {
			home: '',
			classroom: '',
			students: '#1dbb90',
			exams: '',
			graphs: '',
			settings: ''
		}
		const payload = { styleUpdate }
		expect(applyMenuStyling({}, { type: HANDLE_MENU_CHANGE, payload })).toMatchSnapshot()
	})
})
