/* eslint-disable max-len */
import applyFilteredExam from '../../app/reducers/exam'
import {
	GET_SELECTED_CLASS,
	UPDATE_DROPDOWN_CLASS_LIST,
	DISPLAY_SUBJECT_LIST,
	GET_SINGLE_EXAM,
	UPDATE_EXAMS_LIST
} from '../../app/components/exam/constants'

const initialLoadState = {
	subject: '',
	openClassDropdown: false,
	openSubList: false,
	selectedRoom: null,
	selectedSubject: null,
	examModal: false
}

const testData = {
	subject: 'Biology',
	classroom: 'Class 2',
	examId: '4rbNx3kl32Ry2kHF',
	subjectId: 'dh667zZh748JnNn'
}

const examData = [
	{
		title: 'BIO EXAM',
		subjectId: 'dh667zZh748JnNn',
		date: '11/11/2019',
		weight: 1,
		_id: 'ueeNxOkl32Ry2kGF',
		createdAt: { $$date: 1543663446602 },
		updatedAt: { $$date: 1548254413049 }
	}
]

describe('test exam reducer', () => {
	it('should use initial state', () => {
		expect(applyFilteredExam(initialLoadState, {})).toMatchSnapshot()
	})

	it('should handle GET_SELECTED_CLASS', () => {
		expect(
			applyFilteredExam({}, { type: GET_SELECTED_CLASS, payload: testData.subject })
		).toMatchSnapshot()
	})

	it('should handle UPDATE_DROPDOWN_CLASS_LIST', () => {
		expect(
			applyFilteredExam(initialLoadState, {
				type: UPDATE_DROPDOWN_CLASS_LIST,
				payload: testData.classroom
			})
		).toMatchSnapshot()
	})

	it('should handle GET_SINGLE_EXAM', () => {
		expect(
			applyFilteredExam(initialLoadState, {
				type: GET_SINGLE_EXAM,
				payload: testData.examId
			})
		).toMatchSnapshot()
	})

	it('should handle DISPLAY_SUBJECT_LIST', () => {
		expect(
			applyFilteredExam(initialLoadState, {
				type: DISPLAY_SUBJECT_LIST,
				payload: {
					selectedSubject: testData.subject,
					subjectId: testData.subjectId,
					exams: examData
				}
			})
		).toMatchSnapshot()
	})

	it('should handle UPDATE_EXAMS_LIST', () => {
		expect(
			applyFilteredExam(initialLoadState, {
				type: UPDATE_EXAMS_LIST,
				payload: {
					exams: examData
				}
			})
		).toMatchSnapshot()
	})
})
