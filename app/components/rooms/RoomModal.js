import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { modalFrame } from '../helpers/editModal'
import styles from './styles/room.css'

const _ = require('lodash')

export const cleanAndFilterData = (objectToClean, roomToClean) => {
	const requiredProp = _.find(objectToClean, { _id: roomToClean.id })
	const cleanedData = _.omit(requiredProp, [
		'_id',
		'createdAt',
		'updatedAt',
		'Subjects',
		'Tests',
		'ClassroomId',
		'Room'
	])
	return cleanedData
}

const createInputs = selectedRoom =>
	_.keys(selectedRoom).map((data, idx) => (
		<div key={idx} className={styles.form_div}>
			<label className={styles.form_label} htmlFor={`${data}_Id`}>
				{data}:
			</label>
			<input
				name={data}
				className={`${styles.form_input} form-control`}
				data-id={`${data}_Id`}
				type="text"
				defaultValue={selectedRoom[data]}
			/>
		</div>
	))

const RoomModal = ({ modalData, classModalData, actions }) => {
	const selectedRoom = cleanAndFilterData(modalData, classModalData)
	const clickedRoom = createInputs(selectedRoom)
	console.log(selectedRoom)
	const hiddenInput = <input type="hidden" name="OldName" data-id={selectedRoom.Name} />
	const footerData = {
		dataId: classModalData.id,
		nameId: undefined,
		closeId: classModalData.id,
		deleteAction: actions.deleteRoom,
		closeAction: actions.roomModalDisplay
	}
	return (
		<div>
			{modalFrame(
				classModalData.showModal,
				actions.updateRoom,
				clickedRoom,
				hiddenInput,
				footerData
			)}
		</div>
	)
}

const mapStateToProps = state => ({ classModalData: state.classModalData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RoomModal)
