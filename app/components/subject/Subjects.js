import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropdownItem } from 'reactstrap'
import { t, resolveLabel } from '../../utils/translationUtil'
import { createDropdown } from '../helpers/dropdowns'
import { actionCreators } from '../../actions/index'
import { sortData } from '../rooms/ClassList'
import styles from './styles/subject.css'
import SubjectForm from './SubjectForm'
import SubjectList from './SubjectList'

const _ = require('lodash')

const Subjects = ({ classData, classListData, actions }) => {
	const subjects = sortData(classData)
	const { subject, openModal } = classListData
	const selectedSubject = _.find(subjects, ['name', subject])

	const subjectOptions = subjects.map((data, idx) => (
		<DropdownItem key={idx} name={data.name} onClick={actions.showSubject}>
			{data.name}
		</DropdownItem>
	))
	return (
		<div className={styles.main_div}>
			<div className={styles.subject_left}>
				<h4 className={styles.center_header}>{t('room.subjectHeader')}</h4>
				{createDropdown(
					null,
					openModal,
					actions.openClassList,
					{ label: resolveLabel(subject, t('general.selectClass')) },
					subjectOptions
				)}
				<SubjectList selectedSubject={selectedSubject} />
			</div>
			<div className={styles.subject_right}>
				<h4 className={styles.center_header}>{t('room.addSubject')}</h4>
				<SubjectForm classListData={classListData} subjects={subjects} />
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	classListData: state.classListData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Subjects)
