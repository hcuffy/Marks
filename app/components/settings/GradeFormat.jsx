import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { gradeRadioButtons } from './helpers/formHelpers'
import css from './styles/settings.css'

const _ = require('lodash')

const GradeFormat = ({ t, gradingSystem, actions }) => {
	const gradingSystemTypes = _.pick(gradingSystem, [
		'note',
		'points',
		'percent'
	])

	return (
		<div>
			<h4 className={css.center_header}>{t('settings.gradeSystemTitle')}</h4>

			{gradeRadioButtons(t, gradingSystemTypes, actions)}
		</div>
	)
}

const mapStateToProps = state => ({
	addressData: state.addressData,
	gradingSystem: state.settingData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(GradeFormat))
