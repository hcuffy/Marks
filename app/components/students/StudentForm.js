import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from '../styles/students.css'
import studentForm from './StudentFormHelper'

const _ = require('lodash')

const StudentForm = ({ studentData, allClassData, actions }) => {
	const formFields = _.keys(_.pick(studentData, ['First_Name', 'Last_Name'])).map(
		(data, idx) => (
			<div key={idx} className={styles.form_inner_div}>
				<label className={styles.form_label} htmlFor={`${data}_Id`}>
					{data}
					*:
				</label>
				<input
					name={data}
					required
					className="form-control"
					id={`${data}_Id`}
					type="text"
				/>
			</div>
		)
	)
	const selectOption = _.values(allClassData.classData).map((data, idx) => (
		<option className="form-control dropdown" key={idx}>
			{data.Name}
		</option>
	))

	const completeStudentForm = studentForm(selectOption, formFields, actions)
	return <div className={styles.student_div}>{completeStudentForm}</div>
}
const mapStateToProps = state => ({
	studentData: state.studentData,
	allClassData: state.allClassData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentForm)
