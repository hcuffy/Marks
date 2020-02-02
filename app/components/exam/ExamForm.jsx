import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { sortData } from '../rooms/helpers/formHelpers'
import { getClassroomId } from '../helpers/dropdowns'
import {
	examForm,
	getClassOptions,
	getSubjectOptions
} from './helpers/formHelper'

const _ = require('lodash')

const ExamForm = ({ t, classData, subjectData, examData, actions }) => {
	const cleanedClassList = sortData(classData)
	const classOption = getClassOptions(cleanedClassList)

	const subjectOptions = getSubjectOptions(
		subjectData,
		examData,
		cleanedClassList
	)

	const completeExamForm = examForm(t, subjectOptions, classOption, actions)

	return <div>{completeExamForm}</div>
}

const mapStateToProps = state => ({
	classData: state.classData,
	subjectData: state.subjectData,
	examData: state.examData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(ExamForm))
