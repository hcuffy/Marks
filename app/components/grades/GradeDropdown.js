import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { resolveLabel } from '../../utils/translationUtil'
import { actionCreators } from '../../actions/index'
import { sortData } from '../rooms/helpers/formHelpers'
import {
	getClassList,
	getSubjectList,
	createDropdown,
	notifyIfEmpty
} from '../helpers/dropdowns'
import styles from './styles/grades.css'

const _ = require('lodash')

const GradeDropdown = ({ t, classData, gradeData, subjectData, actions }) => {
	const cleanedClassList = sortData(classData)
	const { subDrop, subjectName, classroom, classroomDropdown } = gradeData
	const openIt = { subDrop }
	const classOptions = getClassList(cleanedClassList)
	const subjectOptions = getSubjectList({ selectedRoom: classroom }, subjectData)

	if (_.isEmpty(subjectOptions) && subDrop) {
		notifyIfEmpty(t, [], true, 'class')
		openIt.subDrop = false
	}

	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_div,
				classroomDropdown,
				actions.openGradeClassList,
				resolveLabel(classroom, t('general.selectClass')),
				classOptions,
				'classDropdown'
			)}
			{createDropdown(
				styles.dropdown_div,
				subDrop,
				actions.displayGradeData,
				resolveLabel(subjectName, t('general.selectSubject')),
				subjectOptions,
				'subjectDropdown'
			)}
		</div>
	)
}

const mapStateToProps = state => ({
	classData: state.classData,
	subjectData: state.subjectData,
	gradeData: state.gradeData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(GradeDropdown))
