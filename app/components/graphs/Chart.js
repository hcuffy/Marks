import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Bar } from 'react-chartjs-2'
import JSPDF from 'jspdf'
import { actionCreators } from '../../actions/index'
import { chartData } from './helpers/chartData'
import { chartOptions } from './helpers/chartOptions'
import styles from './styles/graphs.css'

const downloadPDF = () => {
	const canvas = document.querySelector('canvas')
	if (canvas === null) {
		return
	}
	const canvasImg = canvas.toDataURL('image/png', 1.0)
	const doc = new JSPDF('landscape')
	doc.setFontSize(20)
	doc.text(15, 15, 'Chart Test')
	doc.addImage(canvasImg, 'png', 10, 10, 280, 150)
	doc.save('canvas.pdf')
}
const Chart = ({ graphData, subjects }) => (
	<div className={styles.chart}>
		<button type="button" onClick={() => downloadPDF()}>
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
