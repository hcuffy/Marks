import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import ClassList from './ClassList'
import Subjects from '../subject/Subjects'
import {
	addRoomForm,
	createFormInputs,
	checkChange
} from './helpers/formHelpers'
import css from './styles/room.css'

const _ = require('lodash')

const Classes = ({ t, classData, actions }) => {
	const formInputs = createFormInputs(t, classData)

	checkChange(classData, actions)

	return (
		<div>
			{addRoomForm(t, formInputs, actions)}

			<div>
				<h4 className={css.list_header}>{t('room.listHeader')}</h4>

				<ClassList t={t} listData={classData} />
			</div>

			<Subjects t={t} classData={classData} />
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
