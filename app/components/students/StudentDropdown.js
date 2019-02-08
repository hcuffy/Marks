import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from './styles/students.css'
import { getStudentList, createDropdown } from '../helpers/dropdowns'

const StudentDropdown = ({ studentData, actions }) => {
	const { students, studentDropdown } = studentData
	const studentOptions = getStudentList(students)

	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_div,
				studentDropdown,
				actions.openStudenGraph,
				{ label: 'Select Student' },
				studentOptions
			)}
		</div>
	)
}

const mapStateToProps = state => ({
	studentData: state.studentData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentDropdown)
