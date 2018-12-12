import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from '../styles/list.css'

const _ = require('lodash')

const ExamListInputs = ({ exams, subjectId }) => {
	const filteredExams = _.filter(exams, ['SubjectId', subjectId])
	const examList = filteredExams.map((data, idx) => (
		<button
			key={idx}
			id={data._id}
			type="button"
			className={`list-group-item list-group-item-action ${styles.list_btn}`}
		>
			{data.Title}
			<span className={`badge badge-light badge-pill ${styles.badge_number}`}>
				<i className="fas fa-calendar-day" /> {data.Date}
			</span>
			<span className={`badge badge-warning badge-pill ${styles.badge_number}`}>
				<i className="fas fa-weight-hanging" /> {data.Weight}
			</span>
		</button>
	))
	return (
		<div className={`list-group list-group-flush ${styles.exam_div}`}>{examList}</div>
	)
}

const mapStateToProps = state => ({
	exams: state.examData.exams,
	subjectId: state.examData.subjectId
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExamListInputs)
