import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from './styles/graphs.css'
import { sortData } from '../rooms/ClassList'
import { downloadPDF } from '../../utils/pdfUtil'
import {
	getClassList,
	getSubjectList,
	createDropdown,
	getExamList,
	notifyIfEmpty
} from '../helpers/dropdowns'

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

const GraphDropdown = ({ classData, graphData, subjectData, actions }) => {
	const {
		subjectId,
		exams,
		classroom,
		classroomDropdown,
		openSubList,
		subjectName,
		examName,
		openExamList,
		chartTitle
	} = graphData

	const cleanedClassList = sortData(classData)
	const classOptions = getClassList(cleanedClassList)
	const subjectOptions = getSubjectList({ selectedRoom: classroom }, subjectData)
	const examOptions = getExamList(exams, subjectId)

	notifyIfEmpty(subjectOptions, openSubList, 'class')

	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_div,
				classroomDropdown,
				actions.openGraphClassList,
				classroom,
				classOptions
			)}
			{createDropdown(
				styles.dropdown_div,
				openSubList,
				actions.displaySubjectGraph,
				subjectName,
				subjectOptions
			)}
			{createDropdown(
				styles.dropdown_div,
				openExamList,
				actions.displayExamGraph,
				examName,
				examOptions
			)}
			{PDFbutton(chartTitle)}
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
)(GraphDropdown)
