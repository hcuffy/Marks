import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import styles from './styles/schoolinfo.css'

const _ = require('lodash')

const schoolInfoForm = info =>
	_.keys(info).map((data, idx) => (
		<div key={idx} className={styles.form_inner_div}>
			<label className={styles.form_label} htmlFor={`school${data}`}>
				{data}:
			</label>
			<input
				name={data}
				className="form-control"
				id={`school${data}`}
				type="text"
				defaultValue={info[data]}
			/>
		</div>
	))

const SchoolInfo = ({ schoolData, actions }) => {
	const entry = schoolInfoForm(schoolData)

	return (
		<div className={styles.div_wrapper}>
			<h2 className={styles.center_header}>School Information</h2>
			<form onSubmit={actions.handleSchoolData} method="POST">
				<div className={styles.form_outer_div}>
					{entry}
					<div className={(styles.form_inner_div, styles.save_btn)}>
						<button type="submit" className="btn btn-success">
							Save
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
const mapStateToProps = state => ({ schoolData: state.schoolData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SchoolInfo)
