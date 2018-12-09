import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from '../styles/exam.css'
import { actionCreators } from '../../actions/index'
import ExamListDropdown from './ExamListDropdown'

const ExamList = () => (
	<div className={styles.main_div}>
		<h4>Edit Exam</h4>
		<ExamListDropdown />
	</div>
)

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(ExamList)
