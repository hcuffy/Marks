import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from '../styles/exam.css'
import { actionCreators } from '../../actions/index'
import ExamListDropdown from './ExamListDropdown'
import ExamListInputs from './ExamListInputs'
import ExamModal from './ExamModal'

const ExamList = () => (
	<div className={styles.main_div}>
		<div>
			<h4>Edit Exam</h4>
			<ExamListDropdown />
		</div>
		<div>
			<ExamListInputs />
			<ExamModal />
		</div>
	</div>
)

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(ExamList)
