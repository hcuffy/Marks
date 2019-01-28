import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/sidemenu/SideMenu'
import GraphOverview from '../components/graphs/GraphOverview'

class Graphs extends Component {
	componentDidMount() {
		if (this.props.classData) {
			this.props.actions.displayClassData()
			this.props.actions.getSubjectData()
			this.props.actions.getStudents()
		}
	}

	render() {
		return (
			<div>
				<SideMenu />
				<GraphOverview />
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
