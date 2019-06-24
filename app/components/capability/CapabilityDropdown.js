import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { changeQuestionBtn } from './helpers/tableForm'
import { sortData } from '../rooms/helpers/formHelpers'
import {
	getClassList,
	getStudentList,
	getQuestionList,
	createDropdown
} from '../helpers/dropdowns'
import { resolveLabel } from '../../utils/translationUtil'
import styles from './styles/capability.css'

const _ = require('lodash')

const CapabilityDropdown = ({ capabilityData, classData, students, actions }) => {
	const { classDropdown, studentDropdown, classroom, subject, answers } = capabilityData
	const classOptions = getClassList(sortData(classData))
	const studentOptions = getStudentList(students)
	const questionOptions = _.isNull(answers) ? getQuestionList('id', answers) : []

	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_div,
				classDropdown,
				actions.openCapabilityClassList,
				resolveLabel(classroom, 'Select Class'),
				classOptions,
				'classDropdown'
			)}
			{createDropdown(
				styles.dropdown_div,
				studentDropdown,
				actions.openCapabilityStudentList,
				resolveLabel(subject, 'Select Student'),
				studentOptions,
				'studentDropdown'
			)}
			{createDropdown(
				styles.dropdown_div,
				false,
				() => {},
				resolveLabel(null, 'Select Questions List'),
				questionOptions,
				'questionDropdown'
			)}
			{changeQuestionBtn()}
		</div>
	)
}

const mapStateToProps = state => ({
	capabilityData: state.capabilityData,
	classData: state.classData,
	students: state.studentData.students
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CapabilityDropdown)
