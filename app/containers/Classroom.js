// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/SideMenu'
import Navbar from '../components/rooms/Navbar'
import Classes from '../components/rooms/Classes'
import Exams from '../components/exam/Exams'

class Classroom extends Component {
	componentDidMount() {
		if (this.props.classData) {
			this.props.actions.displayClassData()
			this.props.actions.getSubjectData()
		}
	}

	render() {
		return (
			<div data-tid="classroom_container">
				<SideMenu />
				<Navbar />
				{this.props.classesActive && <Classes />}
				{this.props.examActive && <Exams />}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	classesActive: state.tabStatus.classTab,
	examActive: state.tabStatus.testTab,
	classData: state.classData.classData,
	addedClass: state.addedClass
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Classroom)
