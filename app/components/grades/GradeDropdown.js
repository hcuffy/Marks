import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from './styles/grades.css'
import { sortData } from '../rooms/ClassList'
import {
	getClassList,
	getSubjectList,
	createDropdown,
	notifyIfEmpty
} from '../helpers/dropdowns'

const GradeDropdown = ({ classData, gradeData, subjectData, actions }) => {
	const cleanedClassList = sortData(classData)
	const classOptions = getClassList(cleanedClassList)
	const subjectOptions = getSubjectList(
		{ selectedRoom: gradeData.classroom },
		subjectData
	)
	notifyIfEmpty(subjectOptions, gradeData.subDrop)

	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_div,
				gradeData.classroomDropdown,
				actions.openGradeClassList,
				'Select Class',
				classOptions
			)}
			{createDropdown(
				styles.dropdown_div,
				gradeData.subDrop,
				actions.displayGradeData,
				'Select Subject',
				subjectOptions
			)}
		</div>
	)
}

const mapStateToProps = state => ({
	classData: state.classData,
	subjectData: state.subjectData,
	gradeData: state.gradeData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GradeDropdown)
