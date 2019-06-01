import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { getStudentList, getNotesList, createDropdown } from '../helpers/dropdowns'
import { resolveLabel } from '../../utils/translationUtil'
import styles from './styles/notes.css'

const NotesDropdown = ({ studentData, notesData, actions }) => {
	const { students } = studentData
	const {
		studentDropdown,
		notesDropdown,
		selectedStudent,
		selectedNote,
		studentId,
		notes
	} = notesData
	const studentOptions = getStudentList(students)
	const notesOptions = getNotesList(notes, studentId)

	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_one,
				studentDropdown,
				actions.openStudentDropdown,
				resolveLabel(selectedStudent, 'Select Student'),
				studentOptions,
				'studentDropdown'
			)}

			{createDropdown(
				styles.dropdown_two,
				notesDropdown,
				actions.openNotesDropdown,
				resolveLabel(selectedNote, 'Select Note'),
				notesOptions,
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
