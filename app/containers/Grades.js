// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/SideMenu'
import GradeTable from '../components/grades/GradeTable'

class Grades extends Component {
	componentDidMount() {
		if (this.props.classData) {
			this.props.actions.displayClassData()
			this.props.actions.getSubjectData()
		}
	}

	render() {
		return (
			<div data-tid="grades_container">
				<SideMenu />
				<GradeTable />
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
)(Grades)
