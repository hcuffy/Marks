import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withNamespaces } from 'react-i18next'
import { actionCreators } from '../../actions/index'
import ClassList from './ClassList'
import Subjects from '../subject/Subjects'
import { addRoomForm, createFormInputs, checkChange } from './helpers/formHelpers'
import styles from './styles/room.css'

const _ = require('lodash')

const Classes = ({ t, classData, actions }) => {
	const formLabels = _.omit(classData, ['classData', 'check'])
	const formInputs = createFormInputs(t, formLabels)

	checkChange(classData, actions)
	return (
		<div>
			{addRoomForm(t, formInputs, actions)}
			<div>
				<h4 className={styles.list_header}>{t('room.listHeader')}</h4>
				<ClassList listData={classData} />
			</div>
			<Subjects classData={classData} />
		</div>
	)
}
const mapStateToProps = state => ({
	classData: state.classData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(Classes))
