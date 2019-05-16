/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import { spy } from 'sinon'
import * as actions from '../../app/actions/gradeActions'
import * as types from '../../app/constants/actionTypes'
import * as events from './mock_modules/eventMocks/examActionEvents'
import { updateGrade, updateGradeNull } from './mock_modules/eventMocks/gradeActionEvents'

jest.mock('../../app/actions/gradeActions')

describe('test the grade section actions', () => {
	it('should not open classroom dropdown', () => {
		const fn = actions.openGradeClassList(events.classDropdownInvalid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args).toHaveLength(0)
	})

	it('should open classroom dropdown', () => {
		const expectedAction = {
			type: types.OPEN_CLASS_LIST,
			payload: 'Class 1'
		}
		const fn = actions.openGradeClassList(events.classDropdownValid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})

	it('should not display grade data', () => {
		const fn = actions.openGradeClassList(events.subjectDropdownInvalid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args).toHaveLength(0)
	})

	it('should display grade data', done => {
		const expectedAction = {
			type: types.DISPLAY_EXAM_TABLE,
			payload: {
				exams: [
					{
						_id: '22E47DFF834fgDh',
						date: '2019-05-05',
						subjectId: 'DF347gfr834fnFe',
						title: 'Science',
						weight: '2'
					}
				],
				grades: [
					{
						_id: '2M2wgEZMgmJYJdnO',
						date: '2019-01-12',
						examId: '22E47DFF834fgDh',
						grade: '5',
						studentId: 'EySxHRVO4693O78I',
						weight: '1'
					}
				],
				subjectData: { subjectId: 'DF347gfr834fnFe', subjectName: 'Science' }
			}
		}
		const fn = actions.displayGradeData(events.subjectDropdownValid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)
			done()
		})
	})

	it('should upgrade grade', done => {
		const expectedAction = {
			type: types.UPDATE_EXAM_TABLE,
			payload: {
				exams: [
					{
						_id: '22E47DFF834fgDh',
						date: '2019-05-05',
						subjectId: 'DF347gfr834fnFe',
						title: 'Science',
						weight: '2'
					}
				],
				grades: [
					{
						_id: '2M2wgEZMgmJYJdnO',
						date: '2019-01-12',
						examId: '22E47DFF834fgDh',
						grade: '5',
						studentId: 'EySxHRVO4693O78I',
						weight: '1'
					}
				]
			}
		}

		const fn = actions.updateGrade(updateGrade)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)

			done()
		})
	})
	it('should add grade if grade ID is null', done => {
		const expectedAction = {
			type: types.UPDATE_EXAM_TABLE,
			payload: {
				exams: [
					{
						_id: '22E47DFF834fgDh',
						date: '2019-05-05',
						subjectId: 'DF347gfr834fnFe',
						title: 'Science',
						weight: '2'
					}
				],
				grades: [
					{
						_id: '2M2wgEZMgmJYJdnO',
						date: '2019-01-12',
						examId: '22E47DFF834fgDh',
						grade: '5',
						studentId: 'EySxHRVO4693O78I',
						weight: '1'
					}
				]
			}
		}

		const fn = actions.updateGrade(updateGradeNull)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)

			done()
		})
	})
})
