import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { resolveLabel } from '../../utils/translationUtil'
import { actionCreators } from '../../actions/index'
import { sortData } from '../rooms/helpers/formHelpers'
import { PDFbutton } from '../../utils/pdfUtil'
import {
	getClassList,
	getSubjectList,
	createDropdown,
	getExamList,
	notifyIfEmpty,
	getClassroomName
} from '../helpers/dropdowns'
import styles from './styles/graphs.css'

const _ = require('lodash')

const GraphDropdown = ({ t, classData, graphData, subjectData, actions }) => {
	const {
		subjectId,
		exams,
		classroomId,
		classroomDropdown,
		openSubList,
		subjectName,
		examName,
		openExamList,
		chartTitle
	} = graphData

	const classroom = _.isNull(classroomId)
		? classroomId
		: getClassroomName(classroomId, classData.classData)
	const classOptions = getClassList(sortData(classData))
	const subjectOptions = getSubjectList({ selectedRoom: classroomId }, subjectData)
	const examOptions = getExamList(exams, subjectId)

	notifyIfEmpty(t, subjectOptions, openSubList, 'class')

	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_div,
				classroomDropdown,
				actions.openGraphClassList,
				resolveLabel(classroom, t('general.selectClass')),
				classOptions,
				'classDropdown'
			)}
			{createDropdown(
				styles.dropdown_div,
				openSubList,
				actions.displaySubjectGraph,
				resolveLabel(subjectName, t('general.selectSubject')),
				subjectOptions,
				'subjectDropdown'
			)}
			{createDropdown(
				styles.dropdown_div,
				openExamList,
				actions.displayExamGraph,
				resolveLabel(examName, t('general.selectExam')),
				examOptions,
				'examDropdown'
			)}
			{PDFbutton(
				styles.pdf_btn,
				t('general.saveAs'),
				resolveLabel(chartTitle, t('graph.schoolGrades'))
			)}
		</div>
	)
}

const mapStateToProps = state => ({
	classData: state.classData,
	subjectData: state.subjectData,
	graphData: state.graphData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(GraphDropdown))
