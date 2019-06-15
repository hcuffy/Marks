import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { sortData } from '../rooms/helpers/formHelpers'
import { getClassList, getSubjectList, createDropdown } from '../helpers/dropdowns'
import { resolveLabel } from '../../utils/translationUtil'
import styles from './styles/capability.css'

const CapabilityDropdown = ({ capabilityData, classData, actions }) => {
	const { classDropdown, subjectDropown, classroom } = capabilityData
	const classOptions = getClassList(sortData(classData))
	const subjectOptions = getSubjectList({ selectedRoom: 'temp' }, [{ temp: 'holder' }])

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
				subjectDropown,
				actions.displaySubjectGraph,
				resolveLabel(null, 'Select Subject'),
				subjectOptions,
				'subjectDropdown'
			)}
		</div>
	)
}

const mapStateToProps = state => ({
	capabilityData: state.capabilityData,
	classData: state.classData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CapabilityDropdown)
