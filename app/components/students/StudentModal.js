import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import { cleanAndFilterData } from '../rooms/RoomModal'
import generateFields from './helpers/modalHelper'

const StudentModal = ({ students, classdata, actions }) => {
	const requiredStudent = cleanAndFilterData(students.students, {
		id: students.studentId
	})
	const { studentFields, dropDowns } = generateFields(requiredStudent, classdata)
	const idField = <input type="hidden" name="studentId" data-id={students.studentId} />
	return (
		<div>
			<Modal isOpen={students.studentModal} backdrop>
				<ModalHeader>Edit Student Data:</ModalHeader>
				<form onSubmit={actions.updateStudent} method="POST">
					<ModalBody>
						{studentFields}
						{dropDowns}
						{idField}
					</ModalBody>
					<ModalFooter>
						<Button
							data-id={students.studentId}
							onClick={actions.deleteSingleStudent}
							color="danger"
						>
							Delete
						</Button>

						<Button type="submit" color="primary">
							Update
						</Button>
						<Button onClick={actions.showStudentModal} color="secondary">
							Close
						</Button>
					</ModalFooter>
				</form>
			</Modal>
		</div>
	)
}

const mapStateToProps = state => ({
	students: state.studentData,
	classdata: state.classData.classData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentModal)
