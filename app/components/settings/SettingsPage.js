import React from 'react'
import { withNamespaces } from 'react-i18next'
import Address from './Address'
import GradeFormat from './GradeFormat'
import styles from './styles/settings.css'

const Settings = ({ t }) => (
	<div className={styles.settings_wrapper}>
		<h4 className={styles.main_header}>{t('settings.sectionTitle')}</h4>
		<div className={styles.address_div}>
			<Address t={t} />
		</div>
		<div className={styles.gradeFormat_div}>
			<GradeFormat t={t} />
		</div>
		<div />
	</div>
)

export default withNamespaces()(Settings)
