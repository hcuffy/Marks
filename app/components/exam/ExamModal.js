import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { actionCreators } from '../../actions/index'
// import styles from '../styles/exam.css'

// const _ = require('lodash')

const ExamModal = () => (
	<div>
		<Modal isOpen={false} backdrop>
			<ModalHeader>Edit</ModalHeader>
			<form method="POST">
				<ModalBody />
				<ModalFooter>
					<Button type="button" color="danger">
						Delete
					</Button>

					<Button type="submit" color="primary">
						Update
					</Button>
					<Button color="secondary">Close</Button>
				</ModalFooter>
			</form>
		</Modal>
	</div>
)

const mapStateToProps = state => ({ subjectModal: state.subjectModal })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExamModal)
