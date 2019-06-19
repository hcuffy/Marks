import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { sortData } from '../rooms/helpers/formHelpers'
import { getClassroomId } from '../helpers/dropdowns'
import examForm from './helpers/formHelper'

const _ = require('lodash')

const getClassOptions = classInfo => {
	const selectOptions = _.values(classInfo).map((data, idx) => (
		<option className="form-control dropup" key={idx}>
			{data.name}
		</option>
	))

	return selectOptions
}

const getSubjectOptions = (subjectData, examData, cleanedClassList) => {
	const { subject } = examData
	const classroom = subject || cleanedClassList[0].name
	const classroomId = getClassroomId(classroom, cleanedClassList)
	const filteredSubject = _.filter(subjectData.data, ['classroomId', classroomId])

	const selectedOptions = _.values(filteredSubject).map((data, idx) => (
		<option className="form-control dropup" key={idx} data-id={data._id}>
			{data.abbreviation}
		</option>
	))

	return selectedOptions
}

const ExamForm = ({ t, classData, subjectData, examData, actions }) => {
	const cleanedClassList = sortData(classData)
	const classOption = getClassOptions(cleanedClassList)
	const subjectOptions = getSubjectOptions(subjectData, examData, cleanedClassList)
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
