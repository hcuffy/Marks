import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import studentForm from './helpers/formHelper'
import styles from './styles/students.css'

const _ = require('lodash')

const studentDataFields = (t, studentData) =>
	_.keys(_.pick(studentData, ['firstname', 'lastname'])).map((data, idx) => (
		<div key={idx} className={styles.form_inner_div}>
			<label className={styles.form_label} htmlFor={`${data}_Id`}>
				{t(`student.${data}`)}*:
			</label>
			<input
				name={data}
				required
				className="form-control"
				data-id={`${data}_Id`}
				type="text"
			/>
		</div>
	))

const StudentForm = ({ t, studentData, classData, actions }) => {
	const formFields = studentDataFields(t, studentData)
	const selectOption = _.values(classData.classData).map((data, idx) => (
		<option className="form-control dropdown" key={idx}>
			{data.name}
		</option>
	))

	const completeStudentForm = studentForm(t, selectOption, formFields, actions)
	return <div className={styles.student_div}>{completeStudentForm}</div>
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
