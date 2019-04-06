import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/sidemenu/SideMenu'
import StudentsSection from '../components/students/StudentsSection'

class Students extends Component {
	componentDidMount() {
		this.props.actions.getStudents()
		this.props.actions.getAllGradeData()
		this.props.actions.getGraphExamData()
		this.props.actions.getSubjectData()
		this.props.actions.getGradingSystem()
		if (this.props.classData[0].name === '') {
			this.props.actions.displayClassData()
		}
	}

	render() {
		const { t } = this.props

		return (
			<div>
				<SideMenu />
				<StudentsSection t={t} />
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
