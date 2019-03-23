import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import RoomModal from './RoomModal'
import { sortData, classInputs } from './helpers/formHelpers'
import styles from './styles/room.css'

const ClassList = ({ t, listData, actions }) => {
	const cleanedData = sortData(listData)
	const listInputs = classInputs(cleanedData, actions.roomModalDisplay)

	return (
		<div className={styles.list_div}>
			<RoomModal t={t} modalData={cleanedData} />
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
)(withNamespaces()(ClassList))
