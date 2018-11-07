// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import styles from '../styles/room.css'

const _ = require('lodash')

function cleanAndFilterData(objectToClean, roomToClean) {
	const requiredProp = _.find(objectToClean, { _id: roomToClean.id })
	const cleanedData = _.omit(requiredProp, ['_id',
		'createdAt',
		'updatedAt',
		'Subjects'])

	return cleanedData
}

const Room = ({ modalData, roomModal, actions }) => {
	const selectedRoom = cleanAndFilterData(modalData, roomModal)
	const clickedRoom = _.keys(selectedRoom).map((data, idx) => (
		<div key={idx} className={styles.form_div}>
			<label className={styles.form_label} htmlFor={`${data}_Id`}>
				{data}:
			</label>
			<input
				name={data}
				className={`${styles.form_input} form-control`}
				id={`${data}_Id`}
				type="text"
				defaultValue={selectedRoom[data]}
			/>
		</div>
	))
	return (
		<div>
			<Modal isOpen={roomModal.showModal} backdrop>
				<ModalHeader>{`Edit: ${selectedRoom.Name}`}</ModalHeader>
				<ModalBody>{clickedRoom}</ModalBody>
				<ModalFooter>
					<Button id={roomModal.id} onClick={actions.removeRoom} color="danger">
						Delete
					</Button>
					<Button color="primary">Save</Button>
					<Button color="secondary">Cancel</Button>
				</ModalFooter>
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
)(Room)
