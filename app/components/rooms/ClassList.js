import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from './styles/room.css'
import RoomModal from './RoomModal'

const _ = require('lodash')

export const sortData = clean => {
	const sortedProp = _.sortBy(clean.classData, ['Name'], ['asc'])

	return sortedProp
}

const ClassList = ({ listData, actions }) => {
	const cleanedData = sortData(listData)
	const listInputs = cleanedData.map((data, idx) => (
		<button
			key={idx}
			id={data._id}
			type="button"
			className={`list-group-item list-group-item-action ${styles.list_btn}`}
			onClick={actions.roomModalDisplay}
		>
			{data.Name}
			<span className={`badge badge-warning badge-pill ${styles.badge_number}`}>
				{data.Subjects.length}
			</span>
		</button>
	))
	return (
		<div className={styles.list_div}>
			<RoomModal modalData={cleanedData} />
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
