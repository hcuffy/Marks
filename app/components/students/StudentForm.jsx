import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { studentForm } from './helpers/formHelper'
import css from './styles/students.css'

const StudentForm = ({ t, studentData, classData, actions }) => {
	const completeStudentForm = studentForm(t, studentData, classData, actions)

	return <div className={css.student_div}>{completeStudentForm}</div>
}
const mapStateToProps = state => ({
	studentData: state.studentData,
	classData: state.classData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(StudentForm))
