import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from '../styles/grades.css'

const GradeTable = () => (
	<div className={styles.div_wrapper}>
		<h2 className={styles.center_header}>Grades</h2>
	</div>
)

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(GradeTable)
