import React from 'react'
import { Bar } from 'react-chartjs-2'
import { chartData } from './helpers/chartData'
import { chartOptions } from './helpers/chartOptions'
import styles from './styles/graphs.css'

const Charts = () => (
	<div className={styles.chart}>
		<Bar data={chartData()} options={chartOptions()} />
	</div>
)
export default Charts
