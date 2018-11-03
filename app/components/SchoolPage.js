// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import styles from './styles/schoolData.css'

const _ = require('lodash')

const SchoolPage = ({ schoolData }) => {
	const entry = _.values(schoolData).map((data, idx) => (
		<li key={idx}>{data}</li>
	))
	return (
		<div className={styles.school_data_div}>
			<p>Display Test</p>
			<span>{entry}</span>
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
