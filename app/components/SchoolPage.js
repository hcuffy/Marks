import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import styles from './styles/schoolData.css'

const _ = require('lodash')

const SchoolPage = ({ schoolData }) => {
	const entry = _.values(schoolData).map((data, idx) => <li key={idx}>{data}</li>)
	return (
		<div className={styles.main_school_div}>
			<div className={styles.school_left_div}>
				<div>
					<p>Your School Address</p>
					<span>{entry}</span>
				</div>
				<div className={styles.page_inner_div}>
					<p>Your Classrooms</p>
					<span>Under Development</span>
				</div>
			</div>

			<div className={styles.school_right_div}>
				<div>
					<p>Your Students</p>
					<span>Under Development</span>
				</div>
				<div className={styles.page_inner_div}>
					<p>Your Subjects</p>
					<span>Under Development</span>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	schoolData: state.schoolData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SchoolPage)
