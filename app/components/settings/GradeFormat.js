import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { t } from '../../utils/translationUtil'
import { actionCreators } from '../../actions/index'
import { gradeRadioButtons } from './helpers/formHelpers'
import styles from './styles/settings.css'

const GradeFormat = () => {
	const gradingSystemTypes = { note: true, points: false, percent: false }

	return (
		<div>
			<h4 className={styles.center_header}>{t('settings.gradeSystemTitle')}</h4>
			{gradeRadioButtons(gradingSystemTypes)}
		</div>
	)
}

const mapStateToProps = state => ({ schoolData: state.schoolData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GradeFormat)
