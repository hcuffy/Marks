// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/SideMenu'
import GradeTable from '../components/grades/GradeTable'

class Grades extends Component {
	render() {
		return (
			<div data-tid="grades_container">
				<SideMenu />
				<GradeTable />
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(Grades)
