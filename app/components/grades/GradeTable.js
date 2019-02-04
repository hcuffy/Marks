import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactTable from 'react-table'
import { actionCreators } from '../../actions/index'
import styles from './styles/grades.css'
import { gradeColumns } from './helpers/gradeColumns'
import { gradeInfo } from './helpers/gradeInfo'
import GradeDropdown from './GradeDropdown'

const _ = require('lodash')

const dynamicHeader = ({ classroom, subjectName }) => {
	if (
		subjectName === '' ||
		_.includes(subjectName, 'Select') ||
		subjectName === '-' ||
		subjectName === classroom
	) {
		return <h4 className={styles.center_header}>-</h4>
	}

	if (classroom === '' || _.includes(classroom, 'Select' || classroom === '-')) {
		return <h4 className={styles.center_header}>-</h4>
	}
	return <h4 className={styles.center_header}>{`${classroom} : ${subjectName}`}</h4>
}

const GradeTable = ({ gradeData, students, actions }) => {
	const data = gradeInfo(gradeData, students)
	return (
		<div className={styles.div_wrapper}>
			<h2 className={styles.center_header}>Grades</h2>
			<GradeDropdown />
			{dynamicHeader(gradeData)}
			<ReactTable
				data={_.sortBy(data, ['name'], ['asc'])}
				noDataText="No Data To Show"
				columns={gradeColumns({ newData: data, actions })}
				className="-striped -highlight"
				defaultPageSize={20}
				style={{ height: '570px' }}
			/>
		</div>
	)
}
const mapStateToProps = state => ({
	gradeData: state.gradeData,
	students: state.studentData.students
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GradeTable)
