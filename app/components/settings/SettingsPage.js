/* eslint-disable max-len */
import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { t } from '../../utils/translationUtil'
import styles from './styles/settings.css'
import Address from './Address'
import GradeFormat from './GradeFormat'

const Settings = ({ actions }) => (
	<div className={styles.settings_wrapper}>
		<h4 className={styles.main_header}>{t('settings.sectionTitle')}</h4>
		<div className={styles.address_div}>
			<Address />
		</div>
		<div className={styles.gradeFormat_div}>
			<GradeFormat />
		</div>
		<div />
		<button type="button" className={styles.support_div} onClick={actions.supportApp}>
			{t('settings.supportText')}
			<div className={styles.support_icon}>
				<i className="fab fa-paypal fa-2x" style={{ color: '#1e73be' }} />
				<i className="fas fa-hands-helping fa-2x" style={{ color: '#1e73be' }} />
			</div>
		</button>
	</div>
)

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(Settings)
