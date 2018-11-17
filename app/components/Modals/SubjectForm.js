import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from '../styles/classroom.css'

const SubjectForm = ({ actions }) => (
	<div>
		<form onSubmit={actions.addNewSubject} method="POST">
			<div className={styles.form_div}>
				<label className={styles.form_label} htmlFor="Input1">
					Name:
				</label>
				<input
					type="text"
					className="form-control"
					name="Name"
					id="Input1"
					placeholder="Mathematics"
				/>
			</div>
			<div className={styles.form_div}>
				<label className={styles.form_label} htmlFor="Input2">
					Abbrivation:
				</label>
				<input
					type="text"
					className="form-control"
					name="Abbrivation"
					id="Input2"
					placeholder="MATH 101"
				/>
			</div>
			<div className={styles.form_div}>
				<label className={styles.form_label} htmlFor="classSelect">
					Select Class:
				</label>
				<select type="text" name="Room" className="form-control" id="classSelect">
					<option>Class 1</option>
					<option>Class 2</option>
				</select>
			</div>
			<div className={styles.subject_save}>
				<button type="submit" className="btn btn-success">
					Add
				</button>
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
)(SubjectForm)
