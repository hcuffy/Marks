import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Line } from 'react-chartjs-2'
import { actionCreators } from '../../actions/index'
import { chartData } from './helpers/chart/chartData'
import { chartOptions } from './helpers/chart/chartOptions'
import styles from './styles/students.css'

const StudentChart = () => (
	<div className={styles.chart}>
		<Line data={chartData()} options={chartOptions()} />
	</div>
)

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(StudentChart)
