import React from 'react'
import { Line } from 'react-chartjs-2'

import { chartData } from './helpers/chart/chartData'
import { chartOptions } from './helpers/chart/chartOptions'
import styles from './styles/students.css'

const StudentChart = () => (
	<div className={styles.chart}>
		<Line data={chartData()} options={chartOptions()} />
	</div>
)

export default StudentChart
