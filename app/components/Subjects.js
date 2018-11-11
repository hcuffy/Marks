import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { actionCreators } from '../actions/index'

const Subjects = ({ allClassData, subjectSelect, actions }) => {
	console.log(allClassData)
	return (
		<div>
			<h4>Class & Subjects</h4>
			<Dropdown isOpen={subjectSelect.openModal} toggle={actions.openSubjectDropdown}>
				<DropdownToggle caret>Select Class</DropdownToggle>
				<DropdownMenu>
					<DropdownItem>Another Action</DropdownItem>
					<DropdownItem>Another Action</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	)
}

const mapStateToProps = state => ({ subjectSelect: state.subjectSelect })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Subjects)
