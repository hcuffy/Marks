import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { getStudentList, createDropdown } from '../helpers/dropdowns'
import styles from './styles/notes.css'

const NotesDropdown = ({ studentData, notesData, actions }) => {
	const { students } = studentData
	const { studentDropdown } = notesData

	const studentOptions = getStudentList(students)

	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_one,
				studentDropdown,
				actions.getStudents,
				'Select Student',
				studentOptions,
				'studentDropdown'
			)}

			{createDropdown(
				styles.dropdown_two,
				false,
				actions.getStudents,
				'Select Note',
				[],
				'notesDropdown'
			)}
		</div>
	)
}

const mapStateToProps = state => ({
	studentData: state.studentData,
	notesData: state.notesData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NotesDropdown)
