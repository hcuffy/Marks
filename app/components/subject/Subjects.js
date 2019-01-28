import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import { sortData } from '../rooms/ClassList'
import styles from './styles/subject.css'
import SubjectForm from './SubjectForm'
import SubjectList from './SubjectList'

const _ = require('lodash')

const Subjects = ({ classData, classListData, actions }) => {
	const subjects = sortData(classData)
	const selectedSubject = _.find(subjects, ['Name', classListData.subject])

	const subjectOptions = subjects.map((data, idx) => (
		<DropdownItem key={idx} name={data.Name} onClick={actions.showSubject}>
			{data.Name}
		</DropdownItem>
	))
	return (
		<div className={styles.main_div}>
			<div className={styles.subject_left}>
				<h4 className={styles.center_header}>Subjects</h4>
				<Dropdown isOpen={classListData.openModal} toggle={actions.openClassList}>
					<DropdownToggle color="info" caret>
						Select Class
					</DropdownToggle>
					<DropdownMenu>{subjectOptions}</DropdownMenu>
				</Dropdown>
				<SubjectList selectedSubject={selectedSubject} />
			</div>
			<div className={styles.subject_right}>
				<h4 className={styles.center_header}>Add Subjects</h4>
				<SubjectForm classListData={classListData} subjects={subjects} />
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	classListData: state.classListData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Subjects)
