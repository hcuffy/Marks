import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { cleanAndFilterData } from '../rooms/RoomModal'
import { modalFrame } from '../helpers/editModal'
import generateFields from './helpers/modalHelper'

const ExamModal = ({ examModal, examId, exams, subjectId, actions }) => {
	const requiredExam = cleanAndFilterData(exams, { id: examId })
	const examFormData = generateFields(requiredExam)
	const hiddenInputs = (
		<div>
			<input type="hidden" name="SubjectId" data-id={subjectId} />
			<input type="hidden" name="ExamId" data-id={examId} />
		</div>
	)
	const footerData = {
		dataId: examId,
		nameId: subjectId,
		closeId: null,
		deleteAction: actions.deleteSingleExam,
		closeAction: actions.showSingleExam
	}
	return (
		<div>
			{/* eslint-disable-next-line max-len */}
			{modalFrame(examModal, actions.updateExam, examFormData, hiddenInputs, footerData)}
		</div>
	)
}
const mapStateToProps = state => ({
	examModal: state.examData.examModal,
	examId: state.examData.examId,
	exams: state.examData.exams,
	subjectId: state.examData.subjectId
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExamModal)
