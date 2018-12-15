import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import { cleanAndFilterData } from '../rooms/RoomModal'
import styles from '../styles/exam.css'

const _ = require('lodash')

function generateFields(chosenExam) {
	console.log(chosenExam.Weight)
	const examFields = (
		<div>
			<div className={styles.form_div_edit}>
				<label
					className={styles.form_label_edit}
					htmlFor={`${_.invert(chosenExam)[chosenExam.Title]}_Id`}
				>
					{_.invert(chosenExam)[chosenExam.Title]}:
				</label>
				<input
					name={_.invert(chosenExam)[chosenExam.Title]}
					className={`${styles.form_input} form-control`}
					id={`${_.invert(chosenExam)[chosenExam.Title]}_Id`}
					type="text"
					defaultValue={chosenExam.Title}
				/>
			</div>
			<div className={styles.form_div_edit}>
				<label
					className={styles.form_label_edit}
					htmlFor={`${_.invert(chosenExam)[chosenExam.Weight]}_Id`}
				>
					{_.invert(chosenExam)[chosenExam.Weight]}:
				</label>
				<input
					name={_.invert(chosenExam)[chosenExam.Weight]}
					className={`${styles.form_input} form-control`}
					id={`${_.invert(chosenExam)[chosenExam.Weight]}_Id`}
					type="number"
					min="1"
					max="4"
					step="0.5"
					defaultValue={chosenExam.Weight}
				/>
			</div>
			<div className={styles.form_div_edit}>
				<label
					className={styles.form_label_edit}
					htmlFor={`${_.invert(chosenExam)[chosenExam.Date]}_Id`}
				>
					{_.invert(chosenExam)[chosenExam.Date]}:
				</label>
				<input
					name={_.invert(chosenExam)[chosenExam.Date]}
					className={`${styles.form_input} form-control`}
					id={`${_.invert(chosenExam)[chosenExam.Date]}_Id`}
					type="date"
					defaultValue={chosenExam.Date}
				/>
			</div>
		</div>
	)

	return examFields
}
const ExamModal = ({ examModal, examId, exams, actions }) => {
	const requiredExam = cleanAndFilterData(exams, { id: examId })
	// const chosenExam = _.find(exams, ['_id', examId])

	const examFormData = generateFields(requiredExam)
	console.log(requiredExam)

	return (
		<div>
			<Modal isOpen={examModal} backdrop>
				<ModalHeader>Edit:</ModalHeader>
				<form method="POST">
					<ModalBody>{examFormData}</ModalBody>
					<ModalFooter>
						<Button type="button" color="danger">
							Delete
						</Button>

						<Button type="submit" color="primary">
							Update
						</Button>
						<Button onClick={actions.showSingleExam} color="secondary">
							Close
						</Button>
					</ModalFooter>
				</form>
			</Modal>
		</div>
	)
}
const mapStateToProps = state => ({
	examModal: state.examData.examModal,
	examId: state.examData.examId,
	exams: state.examData.exams
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExamModal)
