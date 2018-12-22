// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/SideMenu'
import StudentList from '../components/students/StudentList'

class Students extends Component {
	componentDidMount() {
		if (this.props.classData[0].Name === '') {
			console.log('herer')
			this.props.actions.displayClassData()
		}
	}

	render() {
		return (
			<div data-tid="students_container">
				<SideMenu />
				<StudentList />
			</div>
		)
	}
}

const mapStateToProps = state => ({ classData: state.allClassData.classData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Students)
