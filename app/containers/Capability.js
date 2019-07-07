import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/sidemenu/SideMenu'
import CapabilitySection from '../components/capability/CapabilitySection'

class Capability extends Component {
	componentDidMount() {
		if (this.props.classData) {
			this.props.actions.displayClassData()
			this.props.actions.getStudents()
			this.props.actions.getAnswers()
		}
	}

	render() {
		const { t } = this.props

		return (
			<div>
				<SideMenu />
				<CapabilitySection t={t} />
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
)(Capability)
