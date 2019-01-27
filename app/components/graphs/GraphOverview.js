import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from './styles/graphs.css'
import GraphDropdown from './GraphDropdown'

const GraphOverview = () => (
	<div>
		<h2 className={styles.center_header}>Graph Overview</h2>
		<GraphDropdown />
	</div>
)

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(GraphOverview)
