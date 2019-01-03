import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { sortData } from '../rooms/ClassList'
import examForm from './ExamFormHelper'

const _ = require('lodash')

function getClassList(classInfo) {
	const selectOptions = _.values(classInfo).map((data, idx) => (
		<option className="form-control dropup" key={idx}>
			{data.Name}
		</option>
	))

	return selectOptions
}

function getSubjectList(subjectData, examData, cleanedClassList) {
	const defaultSubject = cleanedClassList[0].Name
	const subjectInfo = examData.subject ? examData.subject : defaultSubject
	const filteredSubject = _.filter(subjectData.data, ['Room', subjectInfo])
	const selectedOptions = _.values(filteredSubject).map((data, idx) => (
		<option className="form-control dropup" key={idx} id={data._id}>
			{data.Abbreviation}
		</option>
	))

	return selectedOptions
}

const ExamForm = ({ classData, subjectData, examData, actions }) => {
	const cleanedClassList = sortData(classData)
	const classOption = getClassList(cleanedClassList)
	const subjectOptions = getSubjectList(subjectData, examData, cleanedClassList)
	const completeExamForm = examForm(subjectOptions, classOption, actions)
	return <div>{completeExamForm}</div>
}

const mapStateToProps = state => ({
	classData: state.allClassData,
	subjectData: state.subjectData,
	examData: state.examData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExamForm)
