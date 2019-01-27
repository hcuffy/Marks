import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/SideMenu'
import Homepage from '../components/Homepage'

class Home extends Component {
	componentDidMount() {
		this.props.actions.displaySchoolData()
	}

	render() {
		return (
			<div>
				<SideMenu />
				<Homepage />
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
)(Home)
