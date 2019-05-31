import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import noteForm from './helpers/formHelpers'
import styles from './styles/notes.css'

const NotesForm = ({ notesData, actions }) => {
	const { studentNotesDropdown } = notesData

	return <div>{noteForm(actions)}</div>
}

const mapStateToProps = state => ({
	notesData: state.notesData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NotesForm)
