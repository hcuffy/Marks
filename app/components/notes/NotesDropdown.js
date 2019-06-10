import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { getStudentList, getNotesList, createDropdown } from '../helpers/dropdowns'
import { resolveLabel } from '../../utils/translationUtil'
import styles from './styles/notes.css'

const NotesDropdown = ({ t, studentData, notesData, actions }) => {
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
				resolveLabel(selectedStudent, t('general.selectStudent')),
				studentOptions,
				'studentDropdown'
			)}

			{createDropdown(
				styles.dropdown_two,
				notesDropdown,
				actions.openNotesDropdown,
				resolveLabel(selectedNote, t('general.selectNote')),
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
)(withNamespaces()(NotesDropdown))
