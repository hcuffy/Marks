import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { modalFrame } from '../helpers/editModal'
import { actionCreators } from '../../actions/index'
import { cleanAndFilterData } from '../rooms/helpers/formHelpers'
import generateFields from './helpers/modalHelper'

const StudentModal = ({ students, classdata, actions }) => {
	const requiredStudent = cleanAndFilterData(students.students, {
		id: students.studentId
	})
	const studentFields = generateFields(requiredStudent, classdata)

	const hiddenInput = (
		<input type="hidden" name="studentId" data-id={students.studentId} />
	)
	const footerData = {
		dataId: students.studentId,
		nameId: null,
		closeId: students.studentId,
		deleteAction: actions.deleteSingleStudent,
		closeAction: actions.showStudentModal
	}
	return (
		<div>
			{modalFrame(
				students.studentModal,
				actions.updateStudent,
				studentFields,
				hiddenInput,
				footerData
			)}
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
