import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { actionCreators } from '../../actions/index'
// import styles from './styles/room.css'

const SubjectModal = ({ filteredData, subjectModal }) => {
	console.log(subjectModal)

	return (
		<div>
			<Modal isOpen={subjectModal.showSubjectModal} backdrop>
				<ModalHeader>Edit: </ModalHeader>
				<form>
					<ModalBody>
						<input type="text" name="OldName" />
					</ModalBody>
					<ModalFooter>
						<Button type="button" color="danger">
							Delete
						</Button>

						<Button type="submit" color="primary">
							Update
						</Button>
						<Button type="button" color="secondary">
							Close
						</Button>
					</ModalFooter>
				</form>
			</Modal>
		</div>
	)
}

const mapStateToProps = state => ({ subjectModal: state.subjectModal })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SubjectModal)
