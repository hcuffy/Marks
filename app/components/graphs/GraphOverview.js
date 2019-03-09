import React from 'react'
import styles from './styles/graphs.css'
import { t } from '../../utils/translationUtil'
import GraphDropdown from './GraphDropdown'
import Chart from './Chart'

const GraphOverview = () => (
	<div>
		<h4 className={styles.center_header}>{t('graph.overview')}</h4>
		<GraphDropdown />
		<div className={styles.chart_div}>
			<Chart />
		</div>
	</div>
)

export default GraphOverview
