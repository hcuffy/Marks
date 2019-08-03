/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import { spy } from 'sinon'
import * as actions from '../../app/component/graphs/actions'
import * as types from '../../app/component/graphs/constants'
import * as events from './mock_modules/eventMocks/graphActionEvents'

jest.mock('../../app/component/graphs/actions')

describe('test the graphs section actions', () => {
	it('should not open classroom dropdown', () => {
		const fn = actions.openGraphClassList(events.classDropdownInvalid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args).toHaveLength(0)
	})

	it('should open classroom dropdown', () => {
		const expectedAction = {
			type: types.OPEN_GRAPH_CLASS_LIST,
			payload: {
				chartTitle: 'Class 1',
				chartToDisplay: 'class',
				classroom: 'Class 1'
			}
		}
		const fn = actions.openGraphClassList(events.classDropdownValid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})

	it('should not subject dropdown', () => {
		const fn = actions.displaySubjectGraph(events.subjectDropdownInvalid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args).toHaveLength(0)
	})

	it('should open subject dropdown', () => {
		const expectedAction = {
			type: types.DISPLAY_SUBJECT_GRADES,
			payload: {
				chartTitle: 'Mathematics',
				chartToDisplay: 'subject',
				subjectId: 'DGM36hf84hN840e',
				subjectName: 'Mathematics'
			}
		}
		const fn = actions.displaySubjectGraph(events.subjectDropdownValid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})

	it('should not exam dropdown', () => {
		const fn = actions.displayExamGraph(events.examDropdownInvalid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args).toHaveLength(0)
	})

	it('should open exam dropdown', () => {
		const expectedAction = {
			type: types.DISPLAY_EXAM_GRADES,
			payload: {
				chartTitle: 'EXAM1',
				chartToDisplay: 'exam',
				examId: 'PHn7DjkMM38Hd',
				examName: 'EXAM1'
			}
		}
		const fn = actions.displayExamGraph(events.examDropdownValid)
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})

	it('should get all grades', done => {
		const expectedAction = {
			type: types.GET_ALL_GRADES,
			payload: {
				grades: [
					{
						_id: '2M2wgEZMgmJYJdnO',
						date: '2019-01-12',
						examId: '22E47DFF834fgDh',
						grade: '5',
						studentId: 'EySxHRVO4693O78I',
						weight: '1'
					}, {
						_id: '32E6MqxEfSjdQbQG',
						date: '2019-01-12',
						examId: 'U0FZu694y9oHQlxw',
						grade: '2',
						studentId: 'OJiwrhAP6aR0oR4h',
						weight: '1'
					}
				]
			}
		}
		const fn = actions.getAllGradeData()
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)

			done()
		})
	})

	it('should get all exams', done => {
		const expectedAction = {
			type: types.GET_ALL_EXAMS,
			payload: {
				exams: [
					{
						_id: '22E47DFF834fgDh',
						date: '2019-05-05',
						subjectId: 'DF347gfr834fnFe',
						title: 'Science',
						weight: '2'
					}
				]
			}
		}
		const fn = actions.getGraphExamData()
		const dispatch = spy()
		expect(fn).toBeInstanceOf(Function)
		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)

			done()
		})
	})
})
