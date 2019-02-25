import React from 'react'
import styles from './styles/graphs.css'
import { t } from '../../utils/translationUtil'
import GraphDropdown from './GraphDropdown'
import Chart from './Chart'

const GraphOverview = () => (
	<div>
		<h2 className={styles.center_header}>{t('graph.overview')}</h2>
		<GraphDropdown />
		<Chart />
	</div>
)

export default GraphOverview
