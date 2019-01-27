import React from 'react'
import { Bar } from 'react-chartjs-2'
import { graphInfo } from './helpers/graphInfo'
import styles from './styles/graphs.css'

const Charts = () => (
	<div className={styles.chart}>
		<Bar data={graphInfo()} options={{}} />
	</div>
)
export default Charts
