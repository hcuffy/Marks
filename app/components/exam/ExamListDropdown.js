import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'

import { resolveLabel } from '../../utils/translationUtil'
import { actionCreators } from '../../actions/index'
import { sortData } from '../rooms/helpers/formHelpers'
import { getClassList, getSubjectList, createDropdown } from '../helpers/dropdowns'
import styles from './styles/exam.css'

const ExamListDropdown = ({ t, classData, examData, subjectData, actions }) => {
	const cleanedClassList = sortData(classData)
	const classOptions = getClassList(cleanedClassList)
	const subjectOptions = getSubjectList(examData, subjectData)
	const { selectedRoom, selectedSubject } = examData

	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_div,
				examData.openClassDropdown,
				actions.openClassDropdownList,
				resolveLabel(selectedRoom, t('general.selectClass')),
				classOptions,
				'classDropdown'
			)}
			{createDropdown(
				styles.dropdown_div,
				examData.openSubList,
				actions.displayExamData,
				resolveLabel(selectedSubject, t('general.selectSubject')),
				subjectOptions,
				'subjectDropdown'
			)}
		</div>
	)
}

const mapStateToProps = state => ({
	classData: state.classData,
	subjectData: state.subjectData,
	examData: state.examData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(ExamListDropdown))
