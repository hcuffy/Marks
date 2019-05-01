import applyGradeData from '../../app/reducers/gradeTableReducer'
import {
	DISPLAY_EXAM_TABLE,
	OPEN_CLASS_LIST,
	UPDATE_EXAM_TABLE
} from '../../app/constants/actionTypes'

const initialLoadState = {
	classroom: null,
	subjectName: null,
	classroomDropdown: false,
	subDrop: false
}

const subjectData = {
	subjectName: 'Biology',
	classroom: 'Class 2',
	subjectId: 'dh667zZh748JnNn'
}

const exams = [
	{
		title: 'BIO EXAM',
		subjectId: 'dh667zZh748JnNn',
		date: '11/11/2019',
		weight: 1,
		_id: 'ueeNxOkl32Ry2kGF',
		createdAt: { $$date: 1543663446602 },
		updatedAt: { $$date: 1543663446602 }
	}
]

const grades = [
	{
		grade: 3,
		examId: 'ueeNxOkl32Ry2kGF',
		studentId: 'kkhNH7HNFDCvR5R',
		date: '11/11/2019',
		weight: 1,
		_id: 'zupNxOkl87RyKLMJ',
		createdAt: { $$date: 1543663876602 },
		updatedAt: { $$date: 1543663876602 }
	}
]

describe('test grade table reducer', () => {
	it('should use initial state', () => {
		expect(applyGradeData(initialLoadState, {})).toMatchSnapshot()
	})

	it('should handle DISPLAY_EXAM_TABLE', () => {
		expect(
			applyGradeData(
				{ ...initialLoadState },
				{ type: DISPLAY_EXAM_TABLE, payload: { subjectData, exams, grades } }
			)
		).toMatchSnapshot()
	})

	it('should handle OPEN_CLASS_LIST', () => {
		expect(
			applyGradeData(
				{ ...initialLoadState },
				{ type: OPEN_CLASS_LIST, payload: subjectData.classroom }
			)
		).toMatchSnapshot()
	})

	it('should handle UPDATE_EXAM_TABLE', () => {
		expect(
			applyGradeData(
				{ ...initialLoadState },
				{ type: UPDATE_EXAM_TABLE, payload: { exams, grades } }
			)
		).toMatchSnapshot()
	})
})
