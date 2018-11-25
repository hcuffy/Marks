import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import { cleanAndFilterData } from './RoomModal'
import styles from './styles/room.css'

const _ = require('lodash')

const SubjectModal = ({ filteredData, subjectModal, actions }) => {
	const requiredSubject = cleanAndFilterData(filteredData, subjectModal)
	const selectedSubject = _.keys(requiredSubject).map((data, idx) => (
		<div key={idx} className={styles.form_div}>
			<label className={styles.form_label} htmlFor={`${data}_Id`}>
				{data}:
			</label>
			<input
				name={data}
				className={`${styles.form_input} form-control`}
				id={`${data}_Id`}
				type="text"
				defaultValue={requiredSubject[data]}
			/>
		</div>
	))

	const ClassroomId = (
		<input type="hidden" name="ClassroomId" value={requiredSubject.ClassroomId} />
	)
	return (
		<div>
			<Modal isOpen={subjectModal.showSubjectModal} backdrop>
				<ModalHeader>{`Edit: ${requiredSubject.Abbreviation}`}</ModalHeader>
				<form>
					<ModalBody>
						{selectedSubject}
						{ClassroomId}
					</ModalBody>
					<ModalFooter>
						<Button type="button" color="danger">
							Delete
						</Button>

						<Button type="submit" color="primary">
							Update
						</Button>
						<Button
							type="button"
							id={subjectModal.id}
							onClick={actions.subjectModalDisplay}
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

const mapStateToProps = state => ({ subjectModal: state.subjectModal })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SubjectModal)
