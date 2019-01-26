import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from './styles/exam.css'
import ExamForm from './ExamForm'
import ExamList from './ExamList'

const Exam = () => (
	<div>
		<div className={styles.room_div}>
			<h4>Add Exam</h4>
			<ExamForm />
		</div>
		<div>
			<ExamList />
		</div>
	</div>
)

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(Exam)
