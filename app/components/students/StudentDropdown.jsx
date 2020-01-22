import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { resolveLabel } from '../../utils/translationUtil'
import { actionCreators } from '../../actions/index'
import { PDFbutton } from '../../utils/pdfUtil'
import {
	getStudentList,
	getAllSubjects,
	createDropdown,
	notifyIfEmpty
} from '../helpers/dropdowns'
import css from './styles/students.css'

const _ = require('lodash')

const StudentDropdown = ({ t, allStudentData, subjectData, actions }) => {
	const {
		students,
		studentDropdown,
		subjectDropdown,
		chartToDisplay,
		studentGraphName,
		subjectGraphName
	} = allStudentData

	const studentOptions = getStudentList(students)
	const subjectOptions = getAllSubjects(subjectData.data)

	const openIt = {
		subjectDropdown
	}

	if (chartToDisplay === 'subject' && _.isNull(studentGraphName)) {
		notifyIfEmpty(t, [], true, 'student')
		openIt.subjectDropdown = false
	}

	return (
		<div className={css.dropdown_main_div}>
			{createDropdown(
				css.dropdown_one,
				studentDropdown,
				actions.openStudentGraph,
				resolveLabel(studentGraphName, t('general.selectStudent')),
				studentOptions,
				'studentDropdown'
			)}
			{createDropdown(
				css.dropdown_two,
				openIt.subjectDropdown,
				actions.openStudentSubjectGraph,
				resolveLabel(subjectGraphName, t('general.selectSubject')),
				subjectOptions,
				'subjectDropdown'
			)}
			{PDFbutton(
				css.pdf_btn,
				t('general.saveAs'),
				resolveLabel(studentGraphName, t('student.defaultHeader'))
			)}
		</div>
	)
}

const mapStateToProps = state => ({
	allStudentData: state.studentData,
	subjectData: state.subjectData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(StudentDropdown))
