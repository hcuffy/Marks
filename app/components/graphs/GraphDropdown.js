import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import styles from './styles/graphs.css'
import { sortData } from '../rooms/ClassList'
import { getClassList, getSubjectList } from '../helpers/dropdowns'

const GraphDropdown = ({ classData, graphData, subjectData, actions }) => {
	const cleanedClassList = sortData(classData)
	const classOptions = getClassList(cleanedClassList)
	const subjectOptions = getSubjectList(
		{ selectedRoom: graphData.classroom },
		subjectData
	)
	return (
		<div className={styles.dropdown_main_div}>
			<div className={styles.dropdown_div}>
				<Dropdown
					isOpen={graphData.classroomDropdown}
					toggle={actions.openGraphClassList}
				>
					<DropdownToggle color="info" caret>
						Select Class
					</DropdownToggle>
					<DropdownMenu>{classOptions}</DropdownMenu>
				</Dropdown>
			</div>
			<div className={styles.dropdown_div}>
				<Dropdown isOpen={graphData.openSubList} toggle={actions.displayGraph}>
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
	classData: state.classData,
	subjectData: state.subjectData,
	graphData: state.graphData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GraphDropdown)
