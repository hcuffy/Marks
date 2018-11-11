import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { actionCreators } from '../actions/index'
import { cleanAndSortData } from './List'

const Subjects = ({ allClassData, selectClass, actions }) => {
	const subjects = cleanAndSortData(allClassData)
	const subjectOptions = subjects.map((data, idx) => (
		<DropdownItem key={idx}>{data.Name}</DropdownItem>
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
		</div>
	)
}

const mapStateToProps = state => ({ selectClass: state.selectClass })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Subjects)
