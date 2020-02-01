import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { Button, Input, Label } from 'reactstrap'
import { modalFrame } from '../helpers/editModal'
import { actionCreators } from '../../actions/index'
import { filterObjectData } from '../rooms/helpers/formHelpers'
import css from './styles/subject.css'

const _ = require('lodash')

const getClassroomId = dataList => {
	if (_.isEmpty(dataList) || _.isNil(dataList)) {
		return []
	}

	return dataList[0].classroomId
}

const selectedSubject = (t, subject, isInvalid) => {
	return _.keys(subject).map((data, idx) => (
		<div key={idx} className={css.modal_form_div}>
			<Label className={css.modal_form_label} htmlFor={`${data}_Id`}>
				{t(`room.${data}`)}:
			</Label>

			<Input
				name={data}
				className={`${css.badge_number} form-control`}
				data-id={`${data}_Id`}
				type="text"
				defaultValue={subject[data]}
				invalid={isInvalid && _.isEmpty(subject[data])}
			/>
		</div>
	))
}
const determineSubjectInputs = (filteredData, id, subjectModalData) => {
	const { name, abbreviation, isInvalid } = subjectModalData

	if (isInvalid === true) {
		return { name, abbreviation }
	} else {
		return filterObjectData(filteredData, id)
	}
}

const SubjectModal = ({ t, filteredData, subjectModalData, actions }) => {
	const { id, showSubjectModal, isInvalid } = subjectModalData

	const requiredSubject = determineSubjectInputs(
		filteredData,
		id,
		subjectModalData
	)

	const subjectFields = selectedSubject(t, requiredSubject, isInvalid)

	const hiddenInputs = (
		<div>
			<Input
				type="hidden"
				name="classroomId"
				data-id={getClassroomId(filteredData)}
			/>

			<Input type="hidden" name="subjectId" data-id={id} />
		</div>
	)

	const footerData = {
		dataId: id,
		nameId: null,
		closeId: id,
		deleteAction: actions.deleteSingleSubject,
		closeAction: actions.subjectModalDisplay
	}

	return (
		<div>
			{modalFrame(
				t,
				showSubjectModal,
				actions.updateSubject,
				subjectFields,
				hiddenInputs,
				footerData
			)}
		</div>
	)
}

const mapStateToProps = state => ({ subjectModalData: state.subjectModalData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(SubjectModal))
