import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from '../styles/exam.css'
import { cleanAndSortData } from '../rooms/ClassList'

const _ = require('lodash')

function getClassList(classInfo) {
	const selectOptions = _.values(classInfo).map((data, idx) => (
		<option className="form-control dropup" key={idx}>
			{data.Name}
		</option>
	))

	return selectOptions
}

function getSubjectList(subjectData, examData, cleanedClassList) {
	const defaultSubject = cleanedClassList[0].Name
	const subjectInfo = examData.subject ? examData.subject : defaultSubject
	const filteredSubject = _.filter(subjectData.data, ['Room', subjectInfo])
	const selectedOptions = _.values(filteredSubject).map((data, idx) => (
		<option className="form-control dropup" key={idx} id={data._id}>
			{data.Abbreviation}
		</option>
	))

	return selectedOptions
}

const ExamForm = ({ classData, subjectData, examData, actions }) => {
	const cleanedClassList = cleanAndSortData(classData)
	const classOption = getClassList(cleanedClassList)
	const subjectOptions = getSubjectList(subjectData, examData, cleanedClassList)

	return (
		<div>
			<form className="form-inline" onSubmit={actions.addNewExam} method="POST">
				<div>
					<label className={styles.form_label} htmlFor="titleId">
						Title*:
					</label>
					<input
						name="Title"
						className="form-control"
						required
						id="titleId"
						type="text"
					/>
				</div>
				<div>
					<label className={styles.form_label} htmlFor="classSelection">
						Select Classroom:
					</label>
					<select
						onChange={actions.getSelectedSubject}
						className="form-control"
						name="Room"
						id="classSelection"
						type="text"
					>
						{classOption}
					</select>
				</div>
				<div>
					<label className={styles.form_label} htmlFor="subjectSelection">
						Select Subject:
					</label>
					<select
						className="form-control"
						name="Subject"
						id="subjectSelection"
						type="text"
					>
						{subjectOptions}
					</select>
				</div>
				<div className={`${styles.form_div} form-group`}>
					<label className={styles.form_label} htmlFor="dateIn">
						Date:
					</label>
					<input className="form-control" name="Date" type="date" id="dateIn" />
				</div>
				<div className={`${styles.form_div} form-group`}>
					<label className={styles.form_label} htmlFor="number-input">
						Number:
					</label>
					<input
						className="form-control"
						defaultValue="1"
						name="Weight"
						type="number"
						id="number-input"
						min="1"
						max="4"
						step="0.5"
					/>
				</div>
				<div className={styles.form_save_btn}>
					<button type="submit" className="btn btn-success">
						Add New Exam
					</button>
				</div>
			</form>
		</div>
	)
}

const mapStateToProps = state => ({
	classData: state.allClassData,
	subjectData: state.subjectData,
	examData: state.examData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExamForm)
