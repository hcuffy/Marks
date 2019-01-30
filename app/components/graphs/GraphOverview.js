import React from 'react'
import styles from './styles/graphs.css'
import GraphDropdown from './GraphDropdown'
import Chart from './Chart'

const GraphOverview = () => (
	<div>
		<h2 className={styles.center_header}>Graph Overview</h2>
		<GraphDropdown />
		<Chart />
	</div>
)

export default GraphOverview
