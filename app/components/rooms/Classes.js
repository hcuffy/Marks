import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from '../styles/classroom.css'
import ClassList from './ClassList'
import Subjects from '../subject/Subjects'

const _ = require('lodash')

function checkChange(allClassData, actions) {
	if (allClassData.Check) {
		actions.displayClassData()
	}
}

const Classes = ({ allClassData, actions }) => {
	const formLabels = _.omit(allClassData, ['classData', 'Check'])
	const formInputs = _.keys(formLabels).map((data, idx) => (
		<div key={idx} className={styles.form_div}>
			<label className={styles.form_label} htmlFor={`${data}Id`}>
				{data}:
			</label>
			<input
				name={data}
				className="form-control"
				id={`${data}Id`}
				type="text"
				defaultValue={formLabels[data]}
			/>
		</div>
	))
	checkChange(allClassData, actions)
	return (
		<div className={styles.room_div}>
			<form onSubmit={actions.handleClassData} method="POST">
				<div className={styles.form_outer_div}>
					<h4 className={styles.center_header}>Add a Class</h4>
					{formInputs}
					<div className={(styles.form_div, styles.save_btn)}>
						<button type="submit" className="btn btn-success">
							Add
						</button>
					</div>
				</div>
			</form>
			<div>
				<h4 className={styles.center_header}>List of Classes</h4>
				<ClassList listData={allClassData} />
			</div>
			<Subjects allClassData={allClassData} />
		</div>
	)
}
const mapStateToProps = state => ({
	allClassData: state.allClassData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Classes)
