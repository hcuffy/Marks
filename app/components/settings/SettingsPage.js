import React from 'react'
import { t } from '../../utils/translationUtil'
import Address from './Address'
import GradeFormat from './GradeFormat'
import { supportTheApp } from '../../utils/externalLinksUtil'
import { supportBtn } from './helpers/supportHelper'
import styles from './styles/settings.css'

const Settings = () => (
	<div className={styles.settings_wrapper}>
		<h4 className={styles.main_header}>{t('settings.sectionTitle')}</h4>
		<div className={styles.address_div}>
			<Address />
		</div>
		<div className={styles.gradeFormat_div}>
			<GradeFormat />
		</div>
		<div />
		{supportBtn(supportTheApp)}
	</div>
)

export default Settings
