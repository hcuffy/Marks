import React from 'react'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { chartData } from './helpers/chart/chartData'
import { chartOptions } from './helpers/chart/chartOptions'
import styles from './styles/students.css'

const StudentChart = ({ studentData, exams, grades }) => (
	<div className={styles.chart}>
		<Line data={chartData(studentData, grades, exams)} options={chartOptions()} />
	</div>
)

const mapStateToProps = state => ({
	studentData: state.studentData,
	grades: state.graphData.grades,
	exams: state.graphData.exams
})

export default connect(
	mapStateToProps,
	null
)(StudentChart)
