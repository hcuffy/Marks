import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from './styles/students.css'
import { downloadPDF } from '../utils/generatePDF'
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
		subjectGraphId,
		studentGraphName,
		subjectGraphName
	} = studentData

	const studentOptions = getStudentList(students)
	const subjectOptions = getAllSubjects(subjectData.data)
	notifyIfEmpty([], chartToDisplay === 'subject' && _.isNull(subjectGraphId), 'student')
	const chartTitle = chartHeader(studentData)
	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_div,
				studentDropdown,
				actions.openStudenGraph,
				{ label: studentGraphName },
				studentOptions
			)}
			{createDropdown(
				styles.dropdown_div,
				subjectDropdown,
				actions.openStudenSubjectGraph,
				{ label: subjectGraphName },
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
