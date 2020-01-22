import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { Badge, Button } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import StudentModal from './StudentModal'
import css from './styles/students.css'

const _ = require('lodash')

const generateListBtn = (students, action) =>
	students.map((data, idx) => (
		<Button
			key={idx}
			data-id={data._id}
			className={`list-group-item list-group-item-action ${css.list_btn}`}
			onClick={action}
		>
			{`${data.firstname} ${data.lastname}`}

			{data.gender === 'male' ? (
				<Badge className={`badge-pill ${css.badge_boy}`}>
					<i className="fas fa-mars" />
				</Badge>
			) : (
				<Badge className={`badge-pill ${css.badge_girl}`}>
					<i className="fas fa-venus" />
				</Badge>
			)}
		</Button>
	))

const generateStudentList = (students, actions) => {
	if (_.isUndefined(students)) {
		return []
	}
	const sortedStudents = _.sortBy(students, ['firstname'], ['asc'])

	return generateListBtn(sortedStudents, actions.showStudentModal)
}

const StudentList = ({ t, students, actions }) => {
	const listData = generateStudentList(students, actions)

	return (
		<div className={css.student_list}>
			<h4 className={css.center_sub_header}>{t('student.list')}</h4>
			<div className={css.list_div}>
				<div className="list-group list-group-flush">{listData}</div>

				<StudentModal t={t} />
			</div>
		</div>
	)
}
const mapStateToProps = state => ({
	students: state.studentData.students
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(StudentList))
