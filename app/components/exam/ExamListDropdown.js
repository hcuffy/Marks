import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import styles from '../styles/exam.css'
import { sortData } from '../rooms/ClassList'
import { getClassList, getSubjectList } from '../helpers/dropdowns'

const ExamListDropdown = ({ classData, examData, subjectData, actions }) => {
	const cleanedClassList = sortData(classData)
	const classOptions = getClassList(cleanedClassList)
	const subjectOptions = getSubjectList(examData, subjectData)

	return (
		<div className={styles.dropdown_main_div}>
			<div className={styles.dropdown_div}>
				<Dropdown
					isOpen={examData.openClassDropdown}
					toggle={actions.openClassDropdownList}
				>
					<DropdownToggle color="info" caret>
						Select Class
					</DropdownToggle>
					<DropdownMenu>{classOptions}</DropdownMenu>
				</Dropdown>
			</div>
			<div className={styles.dropdown_div}>
				<Dropdown isOpen={examData.openSubList} toggle={actions.displayExamData}>
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
	examData: state.examData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExamListDropdown)
