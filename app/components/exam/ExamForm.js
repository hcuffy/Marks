import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from '../styles/exam.css'

const ExamForm = () => (
	<div>
		<form className="form-inline">
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
				<select className="form-control" id="cSelect" type="text">
					<option className="form-control dropdown">Class1</option>
					<option className="form-control dropdown">Class2</option>
				</select>
			</div>
			<div>
				<label className={styles.form_label} htmlFor="cSelect">
					Select Subject:
				</label>
				<select className="form-control" id="sSelect" type="text">
					<option className="form-control dropdown">Subject1</option>
					<option className="form-control dropdown">Subject2</option>
				</select>
			</div>
			<div className="form-group">
				<label className={styles.form_label} htmlFor="date-input">
					Date:
				</label>

				<input className="form-control" type="date" id="date-input" />
			</div>
			<div className={`${styles.form_div} form-group`}>
				<label className={styles.form_label} htmlFor="number-input">
					Number:
				</label>

				<input
					className="form-control"
					defaultValue="1"
					type="number"
					id="number-input"
					min="1"
					max="4"
					step="0.5"
				/>
			</div>
		</form>
	</div>
)

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(ExamForm)
