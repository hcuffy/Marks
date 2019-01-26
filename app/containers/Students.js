import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/SideMenu'
import StudentsSection from '../components/students/StudentsSection'

class Students extends Component {
	componentDidMount() {
		this.props.actions.getStudents()
		if (this.props.classData[0].Name === '') {
			this.props.actions.displayClassData()
		}
	}

	render() {
		return (
			<div data-tid="students_container">
				<SideMenu />
				<StudentsSection />
			</div>
		)
	}
}

const mapStateToProps = state => ({ classData: state.classData.classData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Students)
