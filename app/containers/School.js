import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/sidemenu/SideMenu'
import SchoolInfo from '../components/SchoolInfo'

const _ = require('lodash')

class School extends Component {
	componentDidMount() {
		if (_.isNull(this.props.schoolData.title)) {
			this.props.actions.displaySchoolData()
		}
	}

	render() {
		return (
			<div>
				<SideMenu />
				<SchoolInfo />
			</div>
		)
	}
}

const mapStateToProps = state => ({ schoolData: state.schoolData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(School)
