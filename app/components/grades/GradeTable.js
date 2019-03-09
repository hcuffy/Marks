import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactTable from 'react-table'
import { t } from '../../utils/translationUtil'
import { actionCreators } from '../../actions/index'
import styles from './styles/grades.css'
import { gradeColumns } from './helpers/gradeColumns'
import { gradeInfo } from './helpers/gradeInfo'
import GradeDropdown from './GradeDropdown'

const _ = require('lodash')

const tableOptions = () => ({
	defaultPageSize: 20,
	noDataText: t('grades.noData'),
	previousText: t('grades.previousPage'),
	nextText: t('grades.nextPage'),
	pageText: t('grades.textPage'),
	ofText: t('grades.pageOf'),
	rowsText: t('grades.textRows')
})

const GradeTable = ({ gradeData, students, actions }) => {
	const data = gradeInfo(gradeData, students)
	return (
		<div className={styles.div_wrapper}>
			<h4 className={styles.center_header}>{t('grades.gradesTitle')}</h4>
			<GradeDropdown />
			<ReactTable
				data={_.sortBy(data, ['name'], ['asc'])}
				columns={gradeColumns({ newData: data, actions })}
				className="-striped -highlight"
				style={{ height: '650px' }}
				{...tableOptions()}
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
