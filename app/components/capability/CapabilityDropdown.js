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
import capabilityQuestions from '../../constants/capabilityQuestions'
import { getQuestionSet } from './helpers/helpers'
import { resolveLabel } from '../../utils/translationUtil'
import styles from './styles/capability.css'

const CapabilityDropdown = ({ capabilityData, classData, students, actions }) => {
	const {
		classDropdown,
		studentDropdown,
		questionDropdown,
		classroom,
		subject,
		answers,
		classroomId
	} = capabilityData
	const classOptions = getClassList(sortData(classData))
	const studentOptions = getStudentList(students)
	const questionOptions = getQuestionList(classroomId, capabilityQuestions)
	const actualSet = getQuestionSet(classroomId, answers)

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
				questionDropdown,
				actions.openQuestionList,
				resolveLabel(actualSet, 'Question Set'),
				questionOptions,
				null
			)}
			{changeQuestionBtn(actions)}
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
