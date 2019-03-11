import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { t } from '../../utils/translationUtil'
import { actionCreators } from '../../actions/index'
import ClassList from './ClassList'
import Subjects from '../subject/Subjects'
import { addRoomForm, createFormInputs, checkChange } from './helpers/formHelpers'
import styles from './styles/room.css'

const _ = require('lodash')

const Classes = ({ classData, actions }) => {
	const formLabels = _.omit(classData, ['classData', 'check'])
	const formInputs = createFormInputs(formLabels)

	checkChange(classData, actions)
	return (
		<div>
			{addRoomForm(formInputs, actions)}
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
)(Classes)
