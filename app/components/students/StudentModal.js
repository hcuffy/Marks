import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { modalFrame } from '../helpers/editModal'
import { actionCreators } from '../../actions/index'
import { cleanAndFilterData } from '../rooms/helpers/formHelpers'
import generateFields from './helpers/modalHelper'

const StudentModal = ({ t, students, classdata, actions }) => {
	const { studentId, studentModal } = students

	const requiredStudent = cleanAndFilterData(students.students, {
		id: studentId
	})
	const studentFields = generateFields(t, requiredStudent, classdata)

	const hiddenInput = <input type="hidden" name="studentId" data-id={studentId} />

	const footerData = {
		dataId: studentId,
		nameId: null,
		closeId: studentId,
		deleteAction: actions.deleteSingleStudent,
		closeAction: actions.showStudentModal
	}

	return (
		<div>
			{modalFrame(
				t,
				studentModal,
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
)(withNamespaces()(StudentModal))
