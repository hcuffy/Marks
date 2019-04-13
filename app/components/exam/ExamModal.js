import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { cleanAndFilterData } from '../rooms/helpers/formHelpers'
import { modalFrame } from '../helpers/editModal'
import generateFields from './helpers/modalHelper'

const ExamModal = ({ t, examData, actions }) => {
	const { examModal, examId, exams, subjectId } = examData
	const requiredExam = cleanAndFilterData(exams, { id: examId })
	const examFormData = generateFields(t, requiredExam)
	const hiddenInputs = (
		<div>
			<input type="hidden" name="subjectId" data-id={subjectId} />
			<input type="hidden" name="examId" data-id={examId} />
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
			{modalFrame(
				t,
				examModal,
				actions.updateExam,
				examFormData,
				hiddenInputs,
				footerData
			)}
		</div>
	)
}
const mapStateToProps = state => ({
	examData: state.examData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(ExamModal))
