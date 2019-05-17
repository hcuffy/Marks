import applyGraphData from '../../app/reducers/graphReducer'
import {
	OPEN_GRAPH_CLASS_LIST,
	GET_ALL_GRADES,
	DISPLAY_SUBJECT_GRADES,
	GET_ALL_EXAMS,
	DISPLAY_EXAM_GRADES
} from '../../app/constants/actionTypes'

const initialLoadState = {
	classroom: null,
	subjectName: null,
	examName: null,
	subjectId: null,
	examId: null,
	classroomDropdown: false,
	openSubList: false,
	openExamList: false,
	chartToDisplay: null,
	chartTitle: null
}

describe('test settings reducer', () => {
	it('should use default graph state', () => {
		expect(applyGraphData(initialLoadState, {})).toMatchSnapshot()
	})

	it('should display class graph', () => {
		const payload = {
			classroom: 'The Class',
			chartTitle: 'The Class',
			chartToDisplay: 'class'
		}

		expect(
			applyGraphData(initialLoadState, { type: OPEN_GRAPH_CLASS_LIST, payload })
		).toMatchSnapshot()
	})

	it('should display subject graph', () => {
		const payload = {
			subjectId: 'pokNxOkl32Ry2JHN',
			subjectName: 'Mathematics',
			chartTitle: 'Mathematics',
			chartToDisplay: 'subject'
		}
		expect(
			applyGraphData(initialLoadState, {
				type: DISPLAY_SUBJECT_GRADES,
				payload
			})
		).toMatchSnapshot()
	})

	it('should display exam graph', () => {
		const payload = {
			examId: '09jKxOrd32Ry2MHV',
			examName: 'Math Exam 1',
			chartTitle: 'Math Exam 1',
			chartToDisplay: 'exam'
		}

		expect(
			applyGraphData(initialLoadState, { type: DISPLAY_EXAM_GRADES, payload })
		).toMatchSnapshot()
	})

	it('should get all exams', () => {
		const payload = {
			exams: [
				{
					title: 'Exam 1',
					subjectId: 'pokNxOkl32Ry2JHN',

					date: '2019-01-10',
					weight: '1',
					_id: 'YXhj48EuUipWj9wW',
					createdAt: { $$date: 1554742311396 },
					updatedAt: { $$date: 1554742311396 }
				}, {
					title: 'Exam 2',
					subjectId: 'pokNxOkl32Ry2JHN',
					date: '2019-01-10',
					weight: '1',
					_id: 'hbcaDllgG2wFLT1Z',
					createdAt: { $$date: 1554442379899 },
					updatedAt: { $$date: 1544742379899 }
				}
			]
		}

		expect(
			applyGraphData(initialLoadState, { type: GET_ALL_EXAMS, payload })
		).toMatchSnapshot()
	})

	it('should get all grades', () => {
		const payload = {}

		expect(
			applyGraphData(initialLoadState, { type: GET_ALL_GRADES, payload })
		).toMatchSnapshot()
	})
})
