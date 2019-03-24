import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/sidemenu/SideMenu'
import GraphOverview from '../components/graphs/GraphOverview'

class Graphs extends Component {
	componentDidMount() {
		if (this.props.classData) {
			this.props.actions.getAllGradeData()
			this.props.actions.getGraphExamData()
			this.props.actions.displayClassData()
			this.props.actions.getSubjectData()
			this.props.actions.getStudents()
			this.props.actions.getGradingSystem()
		}
	}

	render() {
		const { t } = this.props
		return (
			<div>
				<SideMenu />
				<GraphOverview t={t} />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	classData: state.classData.classData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Graphs)
