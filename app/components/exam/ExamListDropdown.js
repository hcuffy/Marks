import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import styles from '../styles/exam.css'

const ExamListDropdown = () => (
	<div className={styles.dropdown_main_div}>
		<div className={styles.dropdown_div}>
			<Dropdown isOpen={false} toggle={() => 'test'}>
				<DropdownToggle color="info" caret>
					Select Class
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem>test</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
		<div className={styles.dropdown_div}>
			<Dropdown isOpen={false} toggle={() => 'test'}>
				<DropdownToggle color="info" caret>
					Select Subject
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem>test</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	</div>
)

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(ExamListDropdown)
