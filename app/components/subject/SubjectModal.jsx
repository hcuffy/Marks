import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { modalFrame } from '../helpers/editModal'
import { actionCreators } from '../../actions/index'
import { cleanAndFilterData } from '../rooms/helpers/formHelpers'
import css from './styles/subject.css'

const _ = require('lodash')

const getClassroomId = dataList => {
	if (_.isEmpty(dataList) || _.isNil(dataList)) {
		return []
	}

	return dataList[0].classroomId
}

const selectedSubject = (t, subject) =>
	_.keys(subject).map((data, idx) => (
		<div key={idx} className={css.modal_form_div}>
			<label className={css.modal_form_label} htmlFor={`${data}_Id`}>
				{t(`room.${data}`)}:
			</label>
			<input
				name={data}
				className={`${css.badge_number} form-control`}
				data-id={`${data}_Id`}
				type="text"
				required
				defaultValue={subject[data]}
			/>
		</div>
	))

const SubjectModal = ({ t, filteredData, subjectModalData, actions }) => {

	const requiredSubject = cleanAndFilterData(filteredData, subjectModalData)
	const subjectFields = selectedSubject(t, requiredSubject)
  const { id, showSubjectModal } = subjectModalData

	const hiddenInputs = (
		<div>
			{/* eslint-disable-next-line max-len */}
			<input type="hidden" name="classroomId" data-id={getClassroomId(filteredData)} />
			<input type="hidden" name="subjectId" data-id={id} />
		</div>
	)

	const footerData = {
		dataId: id,
		nameId: null,
		closeId: id,
		deleteAction: actions.deleteSingleSubject,
		closeAction: actions.subjectModalDisplay
	}

	return <div>{modalFrame(t, showSubjectModal, actions.updateSubject, subjectFields, hiddenInputs, footerData)}</div>
}

const mapStateToProps = state => ({ subjectModalData: state.subjectModalData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(SubjectModal))
