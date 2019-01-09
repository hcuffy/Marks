import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactTable from 'react-table'
import { actionCreators } from '../../actions/index'
import styles from '../styles/grades.css'
import { GradeColumns } from './helpers/gradeColumns'
import GradeDropdown from './GradeDropdown'

const GradeTable = ({ gradeData }) => {
	const data = []

	return (
		<div className={styles.div_wrapper}>
			<h2 className={styles.center_header}>Grades</h2>
			<GradeDropdown />
			<h4 className={styles.center_header}>{`${gradeData.classroom} : ${
				gradeData.subjectName
			}`}</h4>
			<ReactTable
				data={data}
				noDataText="No Data To Show"
				columns={GradeColumns()}
				className="-striped -highlight"
				defaultPageSize={20}
				style={{ height: '570px' }}
			/>
		</div>
	)
}
const mapStateToProps = state => ({
	gradeData: state.gradeData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GradeTable)
