import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from './styles/students.css'
import { getStudentList, getAllSubjects, createDropdown } from '../helpers/dropdowns'

const StudentDropdown = ({ studentData, subjectData, actions }) => {
	const { students, studentDropdown, subjectDropdown } = studentData
	const studentOptions = getStudentList(students)
	const subjectOptions = getAllSubjects(subjectData.data)
	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_div,
				studentDropdown,
				actions.openStudenGraph,
				{ label: 'Select Student' },
				studentOptions
			)}
			{createDropdown(
				styles.dropdown_div,
				subjectDropdown,
				actions.openStudenSubjectGraph,
				{ label: 'Select Subject' },
				subjectOptions
			)}
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
