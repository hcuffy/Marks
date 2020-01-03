import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/sidemenu/SideMenu'
import SettingsPage from '../components/settings/SettingsPage'

const _ = require('lodash')

class School extends Component {
	componentDidMount() {
		this.props.actions.getGradingSystem()
		if (_.isNull(this.props.addressData.title)) {
			this.props.actions.displayAddress()
		}
	}

	render() {
		const { t } = this.props

		return (
			<div>
				<SideMenu />
				<SettingsPage t={t} />
			</div>
		)
	}
}

const mapStateToProps = state => ({ addressData: state.addressData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(School)
