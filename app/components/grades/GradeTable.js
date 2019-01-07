import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactTable from 'react-table'
import { actionCreators } from '../../actions/index'
import styles from '../styles/grades.css'
import { GradeColumns } from './GradeColumns'
import GradeDropdown from './GradeDropdown'

const GradeTable = () => {
	const data = []

	return (
		<div className={styles.div_wrapper}>
			<h2 className={styles.center_header}>Grades</h2>
			<GradeDropdown />
			<ReactTable
				data={data}
				noDataText="No Data To Show"
				columns={GradeColumns()}
				className="-striped -highlight"
				defaultPageSize={14}
				style={{ height: '660px' }}
			/>
		</div>
	)
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(GradeTable)
