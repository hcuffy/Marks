import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Bar } from 'react-chartjs-2'
import { actionCreators } from '../../actions/index'
import { chartData } from './helpers/chartData'
import { chartOptions } from './helpers/chartOptions'
import styles from './styles/graphs.css'

const Charts = ({ allGrades, chartTitle, subjectId, exams, subjects }) => (
	// const grades =
	// 	subjectId === null ? allGrades : filterBySubject(subjectId, exams, allGrades)

	<div className={styles.chart}>
		<Bar
			data={chartData(allGrades, chartTitle, subjects, subjectId, exams)}
			options={chartOptions()}
		/>
	</div>
)

const mapStateToProps = state => ({
	allGrades: state.graphData.grades,
	exams: state.graphData.exams,
	chartTitle: state.graphData.chartTitle,
	subjectId: state.graphData.subjectId,
	subjects: state.subjectData.data
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Charts)
