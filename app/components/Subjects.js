import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { actionCreators } from '../actions/index'
import { cleanAndSortData } from './List'

const _ = require('lodash')

function findSubject(allClasses, specificClass) {
	console.log(specificClass)
	if (allClasses.length <= 0 || allClasses === null || specificClass === undefined) {
		return 'No Data To Show'
	}
	const chosenSubject = _.find(allClasses, ['Name', specificClass])
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
		<div>
			<h4>Class & Subjects</h4>
			<Dropdown isOpen={selectClass.openModal} toggle={actions.openClassList}>
				<DropdownToggle color="info" caret>
					Select Class
				</DropdownToggle>
				<DropdownMenu>{subjectOptions}</DropdownMenu>
			</Dropdown>
			<h5>{classSubjects}</h5>
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
