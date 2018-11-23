import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { actionCreators } from '../actions/index'
import { cleanAndSortData } from './List'
import styles from './styles/subjects.css'
import SubjectForm from './Modals/SubjectForm'

const _ = require('lodash')

function findSubject(allClasses, chosenClass) {
	if (_.isNil(allClasses) || _.isNil(chosenClass) || chosenClass === 'Select Class') {
		return 'No Data To Show'
	}
	const chosenSubject = _.chain(allClasses)
		.find(['Name', chosenClass])
		.pick(['Subjects'])
		.value()
	console.log(chosenSubject)
	return chosenSubject.Name
}
const Subjects = ({ allClassData, selectClass, actions }) => {
	const subjects = cleanAndSortData(allClassData)

	const classSubjects = findSubject(subjects, selectClass.subject)

	const subjectOptions = subjects.map((data, idx) => (
		<DropdownItem key={idx} name={data.Name} onClick={actions.showSubject}>
			{data.Name}
		</DropdownItem>
	))
	return (
		<div className={styles.main_div}>
			<div className={styles.subject_left}>
				<h4 className={styles.center_header}>Subjects</h4>
				<Dropdown isOpen={selectClass.openModal} toggle={actions.openClassList}>
					<DropdownToggle color="info" caret>
						Select Class
					</DropdownToggle>
					<DropdownMenu>{subjectOptions}</DropdownMenu>
				</Dropdown>
				<h5>{classSubjects}</h5>
			</div>
			<div className={styles.subject_right}>
				<h4 className={styles.center_header}>Add Subjects</h4>
				<SubjectForm selectClass={selectClass} subjects={subjects} />
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	selectClass: state.selectClass
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Subjects)
