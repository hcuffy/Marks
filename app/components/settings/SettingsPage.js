import React from 'react'
import { t } from '../../utils/translationUtil'
import styles from './styles/settings.css'
import Address from './Address'
import GradeFormat from './GradeFormat'

const Settings = () => (
	<div className={styles.settings_wrapper}>
		<h4 className={styles.main_header}>{t('settings.sectionTitle')}</h4>
		<div className={styles.address_div}>
			<Address />
		</div>
		<div className={styles.gradeFormat_div}>
			<GradeFormat />
		</div>
	</div>
)

export default Settings
