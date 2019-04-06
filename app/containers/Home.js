import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/sidemenu/SideMenu'
import Homepage from '../components/homepage/Homepage'

class Home extends Component {
	componentDidMount() {
		this.props.actions.displayAddress()
		this.props.actions.getGradingSystem()
	}

	render() {
		const { t } = this.props

		return (
			<div>
				<SideMenu />
				<Homepage t={t} />
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
