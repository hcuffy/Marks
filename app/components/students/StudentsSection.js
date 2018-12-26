import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from '../styles/students.css'
import StudentForm from './StudentForm'
import StudentList from './StudentList'

const StudentsSection = () => (
	<div>
		<h2 className={styles.center_header}>Students</h2>
		<StudentList />
		<StudentForm />
	</div>
)

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(StudentsSection)
