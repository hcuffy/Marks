import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from '../styles/list.css'
import SubjectModal from './SubjectModal'

const _ = require('lodash')

export function filterSubjects(subjectData, chosenClass) {
	if (_.isNil(subjectData) || _.isNil(chosenClass) || chosenClass === 'Select Class') {
		return []
	}

	const chosenSubjects = _.chain(subjectData)
		.filter(['Room', chosenClass.Name])
		.orderBy(['Abbreviation'], [subJ => subJ.Abbreviation.toLowerCase()], ['asc'])
		.value()
	return chosenSubjects
}

const SubjectList = ({ selectedSubject, subjectData, actions }) => {
	const filteredData = filterSubjects(subjectData.data, selectedSubject)
	const subjectList = filteredData.map((data, idx) => (
		<button
			key={idx}
			id={data._id}
			type="button"
			className={`list-group-item list-group-item-action ${styles.list_btn}`}
			onClick={actions.subjectModalDisplay}
		>
			{data.Abbreviation}
			<span className={`badge badge-warning badge-pill ${styles.badge_number}`}>
				{data.Tests.length}
			</span>
		</button>
	))

	return (
		<div className={styles.list_div}>
			<SubjectModal filteredData={filteredData} />
			<div className="list-group list-group-flush">{subjectList}</div>
		</div>
	)
}
const mapStateToProps = state => ({
	subjectData: state.subjectData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SubjectList)
