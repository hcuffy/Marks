// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/SideMenu'
import StudentList from '../components/students/StudentList'

class Students extends Component {
	render() {
		return (
			<div data-tid="students_container">
				<SideMenu />
				<StudentList />
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
)(Students)
