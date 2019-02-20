import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { t, resolveLabel } from '../../utils/translationUtil'
import { actionCreators } from '../../actions/index'
import styles from './styles/students.css'
import { downloadPDF } from '../../utils/pdfUtil'
import { chartHeader } from './helpers/chart/chartData'

import {
	getStudentList,
	getAllSubjects,
	createDropdown,
	notifyIfEmpty
} from '../helpers/dropdowns'

const _ = require('lodash')

const PDFbutton = chartTitle => (
	<button
		className={styles.pdf_btn}
		type="button"
		onClick={() => downloadPDF('canvas', chartTitle, 'chart')}
	>
		<i className="fas fa-file-pdf fa-2x" /> <br />
		Save As...
	</button>
)

const StudentDropdown = ({ studentData, subjectData, actions }) => {
	const {
		students,
		studentDropdown,
		subjectDropdown,
		chartToDisplay,
		studentGraphName,
		subjectGraphName
	} = studentData

	const studentOptions = getStudentList(students)
	const subjectOptions = getAllSubjects(subjectData.data)
	const chartTitle = chartHeader(studentData)
	const openIt = { subjectDropdown }

	if (chartToDisplay === 'subject' && _.isNull(studentGraphName)) {
		notifyIfEmpty([], true, 'student')
		openIt.subjectDropdown = false
	}
	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_one,
				studentDropdown,
				actions.openStudenGraph,
				resolveLabel(studentGraphName, t('general.selectStudent')),
				studentOptions
			)}
			{createDropdown(
				styles.dropdown_two,
				openIt.subjectDropdown,
				actions.openStudenSubjectGraph,
				resolveLabel(subjectGraphName, t('general.selectSubject')),
				subjectOptions
			)}
			{PDFbutton(chartTitle)}
		</div>
	)
}

const mapStateToProps = state => ({
	studentData: state.studentData,
	subjectData: state.subjectData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentDropdown)
