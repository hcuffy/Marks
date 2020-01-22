import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import ReactTable from 'react-table'
import { actionCreators } from '../../actions/index'
import GradeDropdown from './GradeDropdown'
import { gradeColumns } from './helpers/gradeColumns'
import { gradeInfo } from './helpers/gradeInfo'
import css from './styles/grades.css'

const _ = require('lodash')

const tableOptions = t => ({
	defaultPageSize: 20,
	noDataText: t('grades.noData'),
	previousText: t('grades.previousPage'),
	nextText: t('grades.nextPage'),
	pageText: t('grades.textPage'),
	ofText: t('grades.pageOf'),
	rowsText: t('grades.textRows')
})

const GradeTable = ({ t, gradeData, students, actions }) => {
	const data = gradeInfo(gradeData, students)

	return (
		<div className={css.div_wrapper}>
			<h4 className={css.center_header}>{t('grades.gradesTitle')}</h4>

			<GradeDropdown t={t} />

			<ReactTable
				data={_.sortBy(data, ['name'], ['asc'])}
				columns={gradeColumns({ t, newData: data, actions })}
				className="-striped -highlight"
				style={{ height: '650px' }}
				{...tableOptions(t)}
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
)(withNamespaces()(GradeTable))
