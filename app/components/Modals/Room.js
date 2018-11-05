// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import styles from '../styles/classroom.css'

const _ = require('lodash')

function cleanAndFilterData(objectToClean, roomToClean) {
	const requiredProp = _.find(objectToClean, { _id: roomToClean.id })
	const cleanedData = _.omit(requiredProp, ['_id', 'createdAt', 'updatedAt'])

	return cleanedData
}

const Room = ({ modalData, roomModal }) => {
	const selectedRoom = cleanAndFilterData(modalData, roomModal)
	const clickedRoom = _.keys(selectedRoom).map((data, idx) => (
		<div key={idx}>
			<label className={styles.form.label} htmlFor={`${data}Id`}>
				{data}:
			</label>
			<Input
				name={data}
				className="form-control"
				id={`${data}Id`}
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
					<Button color="danger">Delete</Button>
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
