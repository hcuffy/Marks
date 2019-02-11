import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Bar } from 'react-chartjs-2'
import { actionCreators } from '../../actions/index'
import { chartData } from './helpers/chartData'
import { chartOptions } from './helpers/chartOptions'
import { downloadPDF } from '../utils/generatePDF'
import styles from './styles/graphs.css'

const Chart = ({ graphData, subjects }) => (
	<div className={styles.chart}>
		<button type="button" onClick={() => downloadPDF('canvas', 'Chart', 'chart')}>
			Download{' '}
		</button>
		<Bar data={chartData(graphData, subjects)} options={chartOptions()} />
	</div>
)

const mapStateToProps = state => ({
	graphData: state.graphData,
	subjects: state.subjectData.data
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chart)
