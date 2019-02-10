import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from './styles/students.css'
import {
	getStudentList,
	getAllSubjects,
	createDropdown,
	notifyIfEmpty
} from '../helpers/dropdowns'

const _ = require('lodash')

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
