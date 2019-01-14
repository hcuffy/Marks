import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import styles from '../styles/grades.css'
import { sortData } from '../rooms/ClassList'
import { getClassList, getSubjectList } from '../helpers/dropdowns'

const GradeDropdown = ({ classData, gradeData, subjectData, actions }) => {
	const cleanedClassList = sortData(classData)
	const classOptions = getClassList(cleanedClassList)
	const subjectOptions = getSubjectList(
		{ selectedRoom: gradeData.classroom },
		subjectData
	)
	return (
		<div className={styles.dropdown_main_div}>
			<div className={styles.dropdown_div}>
				<Dropdown
					isOpen={gradeData.classroomDropdown}
					toggle={actions.openGradeClassList}
				>
					<DropdownToggle color="info" caret>
						Select Class
					</DropdownToggle>
					<DropdownMenu>{classOptions}</DropdownMenu>
				</Dropdown>
			</div>
			<div className={styles.dropdown_div}>
				<Dropdown isOpen={gradeData.subDrop} toggle={actions.displayGradeData}>
					<DropdownToggle color="info" caret>
						Select Subject
					</DropdownToggle>
					<DropdownMenu>{subjectOptions}</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	classData: state.allClassData,
	subjectData: state.subjectData,
	examData: state.examData,
	gradeData: state.gradeData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GradeDropdown)
