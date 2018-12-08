import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from '../styles/exam.css'
import { actionCreators } from '../../actions/index'

const ExamList = () => (
	<div className={styles.main_div}>
		<p>Hello</p>
	</div>
)

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(ExamList)
