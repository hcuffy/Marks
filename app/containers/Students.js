// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/SideMenu'

class Students extends Component {
	render() {
		return (
			<div data-tid="school_container">
				<SideMenu />
				<p>Test</p>
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
