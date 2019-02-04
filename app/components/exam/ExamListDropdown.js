import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from './styles/exam.css'
import { sortData } from '../rooms/ClassList'
import { getClassList, getSubjectList, createDropdown } from '../helpers/dropdowns'

const ExamListDropdown = ({ classData, examData, subjectData, actions }) => {
	const cleanedClassList = sortData(classData)
	const classOptions = getClassList(cleanedClassList)
	const subjectOptions = getSubjectList(examData, subjectData)

	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_div,
				examData.openClassDropdown,
				actions.openClassDropdownList,
				{ label: 'Select Class' },
				classOptions
			)}
			{createDropdown(
				styles.dropdown_div,
				examData.openSubList,
				actions.displayExamData,
				{ label: 'Select Subject' },
				subjectOptions
			)}
		</div>
	)
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
)(ExamListDropdown)
