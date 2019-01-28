import React from 'react'
import { Bar } from 'react-chartjs-2'
import { chartData } from './helpers/chartData'
import styles from './styles/graphs.css'

const Charts = () => (
	<div className={styles.chart}>
		<Bar data={chartData()} options={{}} />
	</div>
)
export default Charts
