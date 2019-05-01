import { handleSchoolReducer, applyGradeSystem } from '../../app/reducers/settingsReducer'
import {
	DISPLAY_SCHOOL_DATA,
	HANDLE_SCHOOL_DATA,
	UPDATE_GRADING_DATA,
	GET_SYSTEM_TYPE
} from '../../app/constants/actionTypes'

const initialLoadState = {
	title: null,
	street: null,
	province: null,
	country: null,
	zip: null,
	year: null
}

const gradingLoadState = { note: true, points: false, percent: false }

describe('test settings reducer', () => {
	it('should use default address state', () => {
		expect(handleSchoolReducer(initialLoadState, {})).toMatchSnapshot()
	})

	it('should handle address creation', () => {
		const payload = {
			title: "Mark's School",
			street: 'Tester Street',
			province: 'Regensburg',
			country: 'Germany',
			zip: '93309',
			year: 2019
		}

		expect(
			handleSchoolReducer(initialLoadState, { type: HANDLE_SCHOOL_DATA, payload })
		).toMatchSnapshot()
	})

	it('should use default grading state', () => {
		expect(applyGradeSystem(gradingLoadState, {})).toMatchSnapshot()
	})

	it('should update grading system', () => {
		const payload = { note: false, points: true, percent: false }
		expect(
			applyGradeSystem(gradingLoadState, { type: UPDATE_GRADING_DATA, payload })
		).toMatchSnapshot()
	})

	it('should get grading system type', () => {
		const payload = { note: false, points: false, percent: true }
		expect(
			applyGradeSystem(gradingLoadState, { type: GET_SYSTEM_TYPE, payload })
		).toMatchSnapshot()
	})

	it('should use default displayed address state', () => {
		expect(applyGradeSystem(initialLoadState, {})).toMatchSnapshot()
	})

	it('should update displayed address', () => {
		const payload = {
			title: 'Test School',
			street: 'Tester Street',
			province: 'Kelheim',
			country: 'Germany',
			zip: '93309',
			year: 2018
		}

		expect(
			applyGradeSystem(initialLoadState, { type: DISPLAY_SCHOOL_DATA, payload })
		).toMatchSnapshot()
	})
})
