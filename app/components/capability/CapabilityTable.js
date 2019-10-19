import React from 'react'
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import capabilityQuestions from '../../constants/capabilityQuestions'
import { getQuestionSet, getQuestionBase, createTableBody } from './helpers/table'
import css from './styles/capability.css'

const _ = require('lodash')

const tableQuestions = (t, actualSet, { studentId, classroomId, questions, answers }, actions) => {
	const questionBase = getQuestionBase(classroomId, questions) ? 'class5' : 'class5'
	const questionSet = _.find(capabilityQuestions, actualSet)[questionBase]
	const questionArr = []

	_.forIn(questionSet, (value, key) => {
		questionArr.push({ [key]: value })
	})

	return createTableBody(t, questionArr, questionBase, studentId, classroomId, answers, actions)
}

const CapabilityTable = ({ t, capabilityData, actions }) => {
	const { classroomId, questions } = capabilityData
	const questionSet = getQuestionSet(classroomId, questions)
	const tableBody = tableQuestions(t, questionSet, capabilityData, actions)

	return (
		<div className={css.table_main_dev}>
			{' '}
			<div className={css.form_div}>
				<Table>
					<thead>
						<tr>
							<th colSpan="6">{t('capability.tableHeader')}</th>
						</tr>
					</thead>
					{tableBody}
				</Table>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	capabilityData: state.capabilityData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(CapabilityTable))
