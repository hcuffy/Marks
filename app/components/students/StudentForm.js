import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from '../styles/students.css'

const _ = require('lodash')

const StudentForm = ({ studentData }) => {
	const formFields = _.keys(studentData).map((data, idx) => (
		<div key={idx} className={styles.form_inner_div}>
			<label className={styles.form_label} htmlFor={`${data}Id`}>
				{data}:
			</label>
			<input name={data} className="form-control" id={`${data}Id`} type="text" />
		</div>
	))

	return (
		<div className={styles.student_div}>
			<form method="POST">
				<div className={styles.form_outer_div}>
					<h4 className={styles.center_header}>Add Student</h4>
					{formFields}
					<div className={(styles.form_inner_div, styles.save_btn)}>
						<button type="submit" className="btn btn-success">
							Save
						</button>
					</div>
				</div>
			</form>
			<div />
		</div>
	)
}
const mapStateToProps = state => ({ studentData: state.studentData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentForm)
