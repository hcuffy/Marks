import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import styles from '../styles/exam.css'
import { sortData } from '../rooms/ClassList'

const _ = require('lodash')

function getClassList(classlist) {
	const items = classlist.map((data, idx) => (
		<DropdownItem key={idx} name={data.Name}>
			{data.Name}
		</DropdownItem>
	))

	return items
}

function getSubjectList(examData, subjectData) {
	const selectedSubjects = _.filter(subjectData.data, ['Room', examData.selectedRoom])
	const items = selectedSubjects.map((data, idx) => (
		<DropdownItem key={idx} name={data.Name} id={data._id}>
			{data.Name}
		</DropdownItem>
	))
	return items
}

const ExamListDropdown = ({ classData, examData, subjectData, actions }) => {
	const cleanedClassList = sortData(classData)
	const classOptions = getClassList(cleanedClassList)
	const subjectOptions = getSubjectList(examData, subjectData, actions)

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
