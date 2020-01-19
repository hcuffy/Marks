import React from 'react'
import { withNamespaces } from 'react-i18next'
import Address from './Address'
import GradeFormat from './GradeFormat'
import css from './styles/settings.css'

const Settings = ({ t }) => (
	<div className={css.settings_wrapper}>
		<h4 className={css.main_header}>{t('settings.sectionTitle')}</h4>
		<div className={css.address_div}>
			<Address t={t} />
		</div>
		<div className={css.gradeFormat_div}>
			<GradeFormat t={t} />
		</div>
		<div />
	</div>
)

export default withNamespaces()(Settings)
