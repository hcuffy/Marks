import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import SubjectModal from './SubjectModal'
import { Button } from 'reactstrap'
import css from './styles/subject.css'

const _ = require('lodash')

export const filterSubjects = (subjectData, chosenClass) => {
	if (
		_.isNil(subjectData) ||
		_.isNil(chosenClass) ||
		chosenClass === 'Select Class'
	) {
		return []
	}

	const chosenSubjects = _.chain(subjectData)
		.filter(['classroomId', chosenClass._id])
		.orderBy(
			['abbreviation'],
			[subJ => subJ.abbreviation.toLowerCase()],
			['asc']
		)
		.value()

	return chosenSubjects
}

const listOfButtons = (filteredData, action) =>
	filteredData.map((data, idx) => (
		<Button
			key={idx}
			data-id={data._id}
			className={`list-group-item list-group-item-action ${css.list_btn}`}
			onClick={action}
		>
			{data.abbreviation}

			<span className={`badge badge-warning badge-pill ${css.badge_number}`}>
				{data.tests.length}
			</span>
		</Button>
	))

const SubjectList = ({ t, selectedSubject, subjectData, actions }) => {
	const filteredData = filterSubjects(subjectData.data, selectedSubject)
	const subjectList = listOfButtons(filteredData, actions.subjectModalDisplay)

	return (
		<div className={css.list_div}>
			<SubjectModal t={t} filteredData={filteredData} />

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
)(withNamespaces()(SubjectList))
