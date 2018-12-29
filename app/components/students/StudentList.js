import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from '../styles/students.css'
import StudentModal from './StudentModal'

const _ = require('lodash')

function generateStudentList(students, actions) {
	if (_.isUndefined(students)) {
		return []
	}
	const completeList = students.map((data, idx) => (
		<button
			key={idx}
			id={data._id}
			type="button"
			className={`list-group-item list-group-item-action ${styles.list_btn}`}
			onClick={actions.showStudentModal}
		>
			{`${data.FirstName} ${data.LastName}`}
			<span className={`badge badge-info badge-pill ${styles.badge_number}`}>
				{data.Gender === 'Male' ? (
					<i className="fas fa-mars" />
				) : (
					<i className="fas fa-venus" />
				)}
			</span>
		</button>
	))

	return completeList
}

const StudentList = ({ students, actions }) => {
	const listData = generateStudentList(students, actions)

	return (
		<div className={styles.list_div}>
			<div className="list-group list-group-flush">
				<h4 className={styles.center_sub_header}>List of Students</h4>
				{listData}
			</div>
			<StudentModal />
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
