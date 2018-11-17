import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { actionCreators } from '../actions/index'
import { cleanAndSortData } from './List'
import styles from './styles/subjects.css'

const _ = require('lodash')

function findSubject(allClasses, chosenClass) {
	if (_.isNil(allClasses) || _.isNil(chosenClass) || chosenClass === 'Select Class') {
		return 'No Data To Show'
	}
	const chosenSubject = _.find(allClasses, ['Name', chosenClass])

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
				<h4>Subjects</h4>
				<Dropdown isOpen={selectClass.openModal} toggle={actions.openClassList}>
					<DropdownToggle color="info" caret>
						Select Class
					</DropdownToggle>
					<DropdownMenu>{subjectOptions}</DropdownMenu>
				</Dropdown>
				<h5>{classSubjects}</h5>
			</div>
			<div className={styles.subject_right}>
				<h4>Add Subjects</h4>
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
