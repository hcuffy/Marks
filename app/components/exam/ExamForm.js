import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from '../styles/classroom.css'

const ExamForm = () => (
	<div>
		<label className={styles.form_label} htmlFor="titleId">
			Title:
		</label>
		<input name="Title" className="form-control" id="titleId" type="text" />
	</div>
)

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(ExamForm)
