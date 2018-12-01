import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from '../styles/exam.css'

const ExamForm = ({ actions }) => (
	<div>
		<form className="form-inline" onSubmit={actions.addNewExam} method="POST">
			<div>
				<label className={styles.form_label} htmlFor="titleId">
					Title:
				</label>
				<input name="Title" className="form-control" id="titleId" type="text" />
			</div>
			<div>
				<label className={styles.form_label} htmlFor="cSelect">
					Select Classroom:
				</label>
				<select className="form-control" name="Room" id="cSelect" type="text">
					<option className="form-control dropdown">Class1</option>
					<option className="form-control dropdown">Class2</option>
				</select>
			</div>
			<div>
				<label className={styles.form_label} htmlFor="cSelect">
					Select Subject:
				</label>
				<select className="form-control" name="Subject" id="sSelect" type="text">
					<option className="form-control dropdown">Subject1</option>
					<option className="form-control dropdown">Subject2</option>
				</select>
			</div>
			<div className="form-group">
				<label className={styles.form_label} htmlFor="date-input">
					Date:
				</label>
				<input className="form-control" name="Date" type="date" id="date-input" />
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

const mapStateToProps = state => ({
	selectClass: state.selectClass
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExamForm)
