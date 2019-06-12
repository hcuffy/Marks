import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { sortData } from '../rooms/helpers/formHelpers'
import { getClassList, getSubjectList, createDropdown } from '../helpers/dropdowns'
import { resolveLabel } from '../../utils/translationUtil'
import styles from './styles/capability.css'

const CapabilityDropdown = ({ actions }) => {
	const cleanedClassList = sortData([{ temp: 'holder' }])
	const classOptions = getClassList(cleanedClassList)
	const subjectOptions = getSubjectList({ selectedRoom: 'temp' }, [{ temp: 'holder' }])

	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_div,
				false,
				actions.openGraphClassList,
				resolveLabel(null, 'Select Class'),
				classOptions,
				'classDropdown'
			)}
			{createDropdown(
				styles.dropdown_div,
				false,
				actions.displaySubjectGraph,
				resolveLabel(null, 'Select Subject'),
				subjectOptions,
				'subjectDropdown'
			)}
		</div>
	)
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(CapabilityDropdown)
