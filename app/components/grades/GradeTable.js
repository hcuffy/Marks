import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactTable from 'react-table'
import { actionCreators } from '../../actions/index'
import styles from '../styles/grades.css'
import { gradeColumns } from './helpers/gradeColumns'
import { gradeInfo } from './helpers/gradeInfo'
import GradeDropdown from './GradeDropdown'

const _ = require('lodash')

const GradeTable = ({ gradeData, students, actions }) => {
	const data = gradeInfo(gradeData, students)
	return (
		<div className={styles.div_wrapper}>
			<h2 className={styles.center_header}>Grades</h2>
			<GradeDropdown />
			<h4 className={styles.center_header}>{`${gradeData.classroom} : ${
				gradeData.subjectName
			}`}</h4>
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
