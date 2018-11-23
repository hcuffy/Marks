import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import styles from './styles/list.css'
import Room from './Modals/Room'

const _ = require('lodash')

export function cleanAndSortData(clean) {
	const requiredProp = _.pick(clean, ['classData'])
	const sortedProp = _.sortBy(requiredProp.classData, ['Name'], ['asc'])

	return sortedProp
}

const ClassList = ({ listData, actions }) => {
	const cleanedData = cleanAndSortData(listData)
	const listInputs = cleanedData.map((data, idx) => (
		<button
			key={idx}
			id={data._id}
			type="button"
			className={`list-group-item list-group-item-action ${styles.list_btn}`}
			onClick={actions.handleRoomData}
		>
			{data.Name}
			<span className={`badge badge-warning badge-pill ${styles.badge_number}`}>
				{data.Subjects.length}
			</span>
		</button>
	))
	return (
		<div className={styles.list_div}>
			<Room modalData={cleanedData} />
			<div className="list-group list-group-flush">{listInputs}</div>
		</div>
	)
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(ClassList)
