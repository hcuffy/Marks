import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import { cleanAndFilterData } from '../rooms/RoomModal'
import styles from './styles/subject.css'

const _ = require('lodash')

const getClassroomId = dataList => {
	if (_.isEmpty(dataList) || _.isNil(dataList)) {
		return []
	}
	return dataList[0].ClassroomId
}

const SubjectModal = ({ filteredData, subjectModal, actions }) => {
	const requiredSubject = cleanAndFilterData(filteredData, subjectModal)
	const selectedSubject = _.keys(requiredSubject).map((data, idx) => (
		<div key={idx} className={styles.modal_form_div}>
			<label className={styles.modal_form_label} htmlFor={`${data}_Id`}>
				{data}:
			</label>
			<input
				name={data}
				className={`${styles.badge_number} form-control`}
				data-id={`${data}_Id`}
				type="text"
				defaultValue={requiredSubject[data]}
			/>
		</div>
	))
	const classroomId = (
		<input type="hidden" name="ClassroomId" data-id={getClassroomId(filteredData)} />
	)

	const subjectId = <input type="hidden" name="SubjectId" data-id={subjectModal.id} />

	return (
		<div>
			<Modal isOpen={subjectModal.showSubjectModal} backdrop>
				<ModalHeader>{`Edit: ${requiredSubject.Abbreviation}`}</ModalHeader>
				<form onSubmit={actions.updateSubject} method="POST">
					<ModalBody>
						{selectedSubject}
						{classroomId}
						{subjectId}
					</ModalBody>
					<ModalFooter>
						<Button
							type="button"
							id={subjectModal.id}
							onClick={actions.deleteSingleSubject}
							color="danger"
						>
							Delete
						</Button>

						<Button type="submit" color="primary">
							Update
						</Button>
						<Button
							type="button"
							data-id={subjectModal.id}
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
