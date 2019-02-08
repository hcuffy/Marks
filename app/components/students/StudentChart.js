import React from 'react'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { chartData } from './helpers/chart/chartData'
import { chartOptions } from './helpers/chart/chartOptions'
import styles from './styles/students.css'

const StudentChart = ({ studentData, grades }) => (
	<div className={styles.chart}>
		<Line data={chartData(studentData, grades)} options={chartOptions()} />
	</div>
)
const mapStateToProps = state => ({
	studentData: state.studentData,
	grades: state.graphData.grades
})

export default connect(
	mapStateToProps,
	null
)(StudentChart)
