import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from '../styles/students.css'

const _ = require('lodash')

function generateStudentList(students) {
	if (_.isUndefined(students)) {
		return []
	}
	const completeList = students.map((data, idx) => (
		<button
			key={idx}
			id={data._id}
			type="button"
			className={`list-group-item list-group-item-action ${styles.list_btn}`}
		>
			{`${data.FirstName} ${data.LastName}`}
			<span className={`badge badge-warning badge-pill ${styles.badge_number}`}>
				{data.Gender}
			</span>
		</button>
	))

	return completeList
}

const StudentList = ({ students }) => {
	const listData = generateStudentList(students)

	return (
		<div className={styles.list_div}>
			<div className="list-group list-group-flush">{listData}</div>
		</div>
	)
}
const mapStateToProps = state => ({
	students: state.studentData.data
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentList)
