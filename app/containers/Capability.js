import React, { Component } from 'react'
import { connect } from 'react-redux'
import SideMenu from '../components/sidemenu/SideMenu'
import CapabilitySection from '../components/capability/CapabilitySection'

class Capability extends Component {
	render() {
		return (
			<div>
				<SideMenu />
				<CapabilitySection />
			</div>
		)
	}
}

export default connect(
	null,
	null
)(Capability)
