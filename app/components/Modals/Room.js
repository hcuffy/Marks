// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap'
import { actionCreators } from '../../actions/index'

const _ = require('lodash')

const Room = ({ modalData, roomModal }) => {
	const selectedRoom = _.find(modalData, { _id: roomModal.id })
	console.log(selectedRoom)
	const clickedRoom = _.keys(modalData).map((data, idx) => (
		<div key={idx}>
			<label htmlFor="test">test:</label>
			<Input
				name="test"
				className="form-control"
				id="test"
				type="text"
				defaultValue="test"
			/>
		</div>
	))
	return (
		<div>
			<Modal isOpen={roomModal.showModal} backdrop>
				<ModalHeader>Modal title</ModalHeader>
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
