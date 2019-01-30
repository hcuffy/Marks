import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from './styles/graphs.css'
import { sortData } from '../rooms/ClassList'
import { getClassList, getSubjectList, createDropdown } from '../helpers/dropdowns'

const GraphDropdown = ({ classData, graphData, subjectData, actions }) => {
	const cleanedClassList = sortData(classData)
	const classOptions = getClassList(cleanedClassList)
	const subjectOptions = getSubjectList(
		{ selectedRoom: graphData.classroom },
		subjectData
	)
	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_div,
				graphData.classroomDropdown,
				actions.openGraphClassList,
				{ label: 'Select Class' },
				classOptions
			)}
			{createDropdown(
				styles.dropdown_div,
				graphData.openSubList,
				actions.displayClassGraph,
				{ label: 'Select Subject' },
				subjectOptions
			)}
		</div>
	)
}

const mapStateToProps = state => ({
	classData: state.classData,
	subjectData: state.subjectData,
	graphData: state.graphData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GraphDropdown)
