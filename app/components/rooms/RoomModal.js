import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { actionCreators } from '../../actions/index'
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

const RoomModal = ({ modalData, roomModal, actions }) => {
	const selectedRoom = cleanAndFilterData(modalData, roomModal)
	const clickedRoom = _.keys(selectedRoom).map((data, idx) => (
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
	return (
		<div>
			<Modal isOpen={roomModal.showModal} backdrop>
				<ModalHeader charCode="Y">{`Edit: ${selectedRoom.Name}`}</ModalHeader>
				<form onSubmit={actions.updateRoom} method="POST">
					<ModalBody>
						{clickedRoom}
						<input type="hidden" name="OldName" data-id={selectedRoom.Name} />
					</ModalBody>
					<ModalFooter>
						<Button
							type="button"
							data-id={roomModal.id}
							onClick={actions.deleteRoom}
							color="danger"
						>
							Delete
						</Button>

						<Button type="submit" color="primary">
							Update
						</Button>
						<Button
							type="button"
							data-id={roomModal.id}
							onClick={actions.roomModalDisplay}
							color="secondary"
						>
							Close
						</Button>
					</ModalFooter>
				</form>
			</Modal>
		</div>
	)
}

const mapStateToProps = state => ({ roomModal: state.roomModal })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RoomModal)
